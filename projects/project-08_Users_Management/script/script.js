const formContent = document.getElementById("formContent"),
  signupTap = document.getElementById("signupTap"),
  loginTap = document.getElementById("loginTap"),
  usersTable = document.getElementById("usersTable");

let alarmMsg = "שדה זה חובה !",
  id = 1;

signupTap.classList.add("signup-tap");
formContent.innerHTML = `
        <p>להרשמה למערכת יש למלא את הטופס</p>
        <label for="firstName">שם פרטי</label>
        <input type="text" id="firstName" placeholder="שם פרטי..." />
        <span class="msgALert" id="firstNameAlert"></span>
        <label for="lastName">שם משפחה</label>
        <input type="text" id="lastName" placeholder="שם משפחה..."/>
        <span class="msgALert" id="lastNameAlert"></span>
        <label for="userName">דוא"ל(שם משתמש)</label>
        <input
          type="email"
          id="userName"
          placeholder='דוא"ל (שם משתמש)...'
          autocomplete="on"
        />
        <span class="msgALert" id="userNameAlert"></span>
        <label for="password">סיסמה</label>
        <input type="password" id="password" placeholder="סיסמה..."/>
        <span class="msgALert" id="passwordAlert"></span>
        <button onclick="register()">הרשמה</button>
        <span id="onClickMsg"></span>
`;

document.getElementById("signupTap").addEventListener("click", () => {
  signupTap.classList.add("signup-tap");
  loginTap.classList.remove("login-tap");
  formContent.innerHTML = `
        <p>להרשמה למערכת יש למלא את הטופס</p>
        <label for="firstName">שם פרטי</label>
        <input type="text" id="firstName" placeholder="שם פרטי..." />
        <span class="msgALert" id="firstNameAlert"></span>
        <label for="lastName">שם משפחה</label>
        <input type="text" id="lastName" placeholder="שם משפחה..."/>
        <span class="msgALert" id="lastNameAlert"></span>
        <label for="userName">דוא"ל(שם משתמש)</label>
        <input
          type="email"
          id="userName"
          placeholder='דוא"ל (שם משתמש)...'
          autocomplete="on"
        />
        <span class="msgALert" id="userNameAlert"></span>
        <label for="password">סיסמה</label>
        <input type="password" id="password" placeholder="סיסמה..."/>
        <span class="msgALert" id="passwordAlert"></span>
        <button onclick="register()">הרשמה</button>
        <span id="onClickMsg"></span>
`;
  inInputKeypress();
});

document.getElementById("loginTap").addEventListener("click", () => {
  signupTap.classList.remove("signup-tap");
  loginTap.classList.add("login-tap");
  formContent.innerHTML = `
        <p>להתחברות למערכת יש להזין פרטים</p>
        <label for="loginUserName">דוא"ל(שם משתמש)</label>
        <input
          type="email"
          id="loginUserName"
          placeholder='דוא"ל (שם משתמש)...'
          autocomplete="on"
        />
        <span class="msgALert" id="userNameAlert"></span>
        <label for="loginPassword">סיסמה</label>
        <input type="password" id="loginPassword" placeholder="סיסמה..."/>
        <span class="msgALert" id="passwordAlert"></span>
        <button onclick="login()">התחבר</button>
        <span id="onClickMsg"></span>`;
  inInputKeypress2();
});

function inInputKeypress() {
  firstName.addEventListener("keypress", () => {
    if (firstName.value !== "")
      document.getElementById("firstNameAlert").innerText = "";
  });

  lastName.addEventListener("keypress", () => {
    if (lastName.value !== "")
      document.getElementById("lastNameAlert").innerText = "";
  });

  userName.addEventListener("keypress", () => {
    if (userName.value !== "")
      document.getElementById("userNameAlert").innerText = "";
  });

  password.addEventListener("keypress", () => {
    if (password.value !== "")
      document.getElementById("passwordAlert").innerText = "";
  });
}

function inInputKeypress2() {
  loginUserName.addEventListener("keypress", () => {
    if (loginUserName.value !== "")
      document.getElementById("userNameAlert").innerText = "";
  });

  loginPassword.addEventListener("keypress", () => {
    if (loginPassword.value !== "")
      document.getElementById("passwordAlert").innerText = "";
  });
}

class AddUser {
  constructor(firstName, lastName, userName, password) {
    this.id = id++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.status = "מנותק";
  }
}

