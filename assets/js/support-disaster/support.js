"use strict";
let elementRef
function selectSupportableDisaster(e) {
  let getIndex = 0;
  const supportForm = document.querySelectorAll(
    "#submitted-disasters .flexcontainer article"
  );

    supportForm.forEach(form => {
      form.addEventListener('click', function(e){
         selectedElement = form;
         elementRef = form.querySelector('.aid-progress');
         if(form.lastElementChild.className !== 'flexcontainer'){
          //  remove last child
           supportForm.forEach(element => {
             if(element.lastElementChild.className === 'flexcontainer'){
               element.removeChild(element.lastElementChild)
             }
           });
          //  create form ui
           form.append(createSupportUI());
            supportDisaster();
           
          }
        e.preventDefault();
      })
      
    });
}

function supportDisaster(e) {
  // support aid
  const aidSupport = document.querySelector(".aidsupport");
  aidSupport.addEventListener("click", function (e) {
    // set aid value
    const aidProgress = selectedElement.querySelector('.aid-progress');
    const currencyProgress = selectedElement.querySelector('.currency-progress');
    const disasterType = selectedElement.querySelector('h3').innerText;
    const location =  selectedElement.querySelector('dl').lastElementChild.innerText;
    const array = getFromLocalStorage();
    array.forEach(element => {
      if(element.location.toLowerCase() === location.toLowerCase() && element.name === disasterType)
      {
        aidProgress.innerText = aidGoal(element);
      }
    });

    updateLocalStorage(location,disasterType,aidProgress.innerText,currencyProgress.innerText)

    // display thank you meassage
    selectedElement.removeChild(selectedElement.lastElementChild)
    thankyou("Thank you for your support < 3");
    // hide form
    e.stopPropagation();
    e.preventDefault();
  });

  // support money
  const moneySupport = document.querySelector(".moneysupport");
  moneySupport.addEventListener("click", function (e) {
    // selectors
    const currencyProgress = selectedElement.querySelector('.currency-progress');
    const currencyGoal = selectedElement.querySelector('.currency-goal');
    const aidProgress = selectedElement.querySelector('.aid-progress');
    const disasterType = selectedElement.querySelector('h3').innerText;
    const location =  selectedElement.querySelector('dl').lastElementChild.innerText;
    const array = getFromLocalStorage();
    array.forEach(element => {
      if(element.location.toLowerCase() === location.toLowerCase() && element.name === disasterType){
        
        currencyProgress.innerText = moneyGoal(element);
        
        
        if(element.currencyGoal <= moneyGoal()){
          selectedElement.classList.add('success')
          aid.forEach(element => {
            if(disaster.requestedAid === element.name){
              selectedElement.append(reachedGoal(element.confirmationMessage))

            }
          });
        }
      }
    });
    
     updateLocalStorage(location, disasterType, aidProgress.innerText, currencyProgress.innerText)


    // display thank you message
    
    // hidden form
    selectedElement.removeChild(selectedElement.lastElementChild);
    thankyou("Thank you for your support < 3");
    e.stopPropagation();
    e.preventDefault();
  });
}

// Add additional functions below

// get value form aid packages
function aidGoal(disaster) {
  return (parseInt(disaster.aidProgress) + parseInt(document.querySelector("select").value));
 
}

//get value from money package
function moneyGoal(element) {
  const getInput = document.querySelector(".money");
  let value=getInput.value!==''?getInput.value:0;
  if (getInput.value !== null)
    return parseInt(selectedElement.querySelector('.currency-progress').innerText) + parseInt(value);
  else return getCurrency;
}

// display thank you messsage
function thankyou(message) {
  const div = document.createElement("div");
  div.classList.add("thankyou");
  div.innerText = `${message}`;
  selectedElement.append(div);
}


// reached goal
function reachedGoal(message) {
  const para = document.createElement("p");
  para.classList.add("success");
  para.innerText = message;
  return para;
}

// create form UI
function createSupportUI() {
  const packages = ["Food", "Medicine", "Diplomats"];
  const values = [10, 50, 100];
  let index = 0;

  // form
  const form = document.createElement("form");
  const dt = document.createElement("dt");
  dt.style.fontWeight = "bold";
  dt.innerText = "donate aid packages";

  // select & options
  const select = document.createElement("select");
  packages.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute("value", values[index]);
    index++;
    select.append(option);
    option.innerText = element;
  });

  // btn1
  const btn1 = document.createElement("button");
  btn1.classList.add("aidsupport");
  btn1.style.fontFamily = "var(--title-font)";
  btn1.innerText = "HAVE MY SUPPORT";

  const dt1 = document.createElement("dt");
  dt1.style.fontWeight = "bold";
  dt1.innerText = "donate currency";

  // input
  const input = document.createElement("input");
  input.classList.add("money");
  input.setAttribute("type", "number");
  input.setAttribute("min", "1");
  input.setAttribute("max", "9999");
  input.setAttribute("oninput", "validity.valid||(value='')");

  // btn2
  const btn2 = document.createElement("button");
  btn2.classList.add("moneysupport");
  btn2.style.fontFamily = "var(--title-font)";
  btn2.innerText = "TAKE MY MONEY!";

  //   add class in form element
  form.classList.add("flexcontainer");
  form.append(dt, select, btn1, dt1, input, btn2);
  return form;
}

