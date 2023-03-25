const htmlmin = require('html-minifier');
const markdownIt = require("markdown-it");

const pathPrefix = (process.env.ELEVENTY_ENV === 'production') ? "ar-lebnispfade" : "";
const ghPagesFolder = "docs";

const md = new markdownIt({
  html: true,
});

const insertMarkup = (string)=>{
 string = string.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>", string);
 return string.replace(/\*(.*?)\*/g, "<mark>$1</mark>", string);
}

const insertColor = (string, colorClass)=>{
 const color = (colorClass) ? colorClass : "is-purple";
 return string.replace(/\/\//g, "<span class="+color+">//</span>", string);
}

const getPOIData = (collection, pattern)=>{
  const allSlides = collection.getFilteredByGlob(pattern);

  return allSlides.sort((a, b) => {
    if (a.fileSlug > b.fileSlug) return 1;
    else a.fileSlug < b.fileSlug
    return -1;
   });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setWatchThrottleWaitTime(500);
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setWatchJavaScriptDependencies(true);
  eleventyConfig.setBrowserSyncConfig({
    snippet: true,
    https: true
  });

  eleventyConfig.addGlobalData("eleventyComputed.permalink", function() {
		return (data) => {
			// Always skip during non-watch/serve builds
			if(data.type === 'arf-data') {
        console.log("skipping draft");
				return false;
			}

			return data.permalink;
		}
	});

  eleventyConfig.setServerOptions({
    // Default values are shown:

    // Whether the live reload snippet is used
    liveReload: true,

    // Whether DOM diffing updates are applied where possible instead of page reloads
    domDiff: true,

    // The starting port number
    // Will increment up to (configurable) 10 times if a port is already in use.
    port: 8080,

    // Additional files to watch that will trigger server updates
    // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
    // Works great with a separate bundler writing files to your output folder.
    // e.g. `watch: ["_site/**/*.css"]`
    watch: [],

    // Show local network IP addresses for device testing
    showAllHosts: true,

    // Use a local key/certificate to opt-in to local HTTP/2 with https
    //https: {
    //  key: "../../localhost.key",
    //  cert: "../../localhost.cert",
    //},

    // Change the default file encoding for reading/serving files
    encoding: "utf-8",
  });
  
 /* Compilation
   ########################################################################## */

 // Watch our compiled assets for changes
 // eleventyConfig.addWatchTarget('./src/compiled-assets/main.css');
 eleventyConfig.addWatchTarget('./src/assets/scripts/main.js');

 // Copy _data
 eleventyConfig.addPassthroughCopy({'src/_data': 'assets/data'});

 // Copy src/compiled-assets to /assets
 eleventyConfig.addPassthroughCopy({'src/compiled-assets': 'assets'});

 // Copy all fonts
 eleventyConfig.addPassthroughCopy({'src/assets/fonts': 'assets/fonts'});

 // Copy asset images
 eleventyConfig.addPassthroughCopy({'src/assets/images': 'assets/images'});
  
 // Copy images
 eleventyConfig.addPassthroughCopy('src/content/**/images/*.{jpg,png,svg,jpeg, gif}');
 eleventyConfig.addPassthroughCopy('src/content/**/images/**/*.{jpg,png,svg,jpeg,gif}');

 // Copy Reveal Stuff
 eleventyConfig.addPassthroughCopy({'reveal/dist': 'reveal/dist'});
 eleventyConfig.addPassthroughCopy({'reveal/plugin': 'reveal/plugin'});

 // Copy Scripts
 eleventyConfig.addPassthroughCopy({'src/assets/scripts': 'assets/scripts'});
 eleventyConfig.addWatchTarget("./src/assets/scripts");

 /* Functions
 ########################################################################## */

 eleventyConfig.addJavaScriptFunction("urlPrefix", function() {
  return pathPrefix;
 });

 /* Filter
 ########################################################################## */


 eleventyConfig.addFilter("contentByTopic", function (topic) {
  eleventyConfig.addCollection(topic, (collection) => {
   return collection.getFilteredByGlob(`./src/content/${topic}/*.md`);
  });
  return topic;
 });

 /* Collections
 ########################################################################## */

 eleventyConfig.addCollection("pathes", (collection) => {
  return POIs = getPOIData(collection, "./src/content/**/index.md");
 });

 eleventyConfig.addCollection("all", function (collection) {
  return collection.getAll();
 });

 eleventyConfig.addCollection("sorted", function (collection) {
  return POIs = collection.getFilteredByGlob("./src/content/**/*.md").sort((a, b) => {
   const filenameFromA = a.filePathStem.split(/\//).pop();

   if (filenameFromA === 'index') return 1;
   else if (a.fileSlug > b.fileSlug) return 1;
   else if (a.fileSlug < b.fileSlug) return -1;

   else return 0;
  });
 });

 /* Shortcodes
 ########################################################################## */

 eleventyConfig.addShortcode('screenshot', (imgSrc, props) => {
  const propData = (props) ? JSON.parse(props) : {};
  const dataTransition = propData && propData.transition ? `data-transition="${propData.transition}"` : '';
  const dataBackgroundTransition = propData && propData.backgroundTransition ? `data-background-transition="${propData.backgroundTransition}"` : '';
  const classes = propData && propData.classes ? propData.classes : '';
  const width = propData && propData.width ? `width="${propData.width}" ` : '';
  const buCreditHtml = propData && propData.credit ? `<p class="credit">${propData.credit}</p>` : '';
  const buHtml = propData && propData.bu ? `<figcaption class="bu"><p>${insertMarkup(propData.bu)}</p></figcaption>` : '';
  return `<section data-slide-shortcode-class="screenshot" class="image screenshot ${classes}" ${dataTransition} ${dataBackgroundTransition}><figure><img src="${imgSrc}" alt="${imgSrc}" ${width}>${buHtml}</figure></section>`;
 });

 eleventyConfig.addShortcode('screenshotFs', (imgSrc, props) => {
  const propData = (props) ? JSON.parse(props) : {};
  const dataTransition = propData && propData.transition ? `data-transition="${propData.transition}"` : '';
  const dataBackgroundTransition = propData && propData.backgroundTransition ? `data-background-transition="${propData.backgroundTransition}"` : '';
  const classes = propData && propData.classes ? propData.classes : '';
  const buCreditHtml = propData && propData.credit ? `<p class="credit">${propData.credit}</p>` : '';
  const buHtml = propData && propData.bu ? `<div class="bu"><p>${insertMarkup(propData.bu)}</p></div>` : '';
  return `<section data-slide-shortcode-class="screenshot" class="image is-fullscreen ${classes}" data-background="${imgSrc}" ${dataTransition} ${dataBackgroundTransition}>${buHtml}</section>`;
 });

 eleventyConfig.addShortcode('meta',()=>{
  return `<meta name="robots" content="noindex">
    <meta name="googlebot" content="noindex">
    <meta name="googlebot-news" content="noindex">
    <meta charset="utf-8">
`});

 eleventyConfig.addShortcode('interlude', (title, subtitle, transition) => {
  const getRandomBackgroundColor = ()=>{
    const colors = ['#4952e1', '#d16', '#00ad2f', '#9313ce', '#aaa'];
    return colors[colors.length * Math.random() | 0];
  }
  const htmlSubtitle = subtitle ? `<h2 class="subtitle js-delay">${insertMarkup(subtitle)}</h2>` : '';
  const dataTransition = transition ? `data-transition="${transition}"` : '';

  return `<section data-slide-shortcode-class="interlude" data-background-color="${getRandomBackgroundColor()}" class="image screenshot interlude" ${dataTransition}><div><h1 class="title">${insertMarkup(title)}</h1>${htmlSubtitle}</div></section>`;
 });



 /* Environment
 ########################################################################## */

 if (process.env.ELEVENTY_ENV === 'production') {
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
   if (outputPath.endsWith('.html')) {
    return minified = htmlmin.minify(content, {
     collapseInlineTagWhitespace: false,
     collapseWhitespace: true,
     removeComments: true,
     sortClassName: true,
     useShortDoctype: true,
    });
   }

   return content;
  });
 }

 return {
  dir: {
   includes: '_components',
   input: 'src',
   layouts: '_layouts',
   output: 'docs',
  },
  pathPrefix: pathPrefix,
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine: 'njk',
  templateFormats: [
   'md',
   'html',
   'njk'
  ],
 };
};
