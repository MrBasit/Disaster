"use strict";
// Determine parameters for this function yourself
function renderDisasters(e) {
  let index = 0;
  const location = document.querySelector("#location");
  getCountry = location.value;
  location.value = "";
  const getImages = [
    "images/flood.svg",
    "images/pandemic.svg",
    "images/chemical-spill.svg",
    "images/refugee-influx.svg",
    "images/pandemic.svg",
    "images/flood.svg",
    "images/hail-storm.svg",
    "images/tornado.svg",
  ];
  const dataArray = ["Category:", "Level:"];
  // show & hide form
  document.querySelector("#disaster-location").classList.add("hidden");
  document.querySelector("#disaster-type").classList.remove("hidden");
  const disasters = document.querySelector(".disasters");

  disasterTypes.forEach(() => {
    disasterUI(disasters, disasterTypes, getImages, dataArray, index);
    index++;
  });
  selectDisaster(e);
  getDisasterLength = document.querySelectorAll('.disasters article').length;
  e.preventDefault();
}

function renderBasicInfo(disaster) {}

function renderAid(disaster) {}

function displayThankYou(selector, message) {
  document.querySelector("main form").classList.add("hidden");
  const div = document.createElement("div");
  div.classList.add(`${selector}`);
  div.innerText = message;
  document.querySelector("main").append(div);
}

function renderAvailableAid(aid, selector) {}

function displayFeedbackDisasterSaved() {}

// Add additional functions below
// select disaster type
document.querySelector(".lone").addEventListener("click", renderDisasters);

// create UI
function disasterUI(disaster, disasterType, imageArray, dataArray, index) {
  const parentElement = document.createElement("article");
  const h3 = document.createElement("h3");
  h3.innerText = disasterType[index].name;

  // create image element here
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.setAttribute("src", imageArray[index]);
  figure.append(img);

  // create dl
  const dl = document.createElement("dl");
  for (let i = 0; i < dataArray.length; i++) {
    const dt = document.createElement("dt");
    dt.innerText = dataArray[i];
    const dd = document.createElement("dd");
    if (i < 1) dd.innerText = disasterType[index].category;
    else dd.innerText = disasterType[index].level;
    dl.append(dt, dd);
  }

  // append childs
  parentElement.append(h3, figure, dl);
  disaster.append(parentElement);
  index++;
}
