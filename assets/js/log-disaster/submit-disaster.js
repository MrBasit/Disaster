"use strict";

function submitDisaster(e) {
  // target save disasters
  document.querySelector("[type = submit]").addEventListener("click", function (e) {
  saveDisaster(addDisaster());
  e.stopPropagation();
  e.preventDefault();
});

}

function saveDisaster(disaster) {

    const submittedDisasters = getFromLocalStorage(); 
       if(checkDuplicate(getHeading, getCountry)){
         submittedDisasters.push(disaster);
         localStorage.setItem(
           "submittedDisasters",
           JSON.stringify(submittedDisasters)
           );
           displayThankYou("thankyou", "Thank you for your submission");
       }
       else{
         displayThankYou('thankyou',displayFeedbackDisasterSaved())
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
    aidGoal: determineAid(getLength, getDisasterLength),
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


// call functions


