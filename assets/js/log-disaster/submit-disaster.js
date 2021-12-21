"use strict";

function submitDisaster(e) {}

function saveDisaster(disaster) {

    const submittedDisasters = getFromLocalStorage();
    console.log(submittedDisasters);
    console.log( checkDuplicate(getHeading, getCountry))  
    if(submittedDisasters.Length < 1  || checkDuplicate(getHeading, getCountry)){
      console.log('not duplicated')  
      submittedDisasters.push(disaster);
        localStorage.setItem(
          "submittedDisasters",
          JSON.stringify(submittedDisasters)
        );
      console.log(submittedDisasters);

    }

    displayThankYou("thankyou", "Thank you for your submission");
  
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
    aidGoal: determineAid(getLength, aid.Length),
    currencyGoal: determineCurrency(getLevel),
    requestedAid: requestedAid,
  };
}
// get data from local storage
function getFromLocalStorage() {
  let submittedDisasters;
  if (localStorage.getItem("submittedDisasters") === null){
    return (submittedDisasters = []);
  }
  else{
      return (submittedDisasters = JSON.parse(
        localStorage.getItem("submittedDisasters")
      ));
    }
}
// check duplicate in local storage
function checkDuplicate(name, country) {
  let validate = true;
  let getStorage = getFromLocalStorage();
  getStorage.forEach((element) => {
    if (name === element.name && country === element.location)
      validate = false;
  });
  return validate;
}
// target save disasters
document
  .querySelector("#disaster-aid")
  .lastElementChild.lastElementChild.addEventListener("click", function (e) {
    saveDisaster(addDisaster());
    e.preventDefault();
  });
