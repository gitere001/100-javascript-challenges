document.addEventListener("DOMContentLoaded", () => {
  const togglePasswordIcon = document.getElementById("toggle-password");
  const loginPasswordInput = togglePasswordIcon.previousElementSibling;
  const loginUsernameError = document.querySelector(".username-error");
  const loginPasswordError = document.querySelector(".password-error");
  const loginUsernameInput = document.getElementById("login-username");
  const submitLoginFormBtn = document.querySelector("#submit-login");
  const feedBackMessage = document.querySelector("#message");
  const toSignUpPage = document.querySelector(".signup-link p a");

  toSignUpPage.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  function togglePasswordVisibility() {
    if (togglePasswordIcon.classList.contains("fa-eye-slash")) {
      togglePasswordIcon.classList.remove("fa-eye-slash");
      togglePasswordIcon.classList.add("fa-eye");
      loginPasswordInput.type = "text";
    } else {
      togglePasswordIcon.classList.remove("fa-eye");
      togglePasswordIcon.classList.add("fa-eye-slash");
      loginPasswordInput.type = "password";
    }
  }

  const response = JSON.stringify({
    success: true,

  });

  function fetchLoginResponse() {
    console.log(response);
    const data = JSON.parse(response);
    return data;
  }
  function displayMessage(data) {
    if (data.success) {
      feedBackMessage.classList.add("success");
      feedBackMessage.textContent = "Success!";
      setTimeout(() => {
        feedBackMessage.classList.remove("success");
        feedBackMessage.textContent = "";
        window.location.href = "home.html";
      }, 2000);
    } else {
      if (data.reason === "password") {
        feedBackMessage.classList.add("error");
        feedBackMessage.textContent = "Wrong Password";
        loginPasswordInput.style.border = "2px solid red";
      } else if (data.reason === "username") {
        feedBackMessage.classList.add("error");
        feedBackMessage.textContent = "Wrong Username";
        loginUsernameInput.style.border = "2px solid red";
      } else {
        feedBackMessage.classList.add("error");
        feedBackMessage.textContent = "Something went wrong";
      }
      setTimeout(() => {
        feedBackMessage.classList.remove("error");
        feedBackMessage.textContent = "";
      }, 2000);
    }
  }
  function submitLoginForm(event) {
    event.preventDefault();

    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;

    if (!username) {
      validateInput(loginUsernameInput, loginUsernameError, validateUsername);
      loginUsernameError.style.display = "block";
    }
    if (!password) {
      validateInput(loginPasswordInput, loginPasswordError, validatePassword);
      loginPasswordError.style.display = "block";
    }
    if (username && !validateUsername(username)) {
      validateInput(loginUsernameInput, loginUsernameError, validateUsername);
      loginUsernameError.style.display = "block";
    }
    if (password && !validatePassword(password)) {
      validateInput(loginPasswordInput, loginPasswordError, validatePassword);
      loginPasswordError.style.display = "block";
    }

    if (validateUsername(username) && validatePassword(password)) {
      console.log("username and password are valid");
      let data;
      try {
        data = fetchLoginResponse();
      } catch (error) {
        console.log(error);
        data = {
          success: false,
          reason: "error",
        };
      }
      displayMessage(data);
    }
  }

  submitLoginFormBtn.addEventListener("click", submitLoginForm);

  togglePasswordIcon.addEventListener("click", togglePasswordVisibility);
  loginUsernameInput.addEventListener("focus", () => {
    validateInput(loginUsernameInput, loginUsernameError, validateUsername);
  });
  loginUsernameInput.addEventListener("input", () => {
    validateInput(loginUsernameInput, loginUsernameError, validateUsername);
  });
  loginPasswordInput.addEventListener("focus", () => {
    validateInput(loginPasswordInput, loginPasswordError, validatePassword);
  });
  loginPasswordInput.addEventListener("input", () => {
    validateInput(loginPasswordInput, loginPasswordError, validatePassword);
  });
});
