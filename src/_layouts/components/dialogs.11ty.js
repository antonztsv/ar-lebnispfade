exports.getModalDialog = (eleventy, data) => {

  if(!data.ar) return '';

  const {ar} = data;
  

  const permissionData = {
    "camera": {
      "title": "Kamera",
      "icon": "videocam"
    },
    "motion": {
      "title": "Bewegungssensor",
      "icon": "animation"
    }
  };
  const permissions = [];
  
  switch (ar.type) {
    case 'image-tracking':
      permissions.push("camera");
      permissions.push("motion");
      break;
    default:
  }

  const visualizePermissions = () => {
    if(permissions.length === 0) return '';
    return permissions.map(permission => `<li><span class="icon">${permissionData[permission].icon}</span>${permissionData[permission].title}</li>`).join('');
  };

  return `
    <dialog class="ar-actions" data-js-ar-actions>
      <div class="dialog-body">
        <h3>Augmented Reality // Was kann man hier machen?</h3>
        <p>${data.text}</p>
        <p>Um die Augmented Reality Funktion anbieten zu können, braucht wir folgende Berechtigungen:</p>
        <ul class="permissions">
          ${visualizePermissions()}
        </ul>

      </div>
      <button class="start-ar" data-js-ar-actions-start>Alles klar</button>
      <button class="bypass-ar" data-js-ar-actions-bypass>Besser nicht</button>
    </dialog>
  `;
}