class UsersManager {
  constructor() {
    this.usersList = [];
  }
  addNewUser(firstName, lastName, userName, password) {
    this.usersList.push(new AddUser(firstName, lastName, userName, password));
  }
  delUser(id) {
    this.usersList = this.usersList.filter((user) => user.id != id);
  }
  logOutUser(id) {
    this.usersList.find((user) => {
      if (user.id == id) user.status = "מנותק";
    });
  }
  logInUser(id) {
    this.usersList.find((user) => {
      if (user.id == id) user.status = "מחובר";
    });
  }
}

let usersManager = new UsersManager();

function showconfirmUserDel(id) {
  document.getElementById("promptDelUser").style.display = "block";
  usersManager.usersList.forEach((user) => {
    if (user.id == id) {
      document.getElementById("promptDelUser").innerHTML = `
    <h2>האם למחוק לצמיתות את המתשמש ${user.userName}?</h2>
    <div class="confirm-btns">
    <button onclick="deleteUser(${id})">אשר</button>
    <button onclick="hideConfirmUserDel()">בטל</button>
  </div>`;
    }
  });
}

function hideConfirmUserDel() {
  document.getElementById("promptDelUser").style.display = "none";
}

function deleteUser(id) {
  usersManager.delUser(id);
  setToStorage();
  hideConfirmUserDel();
  usersTable.innerHTML = "";
  showUsersList();
}

function logOutUser(id) {
  usersManager.logOutUser(id);
  setToStorage();
  usersTable.innerHTML = "";
  showUsersList();
}

function incorrectLoginAlert() {
  onClickMsg.innerHTML = "שם משתמש או סיסמה שגויים !!";
  onClickMsg.style.color = "#c91432";
  setTimeout(() => {
    onClickMsg.innerHTML = "";
  }, 2500);
}

function userLoginSuccessALert() {
  onClickMsg.innerHTML = " התחברת למערכת בהצלחה...";
  onClickMsg.style.color = "#138636";
  setTimeout(() => {
    onClickMsg.innerHTML = "";
  }, 2500);
}

function login() {
  let userFound, userId;
  loginUserName.value == ""
    ? (document.getElementById("userNameAlert").innerText = alarmMsg)
    : (document.getElementById("userNameAlert").innerText = "");
  loginPassword.value == ""
    ? (document.getElementById("passwordAlert").innerText = alarmMsg)
    : (document.getElementById("passwordAlert").innerText = "");
  if (loginUserName.value == "" || loginPassword.value == "") {
    requiredFieldsAlert();
  }
  usersManager.usersList.forEach((user) => {
    if (
      user.userName === loginUserName.value &&
      user.password === loginPassword.value
    ) {
      userFound = true;
      userId = user.id;
    }
  });

  if (userFound) {
    logInUser(userId);
    loginUserName.value = "";
    loginPassword.value = "";
    userLoginSuccessALert();
  } else {
    incorrectLoginAlert();
  }
}

function logInUser(id) {
  usersManager.logInUser(id);
  setToStorage();
  usersTable.innerHTML = "";
  showUsersList();
}

function userRigesterSuccessALert() {
  onClickMsg.innerHTML = " ההרשמה בוצעה בהצלחה...";
  onClickMsg.style.color = "#138636";
  setTimeout(() => {
    onClickMsg.innerHTML = "";
  }, 2500);
}

function usernameExistAlert() {
  document.getElementById("userNameAlert").innerText =
    "שם משתמש זה אינו פנוי !!";
  document.getElementById("userNameAlert").style.color = "#c91432";
  setTimeout(() => {
    document.getElementById("userNameAlert").innerText = "";
  }, 2500);
}

function register() {
  let flag = 0;

  firstName.value == ""
    ? (document.getElementById("firstNameAlert").innerText = alarmMsg)
    : (document.getElementById("firstNameAlert").innerText = "");

  lastName.value == ""
    ? (document.getElementById("lastNameAlert").innerText = alarmMsg)
    : (document.getElementById("lastNameAlert").innerText = "");

  userName.value == ""
    ? (document.getElementById("userNameAlert").innerText = alarmMsg)
    : (document.getElementById("userNameAlert").innerText = "");

  password.value == ""
    ? (document.getElementById("passwordAlert").innerText = alarmMsg)
    : (document.getElementById("passwordAlert").innerText = "");

  if (
    firstName.value == "" ||
    lastName.value == "" ||
    userName.value == "" ||
    password.value == ""
  ) {
    requiredFieldsAlert();
  } else {
    for (let user of usersManager.usersList)
      if (user.userName === userName.value) flag = 1;
    if (flag == 1) {
      usernameExistAlert();
      return;
    } else {
      usersManager.addNewUser(
        firstName.value,
        lastName.value,
        userName.value,
        password.value
      );
      userRigesterSuccessALert();
      setToStorage();
      usersTable.innerHTML = "";
      showUsersList();
      firstName.value = "";
      lastName.value = "";
      userName.value = "";
      password.value = "";
    }
  }
}

