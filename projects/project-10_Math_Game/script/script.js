let numRange = document.getElementById("numbersRange"),
  operator = document.getElementById("operator"),
  userSoluation = document.getElementById("userSoluation"),
  userGrade = document.getElementById("userGrade"),
  resultsList = document.getElementById("results"),
  mathEx = document.getElementById("mathEx"),
  num1,
  num2,
  correctSoluation = 0,
  point = 0,
  totalPoints = 0,
  counter = 0,
  grade = 0;

function createExc() {
  num1 = Math.floor(Math.random() * numRange.value + 1);
  num2 = Math.floor(Math.random() * numRange.value + 1);
  if (num1 < num2) {
    let tempNum = num1;
    num1 = num2;
    num2 = tempNum;
  }
  mathEx.innerHTML = `${num1} ${operator.value} ${num2} =`;
}

numRange.addEventListener("change", () => createExc());
operator.addEventListener("change", () => createExc());

document.getElementById("checkAnswer").addEventListener("click", () => {
  if (userSoluation.value !== "") {
    switch (operator.value) {
      case "+":
        correctSoluation = num1 + num2;
        break;
      case "-":
        correctSoluation = num1 - num2;
        break;
      case "*":
        correctSoluation = num1 * num2;
        break;
      case "/":
        correctSoluation = num1 / num2;
        break;
    }
    if (userSoluation.value == correctSoluation) {
      point = 10;
      totalPoints += point;
    } else {
      point = 0;
    }

    resultsList.innerHTML += `
        <tr>
            <td>${num1} ${operator.value} ${num2}</td>
            <td>${userSoluation.value}</td>
            <td>${correctSoluation}</td>
            <td id="point${counter}">${point}</td>
        </tr>`;
    if (document.getElementById(`point${counter}`).innerText == 0)
      document.getElementById(`point${counter}`).style.color = "#dc3545";
    userSoluation.value = "";
    createExc();
    counter++;
  } else {
    userSoluation.style.borderColor = "#dc3545";
    userSoluation.style.boxShadow = "0 0 5px #dc3545";
  }

  grade = (totalPoints / counter) * 10;
  console.log(grade);

  switch (true) {
    case grade >= 0 && grade <= 59:
      userGrade.innerText = "נכשל";
      break;
    case grade >= 60 && grade <= 64:
      userGrade.innerText = "מספיק";
      break;
    case grade >= 65 && grade <= 74:
      userGrade.innerText = "כמעט טוב";
      break;
    case grade >= 75 && grade <= 84:
      userGrade.innerText = "טוב";
      break;
    case grade >= 85 && grade <= 89:
      userGrade.innerText = "כמעט טוב מאוד";
      break;
    case grade >= 90 && grade <= 94:
      userGrade.innerText = "טוב מאוד";
      break;
    case grade >= 95 && grade <= 100:
      userGrade.innerText = "מעולה";
      break;
  }

  document.getElementById("totalPoints").innerText = totalPoints;
});

document.getElementById("resetID").addEventListener("click", () => {
  resultsList.innerHTML = "";
  createExc();
  document.getElementById("totalPoints").innerText = 0;
});

userSoluation.addEventListener("change", () => {
  userSoluation.style.borderColor = "#f5f3f3b4";
  userSoluation.style.boxShadow = "0 0 5px #f5f3f3b4";
});

createExc();
