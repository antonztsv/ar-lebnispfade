/* Get the data for the current POI
############################################################################ */

exports.getPoiData = (collections, pattern) => collections.filter((item) => {
  const { url } = item;
  const extendedPattern = `${pattern}/.*[a-zA-Z0-9]/`;
  return url.match(extendedPattern);
});
