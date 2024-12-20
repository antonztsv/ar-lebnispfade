require('dotenv').config();
const {MAPBOX_TOKEN} = process.env;

const htmlmin = require('html-minifier');
const markdownIt = require("markdown-it");

const pathPrefix = (process.env.ELEVENTY_ENV === 'production') ? "" : "";
const ghPagesFolder = "docs";

const md = new markdownIt({
  html: true,
});

const clearRequireCache = () => {
  Object.keys(require.cache).forEach(function (key) {
    if (require.cache[key].filename.match(/11ty\.js/)) {
      delete require.cache[key];
    }
  });
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
  eleventyConfig.setWatchThrottleWaitTime(100);
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
    domDiff: false,

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
     https: {
       key: "../localhost.key",
       cert: "../localhost.cert",
    },

    // Change the default file encoding for reading/serving files
    encoding: "utf-8",
  });

  /* Compilation
   ########################################################################## */

  // Watch our js for changes
  eleventyConfig.addWatchTarget('./src/assets/scripts/main.js');
  eleventyConfig.addWatchTarget('./src/_layouts/components');

  // Copy _data
  eleventyConfig.addPassthroughCopy({ 'src/_data': 'assets/data' });
  eleventyConfig.addWatchTarget("./src/_data");

  // Watch our compiled assets for changes
  eleventyConfig.addPassthroughCopy('src/compiled-assets');
  eleventyConfig.addPassthroughCopy('./compiled-content');

  // Copy all fonts
  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });

  // Copy asset images
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });

  // Copy images
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/**/*.fset");
  eleventyConfig.addPassthroughCopy("src/**/*.fset3");
  eleventyConfig.addPassthroughCopy("src/**/*.iset");

  // Copy Media
  eleventyConfig.addPassthroughCopy("src/**/*.mp4");
  eleventyConfig.addPassthroughCopy("src/**/*.webm");
  eleventyConfig.addPassthroughCopy("src/**/*.mp3");
  eleventyConfig.addPassthroughCopy("src/**/*.glb");
  eleventyConfig.addPassthroughCopy("src/**/*.obj");
  eleventyConfig.addPassthroughCopy("src/**/*.mtl");

  // Copy Scripts
  eleventyConfig.addPassthroughCopy({ 'src/assets/scripts': 'assets/scripts' });
  eleventyConfig.addWatchTarget("./src/assets/scripts");

  // Copy Libs
  eleventyConfig.addPassthroughCopy({ 'src/assets/lib': 'assets/lib' });

  // Copy CNAME
  eleventyConfig.addPassthroughCopy({ 'src/CNAME': '' });

  /* Functions
 ########################################################################## */

  eleventyConfig.addJavaScriptFunction("urlPrefix", function() {
    return pathPrefix;
  });

  eleventyConfig.addJavaScriptFunction("getMapboxToken", function() {
    return MAPBOX_TOKEN;
  });

  eleventyConfig.addJavaScriptFunction("getContentUrl", function(url) {
    return `.${url}`;
  });

  eleventyConfig.addJavaScriptFunction("getDateString", function() {
    const date_ob = new Date();
    const date = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`;
  });


  /* Filter
 ########################################################################## */
  eleventyConfig.addFilter("contentByTopic", function (topic) {
    eleventyConfig.addCollection(topic, (collection) => {
      clearRequireCache();
      return collection.getFilteredByGlob(`./src/${topic}/*.md`);
    });
    return topic;
  });

  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
  });

  /* Collections
 ########################################################################## */

  eleventyConfig.addCollection("pathes", (collection) => {
    clearRequireCache();
    const POIs = getPOIData(collection, "./src/**/index.md");
    return POIs.filter((item) => {
      return item.data.layout === 'path.11ty.js';
    });
  });

  eleventyConfig.addCollection("pois", (collection) => {
    clearRequireCache();
    const POIs = collection.getFilteredByGlob(`./src/**/*.md`).filter((item) => {
      return item.data.layout === 'poi';
    });
    return POIs;
  });

  eleventyConfig.addCollection("all", function (collection) {
    clearRequireCache();
    return collection.getAll();
  });

  eleventyConfig.addCollection("sorted", function (collection) {
    clearRequireCache();
    return POIs = collection.getFilteredByGlob("./src/**/*.md").sort((a, b) => {
        const filenameFromA = a.filePathStem.split(/\//).pop();

        if (filenameFromA === 'index') return 1;
        else if (a.fileSlug > b.fileSlug) return 1;
        else if (a.fileSlug < b.fileSlug) return -1;

        else return 0;
      });
  });

  /* Shortcodes
 ########################################################################## */


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
      'njk', 
      '11ty.js'
    ],
  };
};
