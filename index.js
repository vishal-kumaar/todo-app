const input = document.getElementsByClassName("input")[0];
const addButton = document.getElementsByClassName("addButton")[0];
const container = document.getElementsByClassName("container")[0];

showTodos();

addButton.addEventListener("click", () => {
    let todos = localStorage.getItem('todos');

    let todosArray;
    if (todos == null) {
        todosArray = [];
    } else {
        todosArray = JSON.parse(todos);
    }

    todosArray.push(input.value);

    localStorage.setItem("todos", JSON.stringify(todosArray));

    input.value = "";

    showTodos();
})

function showTodos(){
    let todos = localStorage.getItem('todos');

    if (todos != null){
        let todosArray = JSON.parse(todos);
        let html = ``;
        
        for (const i in todosArray) {
            html += `<div class="item">
                    <div class="item_input" id="input-${i}">${todosArray[i]}</div>
                    <button class="editButton" id="edit-${i}" onclick="editTodo(this.id)">Edit</button>
                    <button class="doneButton" id="done-${i}" onClick="saveEditedTodo(this.id)">Done</button>
                    <button class="deleteButton" id="delete-${i}" onclick="deleteTodo(this.id)">Delete</button>
                </div>`
        }

        container.innerHTML = html;
    }
}

function editTodo(id){
    let item = document.getElementById(id.replace("edit", "input"));
    item.contentEditable = true;
    item.style.borderColor = "black";
    document.getElementById(id).style.display = "none";
    document.getElementById(id.replace("edit", "done")).style.display = "block";
}

function saveEditedTodo(id){
    let item = document.getElementById(id.replace("done", "input"));
    item.contentEditable = false;
    item.style.borderColor = "transparent";
    document.getElementById(id).style.display = "none";
    document.getElementById(id.replace("done", "edit")).style.display = "block";

    let todosObj = JSON.parse(localStorage.getItem('todos'));
    todosObj[Number(id.split("-")[1])] = item.innerText;
    localStorage.setItem('todos', JSON.stringify(todosObj))
    showTodos();
}

function deleteTodo(id){
    let index = Number(id.split("-")[1]);
    let todosObj = JSON.parse(localStorage.getItem('todos'));
    todosObj.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todosObj))
    showTodos();
}