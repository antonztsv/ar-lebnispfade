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

/* Scrollspy
############################################################################ */
const addScrollSpy = () => { 

  const target = document.querySelector('[data-js-scrollspy-target]');
  if(!target || target === null) return;

  const scrollRoot = document.querySelector('[data-js-scrollspy-root]')
  const targetHeight = target.clientHeight;

  const options = {
    root: scrollRoot,
    rootMargin: `-${targetHeight - 100}px`,
    threshold: 0.5
  }

  /* The callback that will fire on intersection */
  const onIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-small')
      } else {
        entry.target.classList.add('is-small')
      }
    });
  }

  /* Create the observer */
  const observer = new IntersectionObserver(onIntersect, options)
  observer.observe(target)

};

/* Mailto
############################################################################ */

const addMailTo = () => {

  const mailTos = document.querySelectorAll("[data-js-to]");
  if(mailTos.length === 0) return;

  mailTos.forEach((mailto) => {
    mailto.addEventListener("click", () => {
      window.location.href = `mailto: ${mailto.dataset.jsTo}@${mailto.dataset.jsDomain}`;
    });
  });
};


/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", () => {
  addingEyeCandy();
  addModalDialog();
  addMailTo();
});

window.addEventListener("load", () => {
  addScrollSpy();
});

alert("Hello from main.js!");
