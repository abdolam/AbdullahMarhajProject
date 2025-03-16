const onHover = new Audio("./sound/mixkit-game-ball-tap-2073.wav");
let gameLevel = document.getElementById("game-level"),
  gameBoard = document.querySelector(".game-board"),
  userAttemps = document.getElementById("userAttemps"),
  topScore = document.getElementById("topScore"),
  winnerPopUp = document.getElementById("winner"),
  cardsQty = 0,
  newTop = 0,
  easyTop = 0,
  mediumTop = 0,
  hardTop = 0;

if (localStorage.getItem("easyTop")) easyTop = localStorage.getItem("easyTop");
if (localStorage.getItem("mediumTop"))
  mediumTop = localStorage.getItem("mediumTop");
if (localStorage.getItem("hardTop")) hardTop = localStorage.getItem("hardTop");

function startNewGame() {
  let arr = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 26, 29, 30,
    ],
    cardArr = [];
  arr = arr.sort(() => Math.random() - 0.5);
  arr = arr.sort(() => Math.random() - 0.5);

  winnerPopUp.style.display = "none";
  let matchCounter = 1,
    attemps = 0;
  userAttemps.innerText = `ניסיונות: ${attemps}`;
  gameBoard.innerHTML = "";

  switch (gameLevel.value) {
    case "easy":
      gameBoard.style.gridTemplateColumns = "repeat(4, 1fr)";
      gameBoard.style.gridTemplateRows = "repeat(3, 1fr)";
      cardsQty = 12;
      newTop = easyTop;
      break;
    case "medium":
      gameBoard.style.gridTemplateColumns = "repeat(5, 1fr)";
      gameBoard.style.gridTemplateRows = "repeat(4, 1fr)";
      cardsQty = 20;
      newTop = mediumTop;
      break;
    case "hard":
      gameBoard.style.gridTemplateColumns = "repeat(6, 1fr)";
      gameBoard.style.gridTemplateRows = "repeat(5, 1fr)";
      cardsQty = 30;
      newTop = hardTop;
      break;
  }

  for (let i = 0; i < cardsQty / 2; i++) {
    cardArr.push(arr[i]);
    cardArr.push(arr[i]);
  }
  cardArr = cardArr.sort(() => Math.random() - 0.5);
  cardArr = cardArr.sort(() => Math.random() - 0.5);

  topScore.innerHTML = `שיא: ${newTop}`;

  for (let i = 0; i < cardsQty; i++) {
    let newCard = document.createElement("div"),
      front = document.createElement("div"),
      back = document.createElement("div");
    newCard.classList.add("card");
    front.classList.add("front");
    back.classList.add("back");
    gameBoard.append(newCard);
    newCard.append(front, back);
    front.innerHTML = `<img src="./images/items/item-${cardArr[i]}.png"></img>`;

    newCard.onclick = function () {
      attemps++;
      userAttemps.innerText = `ניסיונות: ${Math.floor(attemps / 2)}`;

      onHover.play();
      this.style.transform = "rotateY(180deg)";
      this.classList.add("clicked");
      front.classList.add("open");
      setTimeout(() => {
        cardOpen = document.querySelectorAll(".open");
        if (cardOpen.length > 1) {
          setTimeout(() => {
            if (cardOpen[0].innerHTML == cardOpen[1].innerHTML) {
              cardOpen[0].classList.remove("open");
              cardOpen[1].classList.remove("open");
              matchCounter++;
              document.querySelectorAll(".clicked").forEach((item) => {
                item.onclick = function () {
                  return false;
                };
                item.classList.remove("clicked");
              });
            } else {
              cardOpen[0].classList.remove("open");
              cardOpen[1].classList.remove("open");
              document.querySelectorAll(".clicked").forEach((item) => {
                item.style.transform = "rotateY(0deg)";
                item.classList.remove("clicked");
              });
            }
          }, 500);

          if (cardsQty == matchCounter * 2) {
            if (newTop == 0) {
              newTop = attemps / 2;
              topScore.innerHTML = `שיא: ${newTop}`;
            } else if (attemps / 2 <= newTop) {
              newTop = attemps / 2;
              topScore.innerHTML = `שיא: ${newTop}`;
            } else {
              topScore.innerHTML = `שיא: ${newTop}`;
            }

            switch (cardsQty) {
              case 12:
                easyTop = newTop;
                break;
              case 20:
                mediumTop = newTop;
                break;
              case 30:
                hardTop = newTop;
                break;
            }
            if (typeof Storage !== "undefined") {
              localStorage.setItem("easyTop", easyTop);
              localStorage.setItem("mediumTop", mediumTop);
              localStorage.setItem("hardTop", hardTop);
            }
            winnerPopUp.style.display = "block";
            winnerPopUp.innerText = "🏆";
            winnerPopUp.classList.add("you-win");
            winnerPopUp.animate(
              [{ transform: "scale(0.75)" }, { transform: "scale(1.25)" }],
              {
                duration: 1000,
                iterations: Infinity,
              }
            );
          }
        }
      }, 500);
    };
  }
}
gameLevel.addEventListener("change", startNewGame);
document.getElementById("newGame").addEventListener("click", startNewGame);
startNewGame();
