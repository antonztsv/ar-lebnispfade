/* Functions & Classes
############################################################################ */

function fillCard(e){
    const data = document.querySelector(".info-head");
    console.log(data.textContent)
}

const addCardNavigation = () => {
  const cardWrap = document.querySelector("[data-js-card-wrap]");
  const cardNavigation = document.querySelector("[data-js-card-navigation]");

  if(!cardWrap || !cardNavigation) return;

  cardNavigation.addEventListener("click", (e) => {
    cardWrap.classList.toggle("is-active");
  });
}

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", (event) => {
  addCardNavigation();
});