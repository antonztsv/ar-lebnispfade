/* Functions
############################################################################ */


/* Adding eye candy ######################################################## */

const addingEyeCandy = () => {
  
  const actionOnTouch = () => {
    const eyeCandyItem = document.querySelector("[data-js-action-on-touch]");
    if(!eyeCandyItem || eyeCandyItem === null) return;
  
    const eyeCandyAction = eyeCandyItem.getAttribute("data-js-action-on-touch");
    const target = document.querySelector("main");
  
    eyeCandyItem.addEventListener("touchstart", () => {
      target.classList.add(eyeCandyAction);
    });
  
    eyeCandyItem.addEventListener("click", () => {

      if(eyeCandyAction === "move-right") {
        target.classList.remove("move-left");
        return; 
      }

      target.classList.add(eyeCandyAction);
    });
  };

  const actionOnLoad = () => {
    const eyeCandyItem = document.querySelector("[data-js-on-load-action]");
    if(!eyeCandyItem || eyeCandyItem === null) return;
  
    const eyeCandyAction = eyeCandyItem.getAttribute("data-js-on-load-action");
    const target = document.querySelector("main");
    
    target.classList.add(eyeCandyAction);    
  };

  actionOnTouch();
  actionOnLoad();

};

/* Adding modal dialog #################################################### */
const addModalDialog = () => {

  const dialog = document.querySelector("[data-js-ar-actions]");

  if(!dialog || dialog === null) return;
  dialog.showModal();

  const start = document.querySelector("[data-js-ar-actions-start]");
  const bypass = document.querySelector("[data-js-ar-actions-bypass]");

  start.addEventListener("click", () => {
    dialog.close();

    const target = document.querySelector("[data-js-inject-ar-code]");
    if(!target || target === null) return;
    //target.innerHTML = decodeURI(arCode);
    
  });

  bypass.addEventListener("click", () => {
    dialog.close();
    return;
  });
};



/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", () => {
  addingEyeCandy();
  addModalDialog();
});