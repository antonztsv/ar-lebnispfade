const getIframe = (url) => {
  return `
    <figure class="video info-card-item">
      <iframe 
        id="iframeVideo" 
        class="info-card-video" 
        src="${url}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
      </iframe>
    </figure>`;
}

const getVideo = (filename) => {
  return `
    <figure class="video info-card-item">
      <video controls="controls" src="../ar-media/videos/${filename}"></video>
    </figure>`;
}

exports.getVideo = (eleventy, data) => {

  if (!data.ar || !data.ar.video) return '';

  const arVideoData = data.ar.video;

  const videoData = arVideoData.map(videoElement => {
    const videoContainer = videoElement.type === 'url'
      ? getIframe(videoElement.url)
      : getVideo(videoElement.filename);

    return videoContainer;
  });

  return videoData.join('');
};