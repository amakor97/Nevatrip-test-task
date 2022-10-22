"use strict";

const routeSelect = document.querySelector(".js-route-select");
const timeSelect1 = document.querySelector(".js-time-select-1");
const timeSelect2 = document.querySelector(".js-time-select-2");

routeSelect.addEventListener("change", function() {
  console.log("route:", routeSelect.value);

  switch(routeSelect.value) {
    case "AtoB": {
      displayAllChildren(timeSelect1);
      let time1Options = [...timeSelect1.children];
      console.log(time1Options);
      time1Options.forEach(function(opt) {
        console.log(opt);
        if (opt.value.indexOf("BtoA") !== -1) {
          opt.style.display = "none";
        }
      })
      timeSelect2.style.visibility = "hidden";
      break;
    }
    case "BtoA": {
      displayAllChildren(timeSelect1);
      let time1Options = [...timeSelect1.children];
      console.log(time1Options);
      time1Options.forEach(function(opt) {
        console.log(opt);
        if (opt.value.indexOf("AtoB") !== -1) {
          opt.style.display = "none";
        }
      })
      timeSelect2.style.visibility = "hidden";
      break;
    }
    case "Roundtrip": {
      timeSelect2.style.visibility = "visible";
      break;
    }
  }

})

function displayAllChildren(elem) {
  const children = [...elem.children];
  children.forEach(function(child) {
    child.style.display = "block";
  })
}