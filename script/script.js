let projestNumber = 1,
  messageBox = document.getElementById("messageBox");

document.querySelectorAll(".top-image").forEach((item) => {
  item.innerHTML = `<img src="./images/project-${projestNumber}.png" alt="" />`;
  projestNumber++;
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;
    let inputs = document.querySelectorAll(
      "#contactForm input, #contactForm textarea"
    );

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
        input.style.borderColor = "#c91432";
        input.addEventListener("click", () => {
          input.style.border = "";
        });
      } else {
        input.style.border = "";
      }
    });

    if (isValid) {
      messageBox.innerText = "הטופס נשלח בהצלחה";
      messageBox.classList.remove("invalid-message");
      messageBox.classList.add("success-message");
      setTimeout(() => {
        this.submit(); // Proceed with submission
      }, 1000);
    } else {
      messageBox.innerText = "יש למלא את כל השדות";
      messageBox.classList.remove("success-message");
      messageBox.classList.add("invalid-message");
    }
  });
