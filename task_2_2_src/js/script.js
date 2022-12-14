"use strict";

const routeSelect = document.querySelector(".js-route-select");
const timeSelect1 = document.querySelector(".js-time-select-1");
const timeSelect2 = document.querySelector(".js-time-select-2");
const timeLabel1 = document.querySelector(".js-time-label-1");
const timeLabel2 = document.querySelector(".js-time-label-2");

const timeElems = document.querySelectorAll(".js-time-elem");
const clientsNum = document.querySelector(".js-num-input");
const clientsNumLabel = document.querySelector(".js-num-label");
const calcBtn = document.querySelector(".js-calc-btn");
const htmlOutput = document.querySelector(".js-output-elem");

const time1Options = [...timeSelect1.children];

let cost = undefined;
let totalCost = undefined;

const mskTimeOffset = 3;
const currentDate = new Date();
const minsOffset = currentDate.getTimezoneOffset();
const hoursOffset = -minsOffset / 60;
const hoursDiff = Math.ceil(hoursOffset - mskTimeOffset);


timeElems.forEach(function(timeElem) {
  timeElem.textContent = correctTime(timeElem.textContent);
})


routeSelect.addEventListener("change", function() {
  htmlOutput.innerText = "";
  timeSelect1.style.visibility = "visible";
  timeLabel1.style.visibility = "visible";
  timeSelect1.children[0].selected = "true";

  switch(routeSelect.value) {
    case "AtoB": {
      timeSelect2.children[0].selected = "true";
      displayAllChildren(timeSelect1);

      hideOptionsBySearch(time1Options, "BtoA");
      timeSelect2.style.visibility = "hidden";
      timeLabel2.style.visibility = "hidden";
      calcBtn.style.visibility = "hidden";
      cost = 700;
      break;
    }

    case "BtoA": {
      timeSelect2.children[0].selected = "true";
      displayAllChildren(timeSelect1);

      hideOptionsBySearch(time1Options, "AtoB");
      timeSelect2.style.visibility = "hidden";
      timeLabel2.style.visibility = "hidden";
      calcBtn.style.visibility = "hidden";
      cost = 700;
      break;
    }

    case "Roundtrip": {
      timeSelect2.style.visibility = "visible";
      timeLabel2.style.visibility = "visible";
      displayAllChildren(timeSelect1);
      displayAllChildren(timeSelect2);

      hideOptionsBySearch(time1Options, "BtoA");
      calcBtn.style.visibility = "hidden";
      cost = 1200;
      break;
    }
  }
})


timeSelect1.addEventListener("change", function() {
  htmlOutput.innerText = "";

  const hours1 = parseInt(timeSelect1.value.slice(0, 2));
  const mins1 = parseInt(timeSelect1.value.slice(2, 4));
  const minsAfterTrip1 = hours1*60 + mins1 + 50;
  
  if (timeSelect2.style.visibility !== "hidden") {
    
    displayAllChildren(timeSelect2);

    let time2Options = [...timeSelect2.children];
    time2Options.forEach(function(opt) {
      const hours2 = parseInt(opt.value.slice(0, 2));
      const mins2 = parseInt(opt.value.slice(2, 4));
      const totalMins2 = hours2*60 + mins2;
      if (totalMins2 <= minsAfterTrip1) {
        opt.style.display = "none";
        opt.disabled = true;
      }
      if ((timeSelect2.value !== "default") && (totalMins2 <= minsAfterTrip1)) {
        timeSelect2.children[0].selected = "true";
      }
    })
  }

  if ((timeSelect1.value !== "default") && 
  ((routeSelect.value !== "Roundtrip") || (timeSelect2.value !== "default"))) {
    calcBtn.style.visibility = "visible";
    clientsNum.style.visibility = "visible";
    clientsNumLabel.style.visibility = "visible";
  } else if (timeSelect2.value === "default") {
    calcBtn.style.visibility = "hidden";
  }
})


timeSelect2.addEventListener("change", function() {
  htmlOutput.innerText = "";
  if ((timeSelect1.value !== "default") && (timeSelect2.value !== "default")) {
    calcBtn.style.visibility = "visible";
    clientsNum.style.visibility = "visible";
    clientsNumLabel.style.visibility = "visible";
  }
})


