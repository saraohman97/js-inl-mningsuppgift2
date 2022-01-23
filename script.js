const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];

//INVALID VARNING
const validateInput = (input) => {
  if(input.value.trim() === '') {
    setError(input, 'Must add an todo')
    return false;
  }
  else {
    setSuccess(input)
    return true;
  }
}
const setError = (input, textMessage) => {
  const parent = input.parentElement;
  parent.classList.add('is-invalid');
  parent.classList.remove('is-valid');
  parent.querySelector('.invalid-input').innerText = textMessage;
}

const setSuccess = input => {
  const parent = input.parentElement;
  parent.classList.remove('is-invalid');
  parent.classList.add('is-valid');
}
// const validate = input => {
//   switch(input.type){
//     case 'text': return validateInput(input)
//     default:
//       break;
//   }
// }

//ADD AND REMOVE TODOS
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
    console.log(data)
    todos.unshift(data);
    listTodos()
    // output.prepend(createTodoElement(data))
  })
}


form.addEventListener('submit', e => {
  e.preventDefault();
  if(input.value == '') {
    //Msg varning: Invalid
    validateInput(input)
  }
  else {
    createNewTodo(input.value);
    input.value = '';
    input.focus()
  }
})