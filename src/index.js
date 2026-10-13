console.log("Buenos días, escrito en consola");

import data from "./data.json";
import modulo from "./modules/modulo.js";
import { Hello } from "./modules/modulo.js";

console.log(modulo());
console.log(data.users);
console.log(Hello);
const addUser = document.querySelector("#add-user");
const userInput = document.querySelector("#user-input");
const usersList = document.querySelector("#users");


function mostrarUsers() {
    usersList.replaceChildren();

    data.users.filter((user) => user.age >= 20).forEach((user) => {
        console.log(user.name);
        usersList.insertAdjacentElement("beforeend", <li>${user.name}</li>);
    });
}

mostrarUsers();

addUser.addEventListener("click", (e) => {
    console.log("userInput", userInput.value);
    data.users.push({
    "name": userInput.value,
    "age": 25
});
    mostrarUsers();
});