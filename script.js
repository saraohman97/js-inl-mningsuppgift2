
const output = document.querySelector('#todos');
const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');

let todos = [];

const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await res.json()
  todos = data;

  listTodos();
}

fetchTodos();


const listTodos = () => {
  output.innerHTML = ''
  todos.forEach(todo => {
    output.appendChild(createTodoElement(todo))
  })
}

const createTodoElement = todo => {

  let card = document.createElement('div');
  card.classList.add('todo');

  let title = document.createElement('p');
  title.classList.add('todo-title');
  title.innerText = todo.title

  let button = document.createElement('button');
  button.classList.add('btn', 'btn-danger', 'btn-sm');
  button.innerText = 'X';

  
  card.appendChild(title);
  card.appendChild(button);
  
  button.addEventListener('click', () => removeTodo(todo.id, card))
  return card;
}

function removeTodo(id, todo) {
  todos = todos.filter(todo => todo.id !== id)
  listTodos()
  
  console.log(todos)
}


const createNewTodo = title => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    todos.unshift(data);
    listTodos()
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if(input.value !== '') {
    input.classList.remove('is-invalid');
    createNewTodo(input.value);
    input.value = '';
    input.focus()
  }
  else {
    input.classList.add('is-invalid');
  }

})

output.addEventListener('click', e => {
  if(e.target.type === 'button') {
    todos = todos.filter(todo => todo.id !== e.target.parentNode.id);
    listTodos();
  }
})