const form = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstName");
const subject = document.querySelector("#subject");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const submitButton = document.querySelector("button");
const firstNameError = document.querySelector("#firstNameError");
const subjectError = document.querySelector("#subjectError");
const emailError = document.querySelector("#emailError");
const addressError = document.querySelector("#addressError");
const successMessage = document.querySelector("#successMessage");
const inputCheckbox = document.querySelector("#checkbox")

form.addEventListener("submit", validateForm);
firstName.addEventListener("blur", validateForm);
subject.addEventListener("blur", validateForm);
email.addEventListener("blur", validateForm);
address.addEventListener("blur", validateForm);
inputCheckbox.addEventListener("change", validateForm);

function validateForm(event) {
  let isValid = true;

  if (firstName.value.trim().length <= 1) {
    firstNameError.style.display = "block";
    isValid = false;
  } else {
    firstNameError.style.display = "none";
  }

  if (subject.value.trim().length <= 10) {
    subjectError.style.display = "block";
    isValid = false;
  } else {
    subjectError.style.display = "none";
  }

  if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email.value.trim())) {
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  if (address.value.trim().length <= 20) {
    addressError.style.display = "block";
    isValid = false;
  } else {
    addressError.style.display = "none";
  }
  if (!inputCheckbox.checked) {
    console.log("Checkbox not checked");
    inputCheckbox.classList.add("error");
    isValid = false;
  } else {
    inputCheckbox.classList.remove("error");
  }

  submitButton.disabled = !isValid;

  console.log("Button is disabled:", submitButton.disabled);

  if (event.type === "submit") {
    event.preventDefault();
    if (isValid) {
      successMessage.innerHTML = "Your form has been submitted successfully.";
      successMessage.style.display = "block";

      // form.submit();
    }
  }

  console.log("Form is valid:", isValid);
}
