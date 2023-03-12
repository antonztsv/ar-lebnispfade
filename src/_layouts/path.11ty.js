const fs = require('fs');

const imgEndings = ['jpg', 'png'];

const colors = {
  'mi-blau': '#4952e1',
  'mi-pink': '#d16',
  'mi-gruen': '#00ad2f',
  'mi-lila': '#9313ce',
  'mi-black': '#231f20',
  'mi-grau': '#aaa',
  'mi-hellgrau': '#efefef',
};

const bgColorToClass = {
  intro: 'mi-lila',
  shout: 'mi-blau',
  outro: 'mi-black'
};

const insertColor = (string, colorClass)=>{
  return string.replace(/\/\//g, "<span class="+colorClass+">//</span>", string);
}


const getData = (collections, pattern) => collections.filter((item) => {
  const {url} = item;
  const extendedPattern = `${pattern}/.*[a-zA-Z0-9]/`;
  return url.match(extendedPattern);
});

const getBgColor = (cssClass) => {
  const colorKey = bgColorToClass[cssClass];
  const color = colors[colorKey];
  return color ? `data-background-color="${color}"` : '';
};


exports.render = function (data) {
  const pathData = getData(data.collections.sorted, data.page.fileSlug);

  const POIs = pathData.map((poi) => {
    const {data} = poi;
    if(data.status === 'hidden') return '';

    return `
      <section>
        ${data.title}
        ${poi.content}
        
      </section>
    `;
  });

  return `<!doctype html>
  <html lang="de">
    <head>
      <title>ARlebnispfade Oberberg // ${data.title}</title>
      ${this.meta()}
      <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
      <script type='text/javascript' src='https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js'></script>
      <script type='text/javascript' src='https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js'></script>

      <link rel="stylesheet" href="${this.url('/assets/main.css')}">
      <link rel="icon" type="image/svg" href="${this.url('/assets/images/preview_black_24dp.svg')}">

      <style>
  .arjs-loader {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arjs-loader div {
    text-align: center;
    font-size: 1.25em;
    color: white;
  }
</style>
    </head>
    <body>
          ${POIs.join('\n')}  
    </body>
  </html>`;
};
