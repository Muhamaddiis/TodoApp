const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"))

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();

})

function addTodo(todo) {
    let todoText = input.value;
    if (todo) {
        todoText = todo.text;
    }
    
    if (todoText) {
        const todoEl = document.createElement("li");
        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }
        todoEl.innerText = todoText
    
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLs();

        })
        const btn = document.createElement("button")
        btn.className = "delete"
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLs();
        })        
        todosUl.appendChild(todoEl)
        input.value = ""
        updateLs();
    }
}

function updateLs() {
    const todosEL = document.querySelectorAll("li");
    const todos = [];
    todosEL.forEach((todoEL) => {
        todos.push({
            text: todoEL.innerText,
            completed: todoEL.classList.contains('completed')
        });
    });
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos) )
}