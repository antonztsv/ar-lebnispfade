let map;
let poisGeoJSON;

const colors = {
  'accent-color': '#0090d4',
};

function initMap() {

  mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWVsbCIsImEiOiJja2d0cmJia2cwbW8wMnRtanE3Z3Z5aGxoIn0.lLrglrscfprCZCJO-ymRpg';
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [7.45, 50.9847674],
    minZoom: 1.7,
    maxZoom: 20,
    zoom: 10
  });
  // Add zoom and rotation controls to the map
  map.addControl(new mapboxgl.NavigationControl());

  const language = new MapboxLanguage();
  map.addControl(language);
}

function addClusterLayer() {
  // Design for cluster
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'pois',
    filter: ['has', 'point_count'],
    paint: {
      'circle-stroke-width': 1,
      'circle-stroke-color': '#ffffff',
      'circle-color': [
        'step',
        ['get', 'point_count'],
        colors['accent-color'],
        75,
        '#2c20d5',
        500,
        '#041a76'],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        75,
        30,
        500,
        40,
      ],
    },
  });
}

function addUnclusteredLayer() {
  // Design for single cluster point
  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'pois',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#849cff',
      'circle-radius': 10,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    },
  });
}

function addClusterCount() {
  // Design for cluster text
  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'pois',
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': [
        'step',
        ['get', 'point_count'],
        12,
        75,
        16,
        500,
        20,
      ],
    },
    paint: {
      'text-color': '#ffffff',
    },
  });
}

function setMapBounds(filteredGeoJSON) {
  const latLngCoordinates = filteredGeoJSON.features.map((point) => point.geometry.coordinates);
  let mostWestPoint = [180, 0];
  let mostEastPoint = [-180, 0];
  let mostNorthPoint = [0, -90];
  let mostSouthPoint = [0, 90];

  latLngCoordinates.forEach((point) => {
    if (mostWestPoint[0] > point[0]) {
      mostWestPoint = point;
    }
    if (mostEastPoint[0] < point[0]) {
      mostEastPoint = point;
    }
    if (mostNorthPoint[1] < point[1]) {
      mostNorthPoint = point;
    }
    if (mostSouthPoint[1] > point[1]) {
      mostSouthPoint = point;
    }
  });

  lngLatBounds = new mapboxgl.LngLatBounds([mostWestPoint[0], mostSouthPoint[1]], [mostEastPoint[0], mostNorthPoint[1]]);

  map.fitBounds(lngLatBounds, {
    padding: {
      top: 200, bottom: 200, left: 600, right: 200,
    },
  });
}

function addMapData(filteredGeoJSON = null) {

  map.on('load', () => {
    map.addSource('pois', {
      type: 'geojson',
      data: filteredGeoJSON || poisGeoJSON,
      cluster: true,
      clusterRadius: 50,
      clusterMaxZoom: 10
    });

    if (filteredGeoJSON) {
      setMapBounds(filteredGeoJSON);
    }
    addClusterLayer();
    addClusterCount();
    addClusterListener();

    addUnclusteredLayer();
  });
}

async function loadData() {
  poisGeoJSON = await $.get('ar-poi-data.geojson');

  // Filter the objects with no (correct) coordinates
  // paintingsGeoJSON.features = paintingsGeoJSON.features.filter((e) => e.geometry.coordinates[0] !== 200);
  addMapData();
  
}

function addClusterPopups(e, features, clusterId, clusterSource) {
  const pointCount = features[0].properties.point_count;
  const coordinates = e.features[0].geometry.coordinates.slice();

  clusterSource.getClusterChildren(clusterId, (err, aFeatures) => {
    if (aFeatures.length === 1) {
      clusterSource.getClusterLeaves(clusterId, pointCount, 0, (error, leavesFeatures) => {
        let popupText = `<h5 Class="popupCity">${leavesFeatures[0].properties.location}</h5>`;
        leavesFeatures.forEach((item) => {
          popupText += renderCard(item, false);
        });

        new mapboxgl.Popup({
          anchor: 'bottom-left',
        })
          .setLngLat(coordinates)
          .setHTML(popupText)
          .addTo(map);
      });
    }
  });
}

function clusterClickListener() {
  
  map.on('click', 'clusters', (e) => {
    
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters'],
    });
    const clusterId = features[0].properties.cluster_id;
    const clusterSource = map.getSource('pois');
    map.getSource('pois').getClusterExpansionZoom(
      clusterId,
      (err, zoom) => {
        map.flyTo({
          center: features[0].geometry.coordinates,
          zoom,
          speed: 0.6,
        });
      },
    );
    addClusterPopups(e, features, clusterId, clusterSource);
  });
}

