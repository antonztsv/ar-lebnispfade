exports.getAudio = (eleventy, data) => {

    if(!data.ar.audio) return ''
    return `
    <figure class="audio info-card-item">
      <audio controls="controls" src="../ar-media/audios/${data.ar.audio.filename}"></video>
    </figure>`;
  };