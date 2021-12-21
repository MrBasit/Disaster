"use strict";

function selectSupportableDisaster(e) {
  let getIndex = 0;
  const supportForm = document.querySelectorAll(
    "#submitted-disasters .flexcontainer article"
  );

  //   get span
  // const span = document.querySelectorAll("span");
  supportForm.forEach((element) => {
    let fire = false;
    element.addEventListener("click", function (e) {
      if (!fire) {
        selectedElement = element;
        supportForm.forEach((element) => {
          if (element.lastElementChild.className === "flexcontainer") {
            element.lastElementChild.style.display = "none";
          }
        });
        element.append(createSupportUI());
        supportDisaster();
        fire = true;
        console.log("fired");
      } else {
        console.log("not fired");
      }
      e.preventDefault();
    });
  });
}

function supportDisaster(e) {
  // support aid
  const aidSupport = document.querySelector(".aidsupport");
  aidSupport.addEventListener("click", function (e) {
    // set aid value
    selectedElement.lastElementChild.previousSibling.firstElementChild.lastElementChild.firstElementChild.lastElementChild.innerText =
      aidValue(disaster);

    // display thank you meassage
    thankyou("Thank you for your support < 3");

    // validation for reached goals
    // if (aidValue(selectedElement) >= reachAidGoal()) {
    //   selectedElement.append(reachedGoal());
    // }

    // hide form
    e.target.parentNode.style.display = "none";
    e.preventDefault();
  });

  // support money
  const moneySupport = document.querySelector(".moneysupport");
  moneySupport.addEventListener("click", function (e) {
    // set currency
    selectedElement.lastElementChild.lastElementChild.lastElementChild.firstElementChild.lastElementChild.innerText =
      moneyValue(selectedElement);

    // display thank you message
    thankyou("Thank you for your support < 3");

    // validate if reached goal
    // if (moneyValue(selectedElement) >= reachMoneyGoal())
    //   selectedElement.append(reachedGoal());

    // hidden form
    e.target.parentNode.style.display = "none";
    e.preventDefault();
  });
}

// Add additional functions below

// get value form aid packages
function aidValue(disaster) {
  let getValue;
  const targetAid = document.querySelector("select");
  targetAid.addEventListener("click", function (e) {
    console.log(e.target.value);
    getValue = e.target.value;
    e.preventDefault();
  });
  return disaster.aidProgress + parseInt(getValue);
}

//get value from money package
function moneyValue(element) {
  let getCurrency;
  const getInput = document.querySelector(".money");
  getCurrency =
    element.lastElementChild.lastElementChild.lastElementChild.firstElementChild
      .lastElementChild.innerText;
  if (getInput.value !== "")
    return parseInt(getCurrency) + parseInt(getInput.value);
  else return getCurrency;
}

// display thank you messsage
function thankyou(message) {
  const div = document.createElement("div");
  div.classList.add("thankyou");
  div.innerText = `${message}`;
  selectedElement.append(div);
}

// reach aid & money goal
function reachAidGoal() {
  return parseInt(
    selectedElement.lastElementChild.firstElementChild.lastElementChild
      .lastElementChild.firstElementChild.innerText
  );
}

function reachMoneyGoal() {
  return parseInt(
    selectedElement.lastElementChild.lastElementChild.lastElementChild
      .lastElementChild.lastElementChild.innerText
  );
}

// reached goal
function reachedGoal() {
  const para = document.createElement("p");
  para.classList.add("success");
  para.innerText = "goal reached";
  return para;
}

// create form UI
function createSupportUI() {
  const packages = ["", "Food", "Medicine", "Diplomats"];
  const values = [0, 10, 50, 100];
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

const parent = document.querySelector(".flexcontainer");
function createDisastersUI(disaster) {
  const dlArray = ["Category:", "Level:", "Location:"];
  const aidLabel = ["Aid:", "Currency:"];
  const aidStatus = ["progress:", "goal:"];

  //target parent element & article
  const article = document.createElement("article");

  // title
  const h3 = document.createElement("h3");
  h3.innerText = disaster.name;

  // img element
  const img = document.createElement("img");
  img.setAttribute("title", "para.name");
  img.setAttribute("alt", "para.name");
  img.setAttribute("src", "./images/flood.svg");

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
      if (index < 1) {
        span.innerText = disaster.aidProgress;
      } else {
        span.innerText = disaster.aidGoal;
      }

      if (increament > 0) {
        span.innerText = disaster.currencyProgress;
      }
      // else {
      //   span.innerText = disaster.currencyGoal;
      // }

      // append child
      nestedli.append(span);
      innerUl.append(nestedli);
    }

    // append li's childs
    li.append(h3, innerUl);
    ul.append(li);
  }
  // append childs
  article.append(h3, img, dl, ul);
  parent.append(article);
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
}

// call display disasters
showDisaster();