function unclusteredPointClickListener() {

  map.on('click', 'unclustered-point', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();

    currentZoomLevel = map.getZoom();
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: (currentZoomLevel < 5 ? 5 : currentZoomLevel),
      speed: 0.6,
    });
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`<h5 class="popupCity">${e.features[0].properties.location}</h5>${renderCard(e.features[0], false)}`)
      .addTo(map);
  });
}

function addClusterListener() {
  clusterClickListener();
  unclusteredPointClickListener();

  map.on('mouseenter', 'clusters', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseenter', 'unclustered-point', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'clusters', () => {
    map.getCanvas().style.cursor = '';
  });

  map.on('mouseleave', 'unclustered-point', () => {
    map.getCanvas().style.cursor = '';
  });
}

/* reason: filter.js is used by script.js via $.getScript() */
/* eslint-disable no-unused-vars */
/* reason: jQuery is loaded via html script tag */
/* eslint-disable no-undef */
function renderCard(searchResult, isFilter) {
  const paintingURL = searchResult.properties.image !== '' ? searchResult.properties.image : 'No-image-available.png';
  const paintingTitle = searchResult.properties.titles;
  const paintingTitleShort = paintingTitle.length > 41 ? `${paintingTitle.substring(0, 40)}...` : paintingTitle;
  const paintingCoordinates = JSON.stringify(searchResult.geometry.coordinates);
  if (isFilter) {
    return `
        <div class="card mb-3 search-result-card">
            <div class="row g-0 m-0" id="rowSearchResult">
                <div class="col-md-5 p-0" id="imageColumnSearchResult">
                    <img class="img-center-block" src="${paintingURL}" alt="kein Bild verfügbar">
                </div>
                <div class="col-md-7 p-0 content-column-search-result">
                    <div class="card-body body-search-result p-2">
                        <h5 class="card-title search-result-title" data-toggle="tooltip" data-placement="top"
                        title="${paintingTitle}">${paintingTitleShort}</h5>
                        <p class="card-text search-result-text">
                        ${searchResult.properties.dated}<br>
                        ${searchResult.properties.repository}<br>
                        ${searchResult.properties.location}, ${searchResult.properties.country}</p>
                        <div class="row">
                            <div class="col-md-2">
                                <button class="btn p-0" type="button">
                                    <a target="_blank" href="http://www.lucascranach.org/${searchResult.properties.inventoryNumber}">  
                                    <i class="bi bi-info-circle-fill"></i></a>
                                </button>
                            </div>
                            <div class="col-md-2 btn-geo-icon-column">
                                <button class="btn p-0 btn-geo-icon" type="button" data-location="${paintingCoordinates}">
                                    <i class="bi bi-geo-alt-fill"></i></a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  } return `
        <div class="card popup-card">
            <div class="row g-0 m-0 row-popup-card">
                <div class="col-md-5 img-column-popup-card p-0">
                     <img class="img-center-block" src="${paintingURL}" alt="kein Bild verfügbar">
                </div>
                <div class="col-md-7 p-0 content-column-popup-card">
                    <div class="card-body p-0 body-popup-card">
                        <h5 class="card-title title-popup-card" data-toggle="tooltip" data-placement="top"
                            title="${paintingTitle}">${paintingTitleShort}</h5>
                            <p class="card-text text-popup-card">${searchResult.properties.dated}<br>
                            ${searchResult.properties.repository}<br>
                            ${searchResult.properties.location}, ${searchResult.properties.country}</p>
                            <div class="col-md-2 p-0">
                                <button class="btn p-0" type="button">
                                    <a target="_blank" href="http://www.lucascranach.org/${searchResult.properties.inventoryNumber}">  
                                    <i class="bi bi-info-circle-fill bi-info-circle-fill"></i></a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function renderError(message) {
  $('.search-result').html(`<div class="container mp-0 error-message"><p>${message}</p></div>`);
  $('#resultCount').html(0);
  $('.result-container').attr('style', 'display: block !important');
}



function resetFilter() {
  $('.search-result').html('');
  $('.result-container').attr('style', 'display: none !important');
  $('#resultCount').html('');
  $('#toggle-result-visibility').hide();
  initMap();
  addClusterListener();
  addMapData();
}


document.addEventListener("DOMContentLoaded", async (event) => {
  initMap();
  await loadData();
});