clientsNum.addEventListener("change", function() {
  if ((this.value < 1) || (this.value > 99)) {
    this.value = 1;
  }
})


calcBtn.addEventListener("click", function() {
  totalCost = cost * clientsNum.value;
  
  const ticketEnding = (clientsNum.value > 4) ? "????" : 
  (clientsNum.value > 1) ? "??" : "";
  const route = (routeSelect.value === "AtoB") ? "???? A ?? B" :
  (routeSelect.value === "BtoA") ? "???? B ?? A" : "???? A ?? B ?? ??????????????";
  const freeTime = (routeSelect.value !== "Roundtrip") ? "" : "(?? ???????????? ?????????????? ?????????? ??????????????)";
  const travelTime = (routeSelect.value !== "Roundtrip") ? 50 : 
  ((timeSelect2.value.slice(0, 2)*60 + +timeSelect2.value.slice(2, 4) + 50) - 
  (timeSelect1.value.slice(0, 2)*60 + +timeSelect1.value.slice(2, 4)));
  const firstTrip = (routeSelect.value !== "Roundtrip") ? "??" : "???????????? ??";
  const firstStartTime = `${(correctTime((timeSelect1.value).slice(0, 2))).toString().padStart(2, 0)}-${((timeSelect1.value).slice(2, 4)).toString().padStart(2, 0)}`;
  
  let additionalHour = 0;
  let firstFinishMins = +(firstStartTime.slice(3, 5)) + 50;
  if (firstFinishMins >= 60) {
    firstFinishMins -= 60;
    additionalHour = 1;
  }
  let firstFinishHours = +(firstStartTime.slice(0, 2)) + additionalHour;
  if (firstFinishHours >= 24) {
    firstFinishHours -= 24;
  }

  const firstFinishTime = `${firstFinishHours.toString().padStart(2, 0)}-${firstFinishMins.toString().padStart(2, 0)}`;

  let secondTrip = "";
  if (routeSelect.value === "Roundtrip") {
    const secondStartTime = `${(correctTime((timeSelect2.value).slice(0, 2))).toString().padStart(2, 0)}-${((timeSelect2.value).slice(2, 4)).toString().padStart(2, 0)}`;

    let sAdditionalHour = 0;
    let secondFinishMins = +(secondStartTime.slice(3, 5)) + 50;
    if (secondFinishMins >= 60) {
      secondFinishMins -= 60;
      sAdditionalHour = 1;
    }
    let secondFinishHours = +(secondStartTime.slice(0, 2)) + sAdditionalHour;
    if (secondFinishHours >= 24) {
      secondFinishHours -= 24;
    }

    const secondFinishTime = `${secondFinishHours.toString().padStart(2, 0)}-${secondFinishMins.toString().padStart(2, 0)}`;

    secondTrip = (routeSelect.value !== "Roundtrip") ? "" :
    `, ???????????? ???????????????? ???????????????????????? ?? ${secondStartTime}, ?? ???????????????? ?? ${secondFinishTime}`;
  }

  htmlOutput.innerText = 
  `???? ?????????????? ${clientsNum.value} ??????????${ticketEnding} ???? ???????????????? ${route} ???????????????????? ${totalCost} ??????.
  ?????? ?????????????????????? ${freeTime} ???????????? ?? ?????? ${travelTime} ??????????.
  ${firstTrip}?????????????? ???????????????????????? ?? ${firstStartTime}, ?? ???????????????? ?? ${firstFinishTime}${secondTrip}.`;
})


function hideOptionsBySearch(optArr, text) {
  optArr.forEach(function(opt) {
    if (opt.value.indexOf(text) !== -1) {
      opt.style.display = "none";
      opt.disabled = true;
    }
  })
}


function displayAllChildren(elem) {
  const children = [...elem.children];
  children.forEach(function(child, index) {
    if (index !== 0) {
      child.style.display = "block";
      child.disabled = false;
    }
  })
}


function correctTime(text) {
  if (text === "default") {
    return text;
  }

  const hours = +(text.slice(0, 2));
  const correctedHours = hours + hoursDiff;
  if (correctedHours >= 24) {
    correctedHours -= 24;
  }
  const correctedText = `${correctedHours.toString().padStart(2, 0)}${text.slice(2)}`;
  return correctedText;
}

