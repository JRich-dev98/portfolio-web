//selectors

const todoInput  = document.querySelector('.todo-input');
const todoButton  = document.querySelector('.todo-button');
const todoList  = document.querySelector('.todo-list');

//event listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteDone);

//functions

function addTodo(e) {
    //prevent submit
    e.preventDefault();


    if(todoInput.value === "") return;

    //create div
    const todoDiv = document.createElement("div");
    //add class to div
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //add to storage
    saveTodos(todoInput.value);
    //done button
    const doneButton = document.createElement("button");
    doneButton.classList.add("done");
    doneButton.innerText = 'DONE';
    todoDiv.appendChild(doneButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerText = 'DELETE';
    todoDiv.appendChild(trashButton);

    //add div to list
    todoList.appendChild(todoDiv);
    todoInput.value = '';
}

function deleteDone(e) {
    const item = e.target;

    //delete
    if(item.classList[0] === 'trash') {
        //const todo = item.parentElement;
        //todo.remove();
        DeleteStorageTodo(item.parentElement);
        item.parentElement.remove();
    }

    if(item.classList[0] === 'done') {
        item.parentElement.classList.toggle("completed");
    }
}

function saveTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        //add class to div
        todoDiv.classList.add("todo");
        //create li
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        //done button
        const doneButton = document.createElement("button");
        doneButton.classList.add("done");
        doneButton.innerText = 'DONE';
        todoDiv.appendChild(doneButton);
        //trash button
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerText = 'DELETE';
        todoDiv.appendChild(trashButton);
        //add div to list
        todoList.appendChild(todoDiv);
    });
}

function DeleteStorageTodo(todo) {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}