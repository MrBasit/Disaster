"use strict";
// Determine parameters for this function yourself
function renderDisasters(e) {
  let index = 0;
  const location = document.querySelector("#location");
  getCountry = location.value;
  location.value = "";
 
  const dataArray = ["Category:", "Level:"];
  // show & hide form
  document.querySelector("#disaster-location").classList.add("hidden");
  document.querySelector("#disaster-type").classList.remove("hidden");
  const disasters = document.querySelector(".disasters");

  disasterTypes.forEach(() => {
    disasterUI(disasters,disasterTypes,dataArray, index);
    index++;
  });
  selectDisaster(e);
  getDisasterLength = document.querySelectorAll('.disasters article').length;
  e.preventDefault();
}

function renderBasicInfo(disasterType) {
  disasterType = getHeading;
  let result = true;
  if (disasterType === "Minor hostage situation"){
    displayThankYou('thankyou', ' The ‘minor hostage situation’ does not have any aid available')
    result = false;
  } 
    
  return result;
}

function renderAid(disaster) {
}

function displayThankYou(selector, message) {
  document.querySelector("main form").classList.add("hidden");
  const div = document.createElement("div");
  div.classList.add(`${selector}`);
  div.innerText = message;
  document.querySelector("main").append(div);
}

function renderAvailableAid(aid, selector) {}

function displayFeedbackDisasterSaved() {
  return 'disaster already submitted';
}

// Add additional functions below

// create UI
function disasterUI(disaster, disasterType, dataArray, index) {
  const parentElement = document.createElement("article");
  const h3 = document.createElement("h3");
  h3.innerText = disasterType[index].name;

  // create image element here
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  let image = h3.innerText.toLocaleLowerCase();
  image = image.split(' ')
  image = image.join('-')
  const path = `./images/${image}.svg`
  img.setAttribute("src", path);
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
