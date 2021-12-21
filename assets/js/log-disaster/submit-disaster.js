"use strict";

function submitDisaster(e) {}

function saveDisaster(disaster) {
  if (checkDuplicate(getHeading)) {
    const submittedDisasters = getFromLocalStorage();
    submittedDisasters.push(disaster);
    localStorage.setItem(
      "submittedDisasters",
      JSON.stringify(submittedDisasters)
    );
    displayThankYou("thankyou", "Thank you for your submission");
  }
}

// Add additional functions below
function addDisaster() {
  return {
    name: getHeading,
    category: getCategory,
    level: getLevel,
    location: getCountry,
    aidProgress: 0,
    currencyProgress: 0,
    aidGoal: determineAid(getLength, aid.length),
    currencyGoal: determineCurrency(getLevel),
    requestedAid: requestedAid,
  };
}
// get data from local storage
function getFromLocalStorage() {
  let submittedDisasters;
  if (localStorage.getItem("submittedDisasters") === null)
    return (submittedDisasters = []);
  else
    return (submittedDisasters = JSON.parse(
      localStorage.getItem("submittedDisasters")
    ));
}
// check duplicate in local storage
function checkDuplicate(disaster) {
  let validate = true;
  let getStorage = JSON.parse(localStorage.getItem("submittedDisasters"));
  getStorage.forEach((element) => {
    if (disaster === element.name && getCountry === element.location)
      validate = false;
  });
  return validate;
}
// target save disasters
// document
//   .querySelector("#disaster-aid")
//   .lastElementChild.lastElementChild.addEventListener("click", function (e) {
//     saveDisaster(addDisaster());
//     e.preventDefault();
//   });
