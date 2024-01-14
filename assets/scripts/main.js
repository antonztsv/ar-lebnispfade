/* Functions
############################################################################ */


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

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", () => {
  addingEyeCandy();
});