let index = 0;
function createDisastersUI(disaster) {
  const parent = document.querySelector(".flexcontainer");
  const dlArray = ["Category:", "Level:", "Location:"];
  const aidLabel = ["Aid:", "Currency:"];
  const aidStatus = ["progress:", "goal:"];
  const classes = ['aid-progress', 'aid-goal', 'currency-progress', 'currency-goal']
  getImages();

  

  //target parent element & article
  const article = document.createElement("article");

  // title
  const h3 = document.createElement("h3");
  h3.innerText = disaster.name;

  // img element
  const figure = document.createElement('figure')
  const img = document.createElement("img");
  let image= getImages()[index].toLocaleLowerCase();
  image = image.split(' ');
  image=image.join('-');
  const path = `./images/${image}.svg`;
  img.setAttribute("src", path);

  figure.append(img)
  // data labels
  const dl = document.createElement("dl");
  for (let index = 0; index < 3; index++) {
    const dt = document.createElement("dt");
    dt.innerText = dlArray[index];
    const dd = document.createElement("dd");
    if (index < 1) dd.innerText = disaster.category;
    if (index > 0) dd.innerText = disaster.level;
    if (index === 2) dd.innerText = disaster.location;
    dl.append(dt, dd);
  }

  // create ul
  const ul = document.createElement("ul");

  // create li's
  for (let increament = 0; increament < 2; increament++) {
    // create li
    const li = document.createElement("li");

    // create h3
    const h3 = document.createElement("h4");
    h3.innerText = aidLabel[increament];

    // create inner ul
    const innerUl = document.createElement("ul");

    // create inner li's and span
    for (let index = 0; index < 2; index++) {
      // nested li's
      const nestedli = document.createElement("li");
      nestedli.innerText = aidStatus[index];
      const span = document.createElement("span");
      if(classes)

      // first iteration
      if (index == 0 && increament < 1) {
        span.classList.add(classes[index])
        span.innerText = disaster.aidProgress;
      } 
      if(index == 1 && increament < 1){
        span.classList.add(classes[index])
        span.innerText = disaster.aidGoal;
      }
      
      // second iteration
      if(index == 0 && increament > 0){
        span.classList.add(classes[index + 2])

        span.innerText = disaster.currencyProgress;
      }
      if(index == 1 && increament > 0){
        span.classList.add(classes[index + 2])
        span.innerText = disaster.currencyGoal;
      }

      // append child
      nestedli.append(span);
      innerUl.append(nestedli);
    }

    // append li's childs
    li.append(h3, innerUl);
    ul.append(li);
  }
  // append childs
  article.append(h3,figure, dl, ul);
  parent.append(article);
  index++;

  if(disaster.currencyProgress >= disaster.currencyGoal){
     article.classList.add('success');
     article.append(reachedGoal(disaster.message))
    }

    if(disaster.aidProgress >= disaster.aidGoal){
      article.classList.add('success');
      reachedGoal(disaster.message)
  }
}

// update local storage
function updateLocalStorage(location , disasterType, aidProgress, currencyProgress){
  const saveLocalStorage = getFromLocalStorage();
  saveLocalStorage.forEach(element => {
    if((element.location).toLowerCase() === location && element.name === disasterType){
       element.aidProgress = aidProgress;
       element.currencyProgress = currencyProgress;
       localStorage.setItem('submittedDisasters', JSON.stringify(saveLocalStorage))
    }
  });
}

// get images 
function getImages(){
  const imagesArray = []
  const images = getFromLocalStorage();
  images.forEach(element => {
    imagesArray.push(element.name)
  });
  return imagesArray;
}


// show disasters
let selectedElement; // reference targeted element
let disaster;
function showDisaster() {
  getFromLocalStorage().forEach((element) => {
    disaster = element;
    createDisastersUI(element);
  });
  selectSupportableDisaster();
  // supportDisaster();
  // getImages();
}

// call display disasters
showDisaster();


