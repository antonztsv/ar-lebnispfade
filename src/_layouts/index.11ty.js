exports.render = function (data) {
  const documentHeader = require('./components/head.11ty');
  const pageHeader = require('./components/page-header.11ty');
  const pageFooter = require('./components/page-footer.11ty');

  const documentHead = documentHeader.getHeader(this, data);
  const pageHead = pageHeader.getPageHeader(this, data);
  const pageFoot = pageFooter.getPageFooter(this, data);

  const createOverview = (collection) => {
    const overviewItems = collection.map((item) => {
      const contentUrl = this.getContentUrl(item.url);
      const imageUrl = `${contentUrl}images/${item.data.image}`;
      return `<li style="background-image: url(${imageUrl})"><a data-js-action-on-touch="fade" href="${contentUrl}"><p class="title">${item.data.title}</p></a></li>`;
    });

    return `
        <ul class="item-list">
          ${overviewItems.join("\n")}
        </ul>`;
  }

  const pathOverview = createOverview(data.collections.pathes);

  const links = data.links.map((link) => {
    const { icon, title, url } = link;
    return `<li class="text-link"><a href="${url}"><span class="icon">${icon}</span> ${title}</a></li>`;
  });

  const linkList = links.length > 0
    ? `<ul class="links">${links.join("\n")}</ul>`
    : '';

  return `<!doctype html>
    <html lang="de">
      ${documentHead}
      <body class="overview">
        ${pageHead}
        <main data-js-on-load-action="fade-in">
          ${pathOverview}
          ${linkList}
          <div class="info">
            ${data.content}
          </div>
        </main>
        ${pageFoot}
      </body>
    </html>`;
};
