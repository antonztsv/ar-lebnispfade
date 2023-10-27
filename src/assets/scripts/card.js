/* AFRAME.registerComponent("card", {
    init: function () {
        const cardEl = document.querySelector(".card");
        cardEl.classList.add("hidden");
        cardEl.style.display = "none";

    }
}) */

function fillCard(e){
    const data = document.querySelector(".info-head");
    console.log(data.textContent)
}

function toggleCardBody() {
    var cardBody = document.getElementById("cardBody");
    if (cardBody.style.display === "none") {
      cardBody.style.display = "block";
    } else {
      cardBody.style.display = "none";
    }
  }