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
      </section>
    `;
  });

  return `<!doctype html>
  <html lang="de">
    <head>
      <title>ARlebnispfade Oberberg // ${data.title}</title>
      ${this.meta()}
      <link rel="stylesheet" href="${this.url('/reveal/dist/reset.css')}">
      <link rel="stylesheet" href="${this.url('/reveal/dist/reveal.css')}">
      <link rel="stylesheet" href="${this.url('/assets/main.css')}">
     
      <link rel="icon" type="image/svg" href="${this.url('/assets/images/preview_black_24dp.svg')}">
  
      <!-- Theme used for syntax highlighted code -->
      <link rel="stylesheet" href="${this.url('/reveal/plugin/highlight/monokai.css')}">
    </head>
    <body>
      <div class="reveal">
        <div class="slides">
          ${POIs.join('\n')}  
        </div>
      </div>
      
      <script src="${this.url('/reveal/dist/reveal.js')}"></script>
      <script src="${this.url('/assets/scripts/libs/fittext.js')}"></script>
      <script src="${this.url('/assets/scripts/main.js')}"></script>
      <script src="${this.url('/reveal/plugin/notes/notes.js')}"></script>
      <script src="${this.url('/reveal/plugin/markdown/markdown.js')}"></script>
      <script src="${this.url('/reveal/plugin/highlight/highlight.js')}"></script>
      <script src="${this.url('/reveal/plugin/zoom/zoom.js')}"></script>
      <script>
        // More info about initialization & config:
        // - https://revealjs.com/initialization/
        // - https://revealjs.com/config/
        Reveal.initialize({
          hash: true, 
          center: false,
          disableLayout: true,
          progress: true,
          backgroundTransition: 'zoom',
          // Learn about plugins: https://revealjs.com/plugins/
          plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealZoom]
        });
      </script>
    </body>
  </html>`;
};
