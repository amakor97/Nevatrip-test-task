"use strict";

const screenXl = 1200;
const moreTimesBtns = document.querySelectorAll(".js-more-times-btn");

moreTimesBtns.forEach(function(moreTimesBtn) {
  let sheduleCont = moreTimesBtn.parentNode;
  moreTimesBtn.addEventListener("click", function() {
    if (!sheduleCont.style.maxHeight || sheduleCont.style.maxHeight === "32px" || sheduleCont.style.maxHeight === "28px") {
      sheduleCont.style.maxHeight = "128px";
    } else {
      sheduleCont.style.maxHeight = (window.screen.width >= screenXl) ? "32px" : "28px";
    }
  })
})
