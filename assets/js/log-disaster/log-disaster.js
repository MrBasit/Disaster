"use strict";
var script = document.createElement("script");
script.src = "./assets/js/data/countries.js";
document.body.appendChild(script);
// document.writeln(
//   "<script type='text/javascript' src='./assets/js/data/countries.js'></script>"
// );

// target elements
const searchedCountries = document.querySelector("#disaster-location ul");
const input = document.querySelector("#location");

function suggestCountry(e) {
  input.addEventListener("keyup", function (e) {
    searchedCountries.innerHTML = "";
    let searchedCountry = e.target.value;
    for (const country of countries) {
      if (country.toUpperCase().startsWith(searchedCountry.toUpperCase())) {
        let list = document.createElement("li");
        list.innerText = country;
        searchedCountries.appendChild(list);
      }
    }
    selectCountry(e);
    e.preventDefault();
  });
}

function selectCountry(e) {
  const countries = document.querySelectorAll("#disaster-location ul li");
  countries.forEach((country) => {
    country.addEventListener("click", function (e) {
      input.value = e.target.innerText;
      searchedCountries.innerHTML = "";
      e.preventDefault();
    });
  });
}

function navigate() {
  document.querySelector(".next").addEventListener("click", function (e) {
    e.preventDefault();
    if (input.value) renderDisasters(e);
    else alert("input field required");
  });

  document.querySelector("#show-aid").addEventListener("click", function (e) {
    e.preventDefault();
    showAid();
  });

  // goto search location
  document.querySelector(".previous").addEventListener("click", function (e) {
    document.querySelector("#disaster-type").classList.add("hidden");
    document.querySelector("#disaster-location").classList.remove("hidden");
    document.querySelector(".disasters").innerHTML = " ";
    e.preventDefault();
  });

  // change disaster type
  const btnChangeDisaster = document.querySelector(
    "#disaster-aid .flexcontainer .previous"
  );

  btnChangeDisaster.addEventListener("click", function (e) {
    document.querySelector("#disaster-aid").classList.add("hidden");
    document.querySelector("#disaster-type").classList.remove("hidden");
    document.querySelector("#disaster-aid .aids").innerHTML = "";
    e.preventDefault();
  });
}

function selectDisaster(e) {
  let getIndex = 0;
  let disasters = document.querySelectorAll(".disasters article");
  disasters.forEach((disaster) => {
    disaster.addEventListener("click", function (e) {
      disasters[getIndex].classList.remove("selected");
      getIndex = Array.from(disasters).indexOf(disaster);
      disaster.classList.add("selected");
      // get disaster type.
      getHeading = disaster.firstChild.innerText;
      getCategory = disaster.lastChild.firstChild.nextSibling.innerText;
      getLevel = disaster.lastChild.lastChild.innerText;
    });
  });
  e.preventDefault();
}

function showAid(e) {
  let count = 0;
  document.querySelector("#disaster-type").classList.add("hidden");
  const getAid = document.querySelector(".aids");
  if (renderBasicInfo(getHeading)) {
    document.querySelector("#disaster-aid").classList.remove("hidden");
    aid.forEach((array) => {
      array.disasterTypes.forEach((element) => {
        if (getCategory === element) {
          // create element
          const parentElement = document.createElement("article");
          const h3 = document.createElement("h3");
          h3.innerText = array.name;

          const img = document.createElement("img");
          let image = array.name.toLocaleLowerCase().split(" ");
          image = image.join("-");
          image = `./images/${image}.svg`;
          img.setAttribute("src", image);

          const label = document.createElement("label");
          label.innerText = "applies to:";
          const para = document.createElement("p");
          para.innerText = array.disasterTypes;
          parentElement.append(h3, img, label, para);
          getAid.append(parentElement);
        }
      });
      count++;
    });
    selectAid();
  }
  getLength = document.querySelectorAll(".aids article").length;
  e.preventDefault();
}

function selectAid(e) {
  let getIndex = 0;
  const aids = document.querySelectorAll(".aids article");

  aids.forEach((element) => {
    element.addEventListener("click", function (e) {
      aids[getIndex].classList.remove("selected");
      getIndex = Array.from(aids).indexOf(element);
      element.classList.add("selected");
      requestedAid = element.firstChild.innerText;
    });
  });
}

// Add additional functions below
let getCategory,
  getHeading,
  getCountry,
  getLevel,
  requestedAid,
  getLength,
  getDisasterLength;

// calling functions
suggestCountry();
navigate();