function editUser(id) {
  document.getElementById("userEditpopup").style.display = "block";
  usersManager.usersList.forEach((user) => {
    if (user.id == id) {
      document.getElementById("userEditpopup").innerHTML = `
          <label for="editFirstName">שם פרטי</label>
          <input type="text" id="editFirstName" placeholder="שם פרטי..." value="${user.firstName}" />
          <span class="msgALert" id="updateFirstNameAlert"></span>
          <label for="editLastName">שם משפחה</label>
          <input type="text" id="editLastName" placeholder="שם משפחה..." value="${user.lastName}"/>
          <span class="msgALert" id="updateLastNameAlert"></span>
          <label for="editUserName">דוא"ל(שם משתמש)</label>
          <input
            type="email"
            id="editUserName"
            placeholder='דוא"ל (שם משתמש)...'
            autocomplete="on"
            value="${user.userName}"
          />
          <span class="msgALert" id="updateUserNameAlert"></span>
          <label for="editPassword">סיסמה</label>
          <input type="password" id="editPassword" placeholder="סיסמה..." value="${user.password}"/>
          <span class="msgALert" id="updatePasswordAlert"></span>
          <div class="update-btns">
            <button onclick="updateUserDetails(${user.id})">עדכן</button>
            <button onclick="closeUserEditpopup()">בטל</button>
          </div>
          `;
    }
  });
}

function updateUserDetails(id) {
  editFirstName.value == ""
    ? (document.getElementById("updateFirstNameAlert").innerText = alarmMsg)
    : (document.getElementById("updateFirstNameAlert").innerText = "");

  editLastName.value == ""
    ? (document.getElementById("updateLastNameAlert").innerText = alarmMsg)
    : (document.getElementById("updateLastNameAlert").innerText = "");

  editUserName.value == ""
    ? (document.getElementById("updateUserNameAlert").innerText = alarmMsg)
    : (document.getElementById("updateUserNameAlert").innerText = "");

  editPassword.value == ""
    ? (document.getElementById("updatePasswordAlert").innerText = alarmMsg)
    : (document.getElementById("updatePasswordAlert").innerText = "");

  usersManager.usersList.forEach((user) => {
    if (user.id == id) {
      user.firstName = editFirstName.value;
      user.lastName = editLastName.value;
      user.userName = editUserName.value;
      user.password = editPassword.value;
    }
  });
  setToStorage();
  usersTable.innerHTML = "";
  showUsersList();
  closeUserEditpopup();
}

function setToStorage() {
  if (typeof (Storage !== "undefinded")) {
    localStorage.setItem("usersList", JSON.stringify(usersManager.usersList));
    localStorage.setItem("counter", id);
  }
}

function getFromStorage() {
  usersManager.usersList = JSON.parse(localStorage.getItem("usersList"));
  id = localStorage.getItem("counter");
}

function closeUserEditpopup() {
  document.getElementById("userEditpopup").style.display = "none";
}

function requiredFieldsAlert() {
  onClickMsg.innerHTML = "יש למלא את כל שדות החובה !!";
  onClickMsg.style.color = "#c91432";
  setTimeout(() => {
    onClickMsg.innerHTML = "";
  }, 2500);
}

function showUsersList() {
  if (localStorage.getItem("usersList", "id")) {
    getFromStorage();
    usersManager.usersList.forEach((user) => {
      usersTable.innerHTML += `<tr>
              <td>${usersManager.usersList.indexOf(user) + 1}</td>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.userName}</td>
              <td>${user.password}</td>
              <td>${user.status}</td>
              <td class="td-btn">
                <button class="btn" id="logoutUser" onclick="logOutUser(${
                  user.id
                })">
                  <span class="material-symbols-rounded"> logout </span>
                  <span>התנתקות</span>
                </button>
              </td>
              <td class="td-btn">
                <button class="btn" id="delUser" onclick="showconfirmUserDel(${
                  user.id
                })">
                  <span class="material-symbols-rounded"> delete </span>
                  <span>מחיקה</span>
                </button>
              </td>
              <td class="td-btn">
                <button class="btn" id="editUser" onclick="editUser(${
                  user.id
                })">
                  <span class="material-symbols-rounded"> edit_document </span>
                  <span>עריכה</span>
                </button>
              </td>
            </tr>`;
    });
  }
}

inInputKeypress();
showUsersList();
