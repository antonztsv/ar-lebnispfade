exports.getPageFooter = (eleventy, data) => {

  const date_ob = new Date();
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  const minutes = date_ob.getMinutes();
  const seconds = date_ob.getSeconds();
  
  return `
    <footer class="main-footer">
      <a href="/ueber-das-projekt/">Über das Projekt</a> // <a href="https://www.th-koeln.de/hochschule/impressum_8159.php">Impressum</a><br>
      <small>${date}.${month}.${year} // ${hours}:${minutes}:${seconds}</small>
    </footer>
  `;
};
