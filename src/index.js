import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"

const appSettings = {
    databaseURL: "https://todo-list-8f14f-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputBar();

})

onValue(shoppingListInDB, function (snapshot) {
    let itemsArray = Object.entries(snapshot.val())

    clearShoppingList()

    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendElementToShoppingListEl(currentItem)
    }
})






function clearInputBar() {
    inputFieldEl.value = ""
}
function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}
function appendElementToShoppingListEl(newElement) {
    let itemID = newElement[0]
    let itemValue = newElement[1]

    let listItem = document.createElement("li")

    listItem.textContent = itemValue

    listItem.addEventListener("click", function () {
        let locOfItemInDb = ref(database, `shoppingList/${itemID}`)
        remove(locOfItemInDb);
    })

    shoppingListEl.append(listItem)
}



