import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"

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

    // Challenge: Refactor the line below into its own function.
    inputFieldEl.value = ""

    // Challenge: Refactor the line below into its own function.
    shoppingListEl.innerHTML += `<li>${inputValue}</li>`
})