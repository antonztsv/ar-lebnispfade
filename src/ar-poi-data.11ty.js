const frontMatterData = {
    permalink: '/map/ar-poi-data.geojson'
};

class Overview {

    data() {
      return frontMatterData;
    }
  
    render(data) {

      const poisWithCoords = data.collections.pois.filter((item) => item.data.coords );
      
      const features = poisWithCoords.map((item) => {
        const { data } = item;
        if(! data.coords ) return;
        const location = data.ar && data.ar.location ? data.ar.location : "";
        const coords = data.coords;
        
        const feature = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              parseFloat(coords[1]),
              parseFloat(coords[0])
            ]
          },
          "properties": {
            "title": data.title,
            "location": location,
            "image": data.image,
            "url": data.page.url,
            "arDescription": data.arDesc ? data.arDesc : "",
          }
        };

        return JSON.stringify(feature);
      });
      
      return `
        {
          "type": "FeatureCollection",
          "features": [
            ${features.join(",\n")}
          ]
        }
      `;
    }
  }
  
module.exports = Overview;

