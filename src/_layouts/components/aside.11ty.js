exports.getAside = (eleventy, data) => {
  
  return `
    <aside class="device-info">
      <p>${data.project.infoSmartphoneOnly}</p>
      <figure class="qr-code">
        <img src="/assets/images/qr-code-arlebnispfade.png" alt="QR Code mit Link zur Website">
      </figure>
    </aside>
  `;
};


