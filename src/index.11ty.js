const fontMatterData = {
    title: "ARlebnispfade Oberberg",
    layout: "overview",
};

class Overview {

    data() {
      return fontMatterData;
    }

    createOverview(collection) {
      const overviewItems = collection.map((item) => {
        const contentUrl = this.getContentUrl(item.url);
        const imageUrl = `${contentUrl}images/${item.data.image}`;
        return `<li style="background-image: url(${imageUrl})"><a href="${contentUrl}">${item.data.title}</a></li>`;
      });

      return `
        <ul class="item-list">
          ${overviewItems.join("\n")}
        </ul>`;
    }
  
    render(data) {
      const pathOverview = this.createOverview(data.collections.pathes);
      return `
        ${pathOverview}
      `;
    }
  }
  
module.exports = Overview;