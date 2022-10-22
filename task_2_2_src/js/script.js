"use strict";

const routeSelect = document.querySelector(".js-route-select");
const timeSelect1 = document.querySelector(".js-time-select-1");
const timeSelect2 = document.querySelector(".js-time-select-2");

routeSelect.addEventListener("change", function() {
  console.log("route:", routeSelect.value);

  timeSelect1.style.visibility = "visible";

  switch(routeSelect.value) {
    case "AtoB": {
      timeSelect1.children[0].selected = "true";
      timeSelect2.children[0].selected = "true";

      displayAllChildren(timeSelect1);
      let time1Options = [...timeSelect1.children];
      time1Options.forEach(function(opt) {
        if (opt.value.indexOf("BtoA") !== -1) {
          opt.style.display = "none";
        }
      })
      timeSelect2.style.visibility = "hidden";
      break;
    }

    case "BtoA": {
      timeSelect1.children[0].selected = "true";
      timeSelect2.children[0].selected = "true";

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

      displayAllChildren(timeSelect1);
      let time1Options = [...timeSelect1.children];
      time1Options.forEach(function(opt) {
        if (opt.value.indexOf("BtoA") !== -1) {
          opt.style.display = "none";
        }
      })

      timeSelect1.children[0].selected = "true";
      break;
    }
  }

})

function displayAllChildren(elem) {
  const children = [...elem.children];
  children.forEach(function(child, index) {
    if (index !== 0) {
      child.style.display = "block";
    }

  })
}