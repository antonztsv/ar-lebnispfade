/* Functions & Classes
############################################################################ */

function fillCard(e){
    const data = document.querySelector(".info-head");
    console.log(data.textContent)
}

const addCardNavigation = () => {
  const cardContent = document.querySelector("[data-js-card-content]");
  const cardWrap = document.querySelector("[data-js-card-wrap]");
  const cardNavigation = document.querySelector("[data-js-card-navigation]");

  if(!cardContent || !cardNavigation) return;

  cardNavigation.addEventListener("click", (e) => {
    cardContent.classList.toggle("is-active");
    cardWrap.classList.toggle("is-active");
  });
}

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", (event) => {
  addCardNavigation();
});