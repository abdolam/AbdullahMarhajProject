const hideBar = document.querySelector(".sidebar-hide-btn"),
  userInterface = document.getElementById("userInterface"),
  newPage = document.getElementById("newPage"),
  add = document.getElementById("add-Element"),
  bgColor = document.getElementById("bg-color"),
  boxWidth = document.getElementById("box-width"),
  boxHeight = document.getElementById("box-height"),
  boxContent = document.getElementById("box-content"),
  fontColor = document.getElementById("font-color"),
  fontSize = document.getElementById("font-size"),
  borderStyle = document.getElementById("border-style"),
  borderColor = document.getElementById("border-color"),
  borderWidth = document.getElementById("border-width"),
  boxMargin = document.getElementById("box-margin"),
  boxPadding = document.getElementById("box-padding"),
  borderRadius = document.getElementById("border-radius"),
  elemType = document.getElementById("element-type"),
  xAxis = document.getElementById("x-axis"),
  yAxis = document.getElementById("y-axis"),
  shadowColor = document.getElementById("shadow-color"),
  elementID = document.getElementById("element-ID"),
  idAlert = document.getElementById("checkIdName");
let idList = [];

elementID.addEventListener("focus", () => {
  idAlert.innerHTML = `* יש לבחור מאפיין ייחודי `;
  idAlert.style.color = "#ffffff";
});

elementID.addEventListener("blur", () => {
  if (idList.indexOf(elementID.value) >= 0) {
    idAlert.innerText = `מאפיין ID זה הוקצה לאלמנט אחר..`;
    idAlert.style.color = "#eb6f71";
  } else idAlert.innerText = "מזהה ID זה פנוי...";
});

add.addEventListener("click", (e) => {
  if (elementID.value !== "") idList.push(elementID.value);

  const newElement = newPage.appendChild(
    document.createElement(`${elemType.value}`)
  );

  newElement.setAttribute("ID", elementID.value);

  newElement.title = `פרטי אלמנט:
  סוג: ${elemType.value} 
  ID מזהה : ${elementID.value}
  רוחב: ${boxWidth.value}px גובה: ${boxHeight.value}px
  ריווח חיצוני: ${boxMargin.value}px
  ריווח פנימי: ${boxPadding.value}px
  צבע רקע: ${bgColor.value}
  צבע גופן: ${fontColor.value}
  גודל גופן: ${fontSize.value}px
  מסגרת:
  רוחב: ${borderWidth.value}px, סגנון: ${borderStyle.value}, צבע: ${borderColor.value}
  עיגול פינות: ${borderRadius.value}px`;

  newElement.innerText = boxContent.value;
  newElement.style.width = `${boxWidth.value}px`;
  newElement.style.height = `${boxHeight.value}px`;
  newElement.style.border = `${borderWidth.value}px ${borderStyle.value} ${borderColor.value}`;
  newElement.style.borderRadius = `${borderRadius.value}px`;
  newElement.style.backgroundColor = bgColor.value;
  newElement.style.color = fontColor.value;
  newElement.style.fontSize = `${fontSize.value}px`;
  newElement.style.padding = `${boxPadding.value}px`;
  newElement.style.margin = `${boxMargin.value}px`;
  newElement.style.position = "relative";
  elemType.value == "div"
    ? (newElement.style.boxShadow = `${xAxis.value}px ${yAxis.value}px ${shadowColor.value}`)
    : (newElement.style.textShadow = `${xAxis.value}px ${yAxis.value}px ${shadowColor.value}`);

  if (document.getElementById("auto-save").checked == true) {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("userPage", newPage.innerHTML);
      localStorage.setItem("idlist", JSON.stringify(idList));
    }
  }

  elementID.value = "";
  idAlert.innerHTML = "";
});

//hide/show the user interface / commands bar

hideBar.addEventListener("click", (e) => {
  userInterface.classList.toggle("hide");

  if (userInterface.className == "hide")
    hideBar.innerHTML =
      '<span class="material-symbols-rounded"> chevron_left </span>';
  else
    hideBar.innerHTML =
      '<span class="material-symbols-rounded"> chevron_right </span>';
});

document.getElementById("clear-Page").addEventListener("click", () => {
  newPage.innerHTML = "";
});

document.getElementById("save-Page").addEventListener("click", () => {
  if (typeof Storage !== "undefined") {
    localStorage.setItem("userPage", newPage.innerHTML);
    localStorage.setItem("idlist", JSON.stringify(idList));
  }
});

document.getElementById("load-Page").addEventListener("click", () => {
  newPage.innerHTML = localStorage.getItem("userPage");
  idList = JSON.parse(localStorage.getItem("idlist"));
});
