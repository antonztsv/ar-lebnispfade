exports.getPageHeader = (eleventy, data) => {

  const pathSegments = data.page.filePathStem.split('/');
  const back = pathSegments.length > 2 || data.backArrow === true ? 
    `<a 
      data-js-action-on-touch="move-right" 
      href="../" class="back-button"><span class="icon">arrow_back_ios</span></a>` : '';
  
  const logo = `
    <img src="../../assets/images/ARlebnisOBK-icon.png" alt="ARlebnisOBK Logo" class="logo">
  `;

  const h1 = back ? `<h1>${data.title}</h1>` : `<h1 class="home" data-js-scrollspy-target>${logo}</h1>`;

  return `
    <header class="main-header">
      ${back} 
      ${h1}
    </header>
  `;
};
