exports.getPageHeader = (eleventy, data) => {

  const pathSegments = data.page.filePathStem.split('/');
  const back = pathSegments.length > 2 || data.backArrow === true ? 
    `<a 
      data-js-action-on-touch="move-right" 
      href="../" class="back-button"><span class="icon">arrow_back_ios</span></a>` : '';

  return `
    <header class="main-header">
      ${back} 
      <h1>${data.title}</h1>
    </header>
  `;
};
