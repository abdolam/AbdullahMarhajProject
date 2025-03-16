let id = 1,
  title = document.getElementById("itemTitle"),
  qty = document.getElementById("itemQty"),
  addBtn = document.getElementById("addBtn"),
  delPopupWin = document.getElementById("delPopupWin");

class Item {
  constructor(title, qty) {
    this.id = id++;
    this.title = title;
    this.qty = qty;
    this.completed = false;
  }
}

class ItemsManager {
  constructor() {
    this.itemsList = [];
  }
  addNewItem(title, qty) {
    this.itemsList.push(new Item(title, qty));
  }
  delItem(id) {
    this.itemsList = this.itemsList.filter((item) => item.id !== id);
  }

  getItemTitle(id) {
    let itemIndex = this.itemsList.findIndex((item) => item.id == id);
    return this.itemsList[itemIndex].title;
  }

  getItemQty(id) {
    let itemIndex = this.itemsList.findIndex((item) => item.id == id);
    return this.itemsList[itemIndex].qty;
  }

  changeStatus(id) {
    this.itemsList.find((item) => {
      if (item.id == id)
        if (item.completed == false) {
          item.completed = true;
        } else {
          item.completed = false;
        }
    });
  }
}

let itemsManager = new ItemsManager();

function addItem() {
  if (title.value == "") {
    title.style.border = "2px Solid red";
  } else if (qty.value == "") {
    qty.style.border = "2px Solid red";
  } else {
    itemsManager.addNewItem(title.value, qty.value);
    setToStorage();
    getFromStorage();
    document.getElementById("uncompletedItems").innerHTML = "";
    document.getElementById("completedItems").innerHTML = "";
    showItemsList();
    title.value = "";
    qty.value = "";
  }
}

title.addEventListener("keypress", () => {
  title.style.border = "1px solid #692222a4";
});

qty.addEventListener("keypress", () => {
  qty.style.border = "1px solid #692222a4";
});

function showItemsList() {
  if (localStorage.getItem("itemsList") && localStorage.getItem("itemsId")) {
    getFromStorage();
    itemsManager.itemsList.forEach((item) => {
      if (item.completed == false) {
        document.getElementById("uncompletedItems").innerHTML += `
        <div class="item-row">
          <span class="itemName">${item.title}</span
          ><span class="itemQty">כמות: ${item.qty}</span>
        </div>
        <button
          class="items-list-btns material-symbols-rounded"
          title="סמן כהושלם"
          onclick="MoveToCompletedList(${item.id})"
        >
          check</button
        ><button
          class="items-list-btns material-symbols-rounded"
          title="ערוך פריט"
          onclick="editItem(${item.id})"
        >
          edit</button
        ><button
          class="items-list-btns material-symbols-rounded"
          title="מחק פריט"
          onclick="deleteItem(${item.id})"
        >
          delete
        </button>`;
      } else {
        document.getElementById("completedItems").innerHTML += `
        <div class="item-row">
          <span class="itemName">${item.title}</span
          ><span class="itemQty">כמות: ${item.qty}</span>
        </div>
        <button
          id=""
          class="items-list-btns material-symbols-rounded"
          title="שחזר פריט" onclick="restoreFromCompletedList(${item.id})"
        >
          restore_from_trash</button
        ><button
          id=""
          class="items-list-btns material-symbols-rounded"
          title="מחק פריט"
          onclick="deleteItem(${item.id})"
        >
          delete
        </button>`;
      }
    });
  }
}

function MoveToCompletedList(id) {
  itemsManager.changeStatus(id);
  setToStorage();
  document.getElementById("uncompletedItems").innerHTML = "";
  document.getElementById("completedItems").innerHTML = "";
  getFromStorage();
  showItemsList();
}

function restoreFromCompletedList(id) {
  itemsManager.changeStatus(id);
  setToStorage();
  document.getElementById("uncompletedItems").innerHTML = "";
  document.getElementById("completedItems").innerHTML = "";
  getFromStorage();
  showItemsList();
}

function deleteItem(id) {
  delPopupWin.style.display = "block";
  document.getElementById(
    "itemToDel"
  ).innerText = `למחוק את הפריט ${itemsManager.getItemTitle(id)} ?`;
  document
    .getElementById("confirmDel")
    .setAttribute("onclick", `confirmDel(${id})`);
  document.getElementById("cancelDel").setAttribute("onclick", `cancelDel()`);
}

function confirmDel(id) {
  itemsManager.delItem(id);
  setToStorage();
  document.getElementById("uncompletedItems").innerHTML = "";
  document.getElementById("completedItems").innerHTML = "";
  getFromStorage();
  showItemsList();
}

function cancelDel() {
  delPopupWin.style.display = "none";
}

function editItem(id) {
  title.style.border = "2px solid  #692222";
  qty.style.border = "2px solid  #692222";
  addBtn.style.border = "2px solid  #692222";
  addBtn.innerHTML = "done_outline";
  addBtn.setAttribute("onclick", `updateItem(${id})`);
  addBtn.setAttribute("title", "עדכן פריט");
  title.value = itemsManager.getItemTitle(id);
  qty.value = itemsManager.getItemQty(id);
}

function updateItem(id) {
  itemsManager.itemsList.forEach((item) => {
    if (item.id == id) {
      item.title = title.value;
      item.qty = qty.value;
    }
  });

  setToStorage();
  document.getElementById("uncompletedItems").innerHTML = "";
  document.getElementById("completedItems").innerHTML = "";
  getFromStorage();
  showItemsList();
  title.value = "";
  qty.value = "";
  title.style.border = "1px solid #692222a4";
  qty.style.border = "1px solid #692222a4";
  addBtn.style.border = "1px solid #692222a4";
  addBtn.innerHTML = "add";
}

function setToStorage() {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("itemsList", JSON.stringify(itemsManager.itemsList));
    localStorage.setItem("itemsId", id);
  }
}

function getFromStorage() {
  itemsManager.itemsList = JSON.parse(localStorage.getItem("itemsList"));
  id = localStorage.getItem("itemsId");
}

showItemsList();
