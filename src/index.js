const init = function () {
  // Selecting the form element
  const form = document.querySelector("#form");

  // Selecting all of the input elements inside the form
  const allInputs = Array.from(form.getElementsByTagName("input"));

  // Selecting the submit button
  const button = document.querySelector("button");

  // Global variable to store the current value of the password that the user passes in
  let passwordValue;

  //
  //
  //
  //
  //
  //
  // Show input error message
  const showError = function (element, message) {
    // Selecting the from control of the element we pass in(Which is the element that has the error message we want to display)
    const formControl = element.closest(".form-control");

    // Removing the class 'success'
    formControl.classList.remove("success");

    // Adding the error class to the formControl element closest to the element we passed in(one of the inputs). I use the closes method since it will display the error in element's parent.
    formControl.classList.add("error");

    // Getting the error message element
    const errorMessageEl = formControl.querySelector(".error-message");

    //Setting the content of that error message element to the message we passed in
    errorMessageEl.textContent = message;
  };

  //
  //
  //
  //
  //
  // Show success
  const showSuccess = function (element) {
    // // Selecting the from control of the element we pass in, to then add the success class to it
    const formControl = element.closest(".form-control");

    // Removing the error class
    formControl.classList.remove("error");

    // Adding the success class
    formControl.classList.add("success");
  };

  //
  //
  //
  //
  //
  //
  // To get the current password value of the element passed in (the password input is the element passed in in the event listener)
  const getPasswordValue = function (curEl) {
    // Returning that value so I can store it in the global variable passwordValue for later comparison
    return curEl.value;
  };

  //
  //
  //
  //
  //
  //
  //
  // Event listeners
  // Listening for the submit event on the form
  form.addEventListener("submit", function (e) {
    // I prevent the default so it does not reload the page
    e.preventDefault();

    // Looping through the inputs array
    allInputs.forEach((input) => {
      // For each individual input I get the input's id:
      const currentInputId = input.getAttribute("id");
      // Then with that id, i select the input element that has that id:
      const currentEl = document.querySelector(`#${currentInputId}`);
      // Then I get the parent of that element just selected, so i can get the error message that will be displayed for each different input when the showError function is called
      const currentElParent = currentEl.closest(".form-control");
      // Getting the error message
      const currentElErrorMessage =
        currentElParent.querySelector(".error-message").textContent;

      // If the current input is empty, then display the error, and the error message, else, display success
      currentEl.value === ""
        ? showError(currentEl, currentElErrorMessage)
        : showSuccess(currentEl);

      // If the current input is the one that has the id of 'password'
      if (currentEl.id === "password" && currentEl.value !== "") {
        // Then get the value of that password and store it in the global variable, for later comparison
        passwordValue = getPasswordValue(currentEl);
      }

      // If the current element has the id of "password2" (the confirm password element)
      if (currentEl.id === "password2" && currentEl.value !== "") {
        // Then compare it value with the value of the passwordValue global variable (the one just set above)

        // If they are different, then display the error message in the confirm password element, else, display success in that element
        currentEl.value !== passwordValue
          ? showError(currentEl, "Password does not match")
          : showSuccess(currentEl);
      }
    });
  });
};

init();
