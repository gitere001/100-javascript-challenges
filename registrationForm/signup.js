const passwordToggleInput = document.querySelector(
  "fieldset:nth-of-type(3) > span"
);

const main = document.querySelector("main");
const toLogInPage = document.querySelector('header p a');

const submitBtn = document.querySelector("#submit");
const submitModal = document.querySelector("#submit-modal");
const showHideToggle = document.querySelector("#toggle-password");

const emailInput = document.querySelector('input[type="email"]');
const emailError = document.querySelector("#error-email");

const usernameInput = document.querySelector('input[type="text"]');
const usernameError = document.querySelector("#error-username");

const passwordInput = document.querySelector('input[type="password"]');
const passwordError = document.querySelector("#error-password");

toLogInPage.addEventListener("click", () => {
  window.location.href = "login.html";
})

function togglePasswordVisibility() {
  if (showHideToggle.className === "show") {
    showHideToggle.textContent = "Hide";
    showHideToggle.className = "hide";
    passwordInput.type = "text";
  } else if (showHideToggle.className === "hide") {
    passwordInput.type = "password";
    showHideToggle.textContent = "Show";
    showHideToggle.className = "show";
  }
}

function showSubmitModal() {
  submitModal.classList.add("popup-display");
  main.style.display = "none";
}
function removeSubmitModal() {
  submitModal.classList.remove("popup-display");
  window.location.replace("login.html");
}

function submitForm(e) {
  e.preventDefault();

  let isValid = true;

  if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
    validateInput(emailInput, emailError, validateEmail);
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  if (!usernameInput.value.trim() || !validateUsername(usernameInput.value.trim())) {
    validateInput(usernameInput, usernameError, validateUsername);
    usernameError.style.display = "block";
    isValid = false;
  } else {
    usernameError.style.display = "none";
  }

  if (!passwordInput.value.trim() || !validatePassword(passwordInput.value.trim())) {
    validateInput(passwordInput, passwordError, validatePassword);
    passwordError.style.display = "block";
    isValid = false;
  } else {
    passwordError.style.display = "none";
  }

  if (isValid) {
    showSubmitModal();
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9!@#$%^&*()_+]{3,16}$/;

  return usernameRegex.test(username);
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function validateInput(inputElement, errorElement, validationFuction) {
  const inputValue = inputElement.value.trim();
  if (validationFuction(inputValue)) {
    inputElement.className = "valid";
    errorElement.style.display = "none";

    inputElement.style.border = "2px solid green";
  } else {
    inputElement.className = "invalid";

    inputElement.style.border = "2px solid red";
  }
}

emailInput.addEventListener("focus", () => {
  validateInput(emailInput, emailError, validateEmail);
});
emailInput.addEventListener("input", () => {
  validateInput(emailInput, emailError, validateEmail);
});
usernameInput.addEventListener("focus", () => {
  validateInput(usernameInput, usernameError, validateUsername);
});
usernameInput.addEventListener("input", () => {
  validateInput(usernameInput, usernameError, validateUsername);
});
passwordInput.addEventListener("focus", () => {
  validateInput(passwordInput, passwordError, validatePassword);
});
passwordInput.addEventListener("input", () => {
  validateInput(passwordInput, passwordError, validatePassword);
});

passwordToggleInput.addEventListener("click", togglePasswordVisibility);
document
  .querySelector(".popup button")
  .addEventListener("click", removeSubmitModal);
submitBtn.addEventListener("click", submitForm);
