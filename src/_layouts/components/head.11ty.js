exports.getHeader = (eleventy, data, args) => {

  const mapMeta = args && args.mapMeta ? args.mapMeta : false;
  const arDependencies = args && args.arDependencies ? args.arDependencies : false;

  const currentDay= new Date().getDate();
  const currentMonth = new Date().getMonth() +1;
  const currentYear = new Date().getFullYear();
  const publishDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const mapMetaData = mapMeta ? mapMeta : '';

  const arDependencyBlock = !arDependencies ? ''
    : `<script src="https://cdn.jsdelivr.net/gh/aframevr/aframe@cb0bb8407968be713b79008548b7044908ba5729/dist/aframe-master.min.js"></script>
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
      <script src="https://rawgit.com/oscarmarinmiro/aframe-video-controls/master/dist/aframe-video-controls.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@7.0.0/dist/aframe-extras.min.js"></script>
      <script src="${eleventy.url('/assets/scripts/card.js')}?${eleventy.getDateString()}" defer></script>
      <script src="${eleventy.url('/assets/scripts/mediaControls.js')}?${eleventy.getDateString()}" defer></script>
    `;
  

  const title = data.title === 'ARlebnispfade Oberberg' ? data.title : `ARlebnispfade Oberberg // ${data.title}`;

  return `
    <head>
      <title>${title}</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta property="og:title" content="${data.title}">
      <meta property="article:published_time" content="${publishDate}">
      <meta name="author" content="ARlebnispfade Team // OBK & TH Köln">

      <link rel="apple-touch-icon" sizes="180x180" href="${eleventy.url('/assets/images/favicons/apple-touch-icon.png')}">
      <link rel="icon" type="image/png" sizes="32x32" href="${eleventy.url('/assets/images/favicons/favicon-32x32.png')}">
      <link rel="icon" type="image/png" sizes="16x16" href="${eleventy.url('/assets/images/favicons/favicon-16x16.png')}">
      <link rel="manifest" href="${eleventy.url('/assets/images/favicons/site.webmanifest')}">
      <link rel="mask-icon" href="${eleventy.url('/assets/images/favicons/safari-pinned-tab.svg')}" color="#5bbad5">
      
      ${mapMetaData}

      <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=5.0">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="theme-color" content="#ffffff">

      <link href="${eleventy.url('/compiled-assets/main.css')}?${eleventy.getDateString()}" rel="stylesheet" media="screen">
      
      ${arDependencyBlock}

      <!--script src="${eleventy.url('/assets/scripts/gestures.js')}?${eleventy.getDateString()}" defer></script-->
      <script src="${eleventy.url('/assets/scripts/main.js')}?${eleventy.getDateString()}" defer></script>

      <!-- Matomo -->
      <script>
        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="//stats.arlebnisobk.de/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      </script>
      <!-- End Matomo Code -->
      
      <!-- Cookie-Banner -->
      <script id="usercentrics-cmp" async data-eu-mode="true" data-settings-id="UZi3OuY5qI34pm" src=https://app.eu.usercentrics.eu/browser-ui/latest/loader.js></script>
      <script type="application/javascript"> var UC_UI_SUPPRESS_CMP_DISPLAY=true;</script>

    </head>
  `;
};


