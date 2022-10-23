"use strict";

const routeSelect = document.querySelector(".js-route-select");
const timeSelect1 = document.querySelector(".js-time-select-1");
const timeSelect2 = document.querySelector(".js-time-select-2");
const timeLabel1 = document.querySelector(".js-time-label-1");
const timeLabel2 = document.querySelector(".js-time-label-2");

const clientsNum = document.querySelector(".js-num-input");
const clientsNumLabel = document.querySelector(".js-num-label");
const calcBtn = document.querySelector(".js-calc-btn");
const htmlOutput = document.querySelector(".js-output-elem");

let cost = undefined;
let totalCost = undefined;

const mskTimeOffset = 3;

routeSelect.addEventListener("change", function() {
  console.log("route:", routeSelect.value);
  htmlOutput.innerText = "";

  timeSelect1.style.visibility = "visible";
  timeLabel1.style.visibility = "visible";

  switch(routeSelect.value) {
    case "AtoB": {
      timeSelect1.children[0].selected = "true";
      timeSelect2.children[0].selected = "true";

      displayAllChildren(timeSelect1);
      let time1Options = [...timeSelect1.children];
      time1Options.forEach(function(opt) {
        if (opt.value.indexOf("BtoA") !== -1) {
          opt.style.display = "none";
          opt.disabled = "true";
        }
      })
      timeSelect2.style.visibility = "hidden";
      timeLabel2.style.visibility = "hidden";

      calcBtn.style.visibility = "hidden";
      //clientsNum.style.visibility = "hidden";
      //clientsNumLabel.style.visibility = "hidden";


      cost = 700;

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
          opt.disabled = "true";
        }
      })
      timeSelect2.style.visibility = "hidden";
      timeLabel2.style.visibility = "hidden";

      calcBtn.style.visibility = "hidden";
      //clientsNum.style.visibility = "hidden";
      //clientsNumLabel.style.visibility = "hidden";

      cost = 700;

      break;
    }

    case "Roundtrip": {
      timeSelect2.style.visibility = "visible";
      timeLabel2.style.visibility = "visible";

      displayAllChildren(timeSelect1);
      displayAllChildren(timeSelect2);
      let time1Options = [...timeSelect1.children];
      time1Options.forEach(function(opt) {
        if (opt.value.indexOf("BtoA") !== -1) {
          opt.style.display = "none";
          opt.disabled = "true";
        }
      })

      timeSelect1.children[0].selected = "true";
      calcBtn.style.visibility = "hidden";
      //clientsNum.style.visibility = "hidden";
      //clientsNumLabel.style.visibility = "hidden";

      cost = 1200;

      break;
    }
  }

})

timeSelect1.addEventListener("change", function() {
  console.log("raw:", timeSelect1.value);
  console.log("raw to A", timeSelect2.value);

  htmlOutput.innerText = "";

  const hours1 = parseInt(timeSelect1.value.slice(0, 2));
  const mins1 = parseInt(timeSelect1.value.slice(2, 4));
  console.log({hours1, mins1});

  const totalMins1 = hours1*60 + mins1;
  const minsAfterTrip1 = totalMins1 + 50;
  console.log({totalMins1, minsAfterTrip1});

  
  if (timeSelect2.style.visibility !== "hidden") {
    const hours2 = parseInt(timeSelect2.value.slice(0, 2));
    const mins2 = parseInt(timeSelect2.value.slice(2, 4));
    console.log({hours2, mins2});
    const totalMins2 = hours2*60 + mins2;
    console.log({totalMins2})
    if (totalMins2 <= minsAfterTrip1) {
      timeSelect2.children[0].selected = "true";
    }
    
    
    displayAllChildren(timeSelect2);

    let time2Options = [...timeSelect2.children];
    console.log(time2Options);
      time2Options.forEach(function(opt) {
        //console.log(opt);
        const hours2 = parseInt(opt.value.slice(0, 2)); //NaN?
        const mins2 = parseInt(opt.value.slice(2, 4));
        //console.log({hours2, mins2});
        const totalMins2 = hours2*60 + mins2;
        //console.log({totalMins2})
        if (totalMins2 <= minsAfterTrip1) {
          opt.style.display = "none";
          opt.disabled = "true";
        }
      })
  }

  if ((timeSelect1.value !== "default") && (routeSelect.value !== "Roundtrip") || ((timeSelect1.value !== "default") && (timeSelect2.value !== "default"))) {
    calcBtn.style.visibility = "visible";
    clientsNum.style.visibility = "visible";
    clientsNumLabel.style.visibility = "visible";
  } else if (timeSelect2.value === "default") {
    calcBtn.style.visibility = "hidden";
    //clientsNum.style.visibility = "hidden";
    //clientsNumLabel.style.visibility = "hidden";
  }
})

