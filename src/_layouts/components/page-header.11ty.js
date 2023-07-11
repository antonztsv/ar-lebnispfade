exports.getPageHeader = (eleventy, data) => {

  return `
    <header class="main-header">
      <h1>${data.title}</h1>
    </header>
  `;
};
