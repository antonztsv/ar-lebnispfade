const documentHeader = require('./components/head.11ty');


exports.render = function(data){


    const documentHead = documentHeader.getHeader(this, data);
    return `<!doctype html>
    <html lang="de">
      ${documentHead}
      <body class="impressum">
        <main>
        ${data.content}
        </main>
      </body>
    </html>
    `
}