timeSelect2.addEventListener("change", function() {
  htmlOutput.innerText = "";
  if ((timeSelect1.value !== "default") && (timeSelect2.value !== "default")) {
    calcBtn.style.visibility = "visible";
    //clientsNum.style.visibility = "visible";
    //clientsNumLabel.style.visibility = "visible";
  }
})

function displayAllChildren(elem) {
  const children = [...elem.children];
  children.forEach(function(child, index) {
    if (index !== 0) {
      child.style.display = "block";
      child.disabled = false;
    }

  })
}




//let currentDate = (new Date()).toString();
let currentDate = new Date();
console.log(currentDate);

let minsOffset = currentDate.getTimezoneOffset();
console.log({minsOffset});

//let hoursOffset = parseInt(currentDate.slice(-6, -4));
let hoursOffset = -minsOffset / 60;
console.log(hoursOffset);

let hoursDiff = hoursOffset - mskTimeOffset;
console.log({hoursDiff});

function correctTime(text) {
  let hours = +(text.slice(0, 2));

  let correctedHours = hours + hoursDiff;
  if (correctedHours >= 24) {
    correctedHours -= 24;
  }
  let corrected = `${correctedHours}${text.slice(2)}`;
  return corrected;
}

const timeElems = document.querySelectorAll(".js-time-elem");
timeElems.forEach(function(timeElem) {
  timeElem.textContent = correctTime(timeElem.textContent);
  /*
  let text = timeElem.textContent;
  let hours = +(timeElem.textContent.slice(0, 2));
  console.log({hours});
  let correctedText = `${hours + hoursDiff}${timeElem.textContent.slice(2)}`;
  console.log({correctedText});
  timeElem.textContent = correctedText;
  */
})

clientsNum.addEventListener("change", function() {
  if ((this.value < 1) || (this.value > 99)) {
    this.value = 1;
  }
})


calcBtn.addEventListener("click", function() {
  console.log(routeSelect.value, correctTime(timeSelect1.value), correctTime(timeSelect2.value), clientsNum.value);
  console.log({cost});
  totalCost = cost * clientsNum.value;
  console.log({totalCost});
  
  const ticketEnding = (clientsNum.value > 4) ? "ов" : 
  (clientsNum.value > 1) ? "а" : "";
  const route = (routeSelect.value === "AtoB") ? "из A в B" :
  (routeSelect.value === "BtoA") ? "из B в A" :
  "из A в B и обратно";
  const freeTime = (routeSelect.value !== "Roundtrip") ? "" : "(с учётом времени между рейсами)";
  const travelTime = (routeSelect.value !== "Roundtrip") ? 50 : 
  ((timeSelect2.value.slice(0, 2)*60 + +timeSelect2.value.slice(2, 4) + 50) - (timeSelect1.value.slice(0, 2)*60 + +timeSelect1.value.slice(2, 4)));

  const firstTrip = (routeSelect.value !== "Roundtrip") ? "Т" : "Первый т";
  
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
    `, второй теплоход отправляется в ${secondStartTime}, а прибудет в ${secondFinishTime}`;
  }




  htmlOutput.innerText = 
  `Вы выбрали ${clientsNum.value} билет${ticketEnding} по маршруту ${route} стоимостью ${totalCost} руб.
  Это путешествие ${freeTime} займёт у Вас ${travelTime} минут.
  ${firstTrip}еплоход отправляется в ${firstStartTime}, а прибудет в ${firstFinishTime}${secondTrip}.`;
})