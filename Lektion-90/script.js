const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];

const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await res.json()
    todos = data;
    // console.log(data)

    listTodos();
}
fetchTodos();

const listTodos = () => {
    todos.forEach(todo => {
        output.insertAdjacentHTML('beforeend', `
        <div class="todo">
            <p class="todo-title">${todo.title}</p>
            <button class="btn btn-danger btn-sm">X</button>
        </div>
        `)
        //Lektion 9a, 1.03.00, över 1.13.55
    })
}