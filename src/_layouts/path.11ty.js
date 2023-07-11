const fs = require('fs');
const pageHeader = require('./components/head.11ty');

const getData = (collections, pattern) => collections.filter((item) => {
  const {url} = item;
  const extendedPattern = `${pattern}/.*[a-zA-Z0-9]/`;
  return url.match(extendedPattern);
});



exports.render = function (data) {
  const pathData = getData(data.collections.sorted, data.page.fileSlug);
  const pageHead = pageHeader.getHeader(this, data);

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
    ${pageHead}
    <body>
          ${POIs.join('\n')}  
    </body>
  </html>`;
};
