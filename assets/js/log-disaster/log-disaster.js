"use strict";

function suggestCountry(e, search = "") {
  // get unorderlist
  let changeCase = search.toUpperCase();
  for (const country of countries) {
    if (country.toUpperCase().startsWith(changeCase)) {
      let list = document.createElement("li");
      list.innerText = country;
      searchedCountries.appendChild(list);
    }
  }
}

function selectCountry(e) {
  const countries = document.querySelectorAll("#disaster-location ul li");
  const list = document.querySelector("#disaster-location ul");
  countries.forEach((country) => {
    country.addEventListener("click", function (e) {
      const location = document.querySelector("#location");
      location.value = e.target.innerText;
      list.innerHTML = "";
    });
  });
}

function navigate(e) {}

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
  const arrayofImages = [
    "images/flood-sandbags.svg",
    "images/ask-bono-to-sing.svg",
    "images/media-coverage.svg",
    "images/helping-hands.svg",
    "images/collective-prayer.svg",
  ];
  document.querySelector("#disaster-type").classList.add("hidden");
  const getAid = document.querySelector(".aids");
  if (validate()) {
    document.querySelector("#disaster-aid").classList.remove("hidden");
    aid.forEach((array) => {
      array.disasterTypes.forEach((element) => {
        if (getCategory === element) {
          // create element
          const parentElement = document.createElement("article");
          const h3 = document.createElement("h3");
          h3.innerText = array.name;

          const img = document.createElement("img");
          img.setAttribute("src", arrayofImages[count]);
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

  aids.forEach((aid) => {
    aid.addEventListener("click", function (e) {
      aids[getIndex].classList.remove("selected");
      getIndex = Array.from(aids).indexOf(aid);
      aid.classList.add("selected");
      requestedAid = aid.firstChild.innerText;
    });
  });
}

// Add additional functions below

let getCategory, getHeading, getCountry, getLevel, requestedAid, getLength;

// general function
function validate() {
  let result = true;
  if (getHeading === "Minor hostage situation") result = false;
  return result;
}
// search location
const searchedCountries = document.querySelector("#disaster-location ul");
document.querySelector("#location").addEventListener("keyup", function (e) {
  // remove list
  searchedCountries.innerHTML = "";
  let country = e.target.value;
  suggestCountry(e, country);
  selectCountry(e);
  e.preventDefault();
});

// goto search location
const btnPrevious = document.querySelector(".previous");
btnPrevious.addEventListener("click", function (e) {
  document.querySelector("#disaster-type").classList.add("hidden");
  document.querySelector("#disaster-location").classList.remove("hidden");
  e.preventDefault();
});
// ----show aids----//
document.querySelector("#show-aid").addEventListener("click", showAid);

// goto change disaster
const btnChangeDisaster =
  document.querySelector("#disaster-aid").lastElementChild.firstElementChild;
btnChangeDisaster.addEventListener("click", function (e) {
  document.querySelector("#disaster-aid").classList.add("hidden");
  document.querySelector("#disaster-type").classList.remove("hidden");
  document.querySelector("#disaster-aid .aids").innerHTML = "";
  // submittedDisasters.forEach((element) => {
  //   console.log(element);
  // });
  e.preventDefault();
});