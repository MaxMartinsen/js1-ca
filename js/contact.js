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
const inputCheckbox = document.querySelector("#checkbox");
const loader = document.querySelector(".loader");
const formContent = document.querySelector(".form")
const backLink = document.querySelector("#back");

backLink.onclick = () => {
  history.back();
};

console.log("You visited this page from:", document.referrer);

loader.style.display = "block";
setTimeout(() => {
  formContent.style.display = "block";
  loader.style.display = "none";
}, 1000);

form.addEventListener("submit", validationSubmit);
firstName.addEventListener("blur", validationForm);
subject.addEventListener("blur", validationForm);
email.addEventListener("blur", validationForm);
address.addEventListener("blur", validationForm);
inputCheckbox.addEventListener("change", validationCheckboxChange);

function validationForm(event) {
  const { id, value } = event.target;
  const errorEl = document.querySelector(`#${id}Error`);

  if (value.trim().length === 0) {
    errorEl.style.display = "block";
    submitButton.disabled = true;
  } else {
    errorEl.style.display = "none";
    submitButton.disabled = false;
  }
}

function validationCheckboxChange(event) {
  if (!event.target.checked) {
    console.log("Checkbox not checked");
    inputCheckbox.classList.add("error");
    submitButton.disabled = true;
  } else {
    inputCheckbox.classList.remove("error");
    submitButton.disabled = false;
  }
}

function validationSubmit(event) {
  event.preventDefault();

  const firstNameValue = firstName.value.trim();
  const subjectValue = subject.value.trim();
  const emailValue = email.value.trim();
  const addressValue = address.value.trim();

  if (firstNameValue.length === 0) {
    firstNameError.style.display = "block";
    submitButton.disabled = true;
  } else {
    firstNameError.style.display = "none";
  }

  if (subjectValue.length < 10) {
    subjectError.style.display = "block";
    submitButton.disabled = true;
  } else {
    subjectError.style.display = "none";
  }

  if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(emailValue)) {
    emailError.style.display = "block";
    submitButton.disabled = true;
  } else {
    emailError.style.display = "none";
  }

  if (addressValue.length < 25) {
    addressError.style.display = "block";
    submitButton.disabled = true;
  } else {
    addressError.style.display = "none";
  }

  if (!inputCheckbox.checked) {
    console.log("Checkbox not checked");
    inputCheckbox.classList.add("error");
    submitButton.disabled = true;
  } else {
    inputCheckbox.classList.remove("error");
  }

  if (!submitButton.disabled) {
    successMessage.innerHTML = "Your form has been submitted successfully.";
    successMessage.style.display = "block";

    // form.submit();
  }
}
