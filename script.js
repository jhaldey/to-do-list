// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOptions = document.querySelector('.filter-todo');
const clearButton = document.querySelector('.todo-clear');

// EventListeners 

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOptions.addEventListener('input', filterTodo);
clearButton.addEventListener('click', clearAll);

// Functions

function addTodo(event) {
    event.preventDefault();

    // todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // todo li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    // add todo to localStorage;

    saveLocalTodos(todoInput.value);

    // completedButton

    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

     // trashButton

     const trashButton = document.createElement('button');
     trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
     trashButton.classList.add('trash-btn');
     todoDiv.appendChild(trashButton);

     // appendToTodoList

     todoList.appendChild(todoDiv);

     // clear the field 
     todoInput.value = '';

     // delete item

}

function deleteCheck(event) {

  const item = event.target;
  const todoItem = item.parentElement;

  // delete todo

  if (item.classList[0] === 'trash-btn') {

    // animation
    todoItem.classList.add('fall');

    removeLocalTodos(todoItem);

    todoItem.addEventListener('transitionend', function(){
      todoItem.remove();
    });

  }

  // checkMark

  if (item.classList[0] === 'complete-btn') {
    todoItem.classList.toggle('completed');
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;

  todos.forEach(function(todo) {

    switch (event.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
        break;
      
      case "uncompleted":
        if (!(todo.classList.contains('completed'))) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check if I have a todo already

  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));


}

function getTodos() {

  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo) {
    // todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // todo li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // completedButton

    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // trashButton

    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // appendToTodoList

    todoList.appendChild(todoDiv);

  });
}

function removeLocalTodos(todo) {

  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todosIndex = todo.children[0].innerText;

  todos.splice(todos.indexOf(todosIndex), 1);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function clearAll(event) {
  event.preventDefault();

  localStorage.clear();

  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    todo.classList.add('fall');
  });

  document.addEventListener('transitionend', function() {
    location.reload();
  });

}