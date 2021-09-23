function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBody = document.querySelector(".modal-body");
const modalConfirm = document.querySelector(".modal__confirm");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  hideConfirm();
}

function showConfirm() {
  modalBody.style.display = "none";
  modalConfirm.style.display = "flex";
}

function hideConfirm() {
  modalConfirm.style.display = "none";
  modalBody.style.display = "block";
}

/* - - - Form - - - */

// Inputs
const firstForm = document.getElementById("first");
const lastForm = document.getElementById("last");
const emailForm = document.getElementById("email");
const birthdateForm = document.getElementById("birthdate");
const quantityForm = document.getElementById("quantity");
const locationForm = document.querySelectorAll(".checkbox-input[type=radio]");
const conditionForm = document.getElementById("checkbox1");
const condiCheckbox = document.getElementsByClassName("check")[0];

// colors
const colorDefault = "#279e7a";
const colorGrey = "#ccc";

// Show Error
function displayError(input) {
  input.parentNode.getElementsByClassName("errorValidation")[0].style.display = "block";
}

// Hide Error
function hideError(input) {
  input.parentNode.getElementsByClassName("errorValidation")[0].style.display = "none";
}

// Change the border color of the input
function border(input, color) {
  input.style.borderColor = color;
}

// Change the border color of all radio boxes
function borderRadio(color) {
  var radios = document.querySelectorAll(".radio");
  radios.forEach(child => {
    child.style.borderColor = color;
  });
}

// Hide all errors and remove red border color
function resetErrors() {
  hideError(firstForm);
  border(firstForm, colorGrey);

  hideError(lastForm);
  border(lastForm, colorGrey);

  hideError(emailForm);
  border(emailForm, colorGrey);

  hideError(birthdateForm);
  border(birthdateForm, colorGrey);

  hideError(quantityForm);
  border(quantityForm, colorGrey);

  hideError(locationForm[1]);
  borderRadio(colorDefault);

  hideError(conditionForm);
  border(condiCheckbox, colorDefault);
}

/* - - - All checkers - - - */
function checkFirst() {
  return (firstForm.value !== null && firstForm.value.length >= 2)
}

function checkLast() {
  return (lastForm.value !== null && lastForm.value.length >= 2)
}

function checkEmail() {
  return /^\S+@\S+\.\S+$/.test(emailForm.value);
}

function checkBirthdate() {
  let birthdate = new Date(birthdateForm.value);
  let today = new Date();

  if (birthdate.toString() !== "Invalid Date") {

    return !( // Check if the date isn't after today
      birthdate.getFullYear() > today.getFullYear() ||
      (birthdate.getFullYear() == today.getFullYear() && birthdate.getMonth() > today.getMonth()) ||
      (birthdate.getFullYear() == today.getFullYear() && birthdate.getMonth() == today.getMonth() && birthdate.getDate() > today.getDate())
    );

  } else {
    return false;
  }
}

function checkQuantity() {
  return /^[0-9]+$/.test(quantityForm.value);
}

function checkLocation() {
  for (let radio of locationForm) {
    if (radio.checked === true) return true;
  }
  return false;
}

function checkCondition() {
  return conditionForm.checked;
}

/* - - - Main function to validate the form - - - */
function validate(event) {
  event.preventDefault();

  var valide = true;
  resetErrors();


  if (!checkFirst()) {
    displayError(firstForm);
    border(firstForm, "red");
    valide = false;
  }

  if (!checkLast()) {
    displayError(lastForm);
    border(lastForm, "red");
    valide = false;
  }

  if (!checkEmail()) {
    displayError(emailForm);
    border(emailForm, "red");
    valide = false;
  }

  if (!checkBirthdate()) {
    displayError(birthdateForm);
    border(birthdateForm, "red");
    valide = false;
  }

  if (!checkQuantity()) {
    displayError(quantityForm);
    border(quantityForm, "red");
    valide = false;
  }

  if (!checkLocation()) {
    displayError(locationForm[1]);
    borderRadio("red");
    valide = false;
  }

  if (!checkCondition()) {
    displayError(conditionForm);
    border(condiCheckbox, "red");
    valide = false;
  }

  if (valide) {
    showConfirm();
  }

}