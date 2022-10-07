const addItem = document.querySelector(".add-item");
const itemList = document.querySelector(".item-list");
const listOfItems = JSON.parse(localStorage.getItem("items")) || [];

const checkAll = document.querySelector(".check-all");
const clearAll = document.querySelector(".clear-all");
const deleteAll = document.querySelector(".delete-all");
// console.log(checkAll, clearAll, deleteAll);

function addItems(e) {
  e.preventDefault();
  const text = addItem.querySelector("[type=text]").value;
  const item = {
    text,
    done: false,
  };
  listOfItems.push(item);
  displayItems(listOfItems, itemList);
  const savedItems = JSON.stringify(listOfItems);
  localStorage.setItem("items", savedItems);
  // console.log(savedItems);
  this.reset();
}

function displayItems(itemsList = [], element) {
  element.innerHTML = itemsList
    .map((item, index) => {
      return `
    <li>
    <input type = "checkbox" data-index = "${index}" id = "item${index}" ${
        item.done ? "checked" : ""
      }/>
    <label for = "item${index}">${item.text}</label>
    </li>
    `;
    })
    .join("");
}

function toggle(e) {
  if (!(e.target.localName === "input")) {
    return;
  }
  const index = e.target.dataset.index;
  listOfItems[index].done = !listOfItems[index].done;
  const savedItems = JSON.stringify(listOfItems);
  localStorage.setItem("items", savedItems);
  // console.dir(listOfItems);
}

function enableAll() {
  if (!listOfItems.length) return;
  listOfItems.forEach((item) => (item.done = true));
  const changedItems = JSON.stringify(listOfItems);
  localStorage.setItem("items", changedItems);
  displayItems(listOfItems, itemList);
}
function disableAll() {
  if (!listOfItems.length) return;
  listOfItems.forEach((item) => (item.done = false));
  const changedItems = JSON.stringify(listOfItems);
  localStorage.setItem("items", changedItems);
  displayItems(listOfItems, itemList);
}

function clearLocalStorage() {
  localStorage.clear();
  listOfItems.length = 0;
  itemList.innerHTML = `
  <li>Wait a new item...</li>
  `;
}

addItem.addEventListener("submit", addItems);
itemList.addEventListener("click", toggle);
checkAll.addEventListener("click", enableAll);
clearAll.addEventListener("click", disableAll);
deleteAll.addEventListener("click", clearLocalStorage);

if (listOfItems.length) {
  displayItems(listOfItems, itemList);
}
