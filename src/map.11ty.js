const frontMatterData = {
    title: "ARlebnispfade Oberberg",
};

class Overview {

    data() {
      return frontMatterData;
    }

    render(data) {
      const arMap = require('./_layouts/components/map.11ty');
  
      const mapMeta = arMap.getMapMeta(this, data);
      const map = arMap.getDemo(this, data);

      return map;
    }
  }
  
module.exports = Overview;