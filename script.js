// Selectors
const form = document.querySelector('.form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoTemplate = document.querySelector('.template').content;

// buttons
const addButton = document.querySelector('.todo-button');
const clearButton = document.querySelector('.todo-clear');
const filterTodos = document.querySelector('.filter-todo');

// localStorage
let todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
const data = JSON.parse(localStorage.getItem('todos'));

// Functions
// creates a DOM
function createTodo(text) {

  text  = todoInput.value || text; 

  const newTodo = todoTemplate.cloneNode(true);
  newTodo.querySelector('.todo-item').textContent = text;

  return newTodo;
}

// appends it
function appendTodo(placeToAdd, elementToAdd) {
  placeToAdd.appendChild(createTodo(elementToAdd));
}

// function for the add button
function addTodo(event) {
  event.preventDefault();

  // const inputValue = todoInput.value;
  appendTodo(todoList, createTodo);

  saveLocalTodos(todoInput.value);

  form.reset();
}

// delete and check todos
function deleteCheck(event) {

  const item = event.target;
  const todoItem = item.parentElement;

  // delete todo
  if (item.classList.contains('trash-btn')) {
    // animation
    todoItem.classList.add('fall');
    // delete 
    removeLocaltodo(todoItem);
    todoItem.addEventListener('transitionend', function() {
      todoItem.remove();
    });
  }
  // check
  if (item.classList.contains('complete-btn')) {
    todoItem.classList.toggle('completed');
  }

}
// saves a todo in LS
function saveLocalTodos(todo) {
  todosArray.push(todo);
  localStorage.setItem('todos', JSON.stringify(todosArray));
}
// render the todos from LS
function getLocalTodos() {

  if (localStorage.length > 0) {
    data.forEach(todo => {
      appendTodo(todoList, todo);
    });
  }
}

// delete a todo from LS
function removeLocaltodo(todo) {
  // find the index of the very todo
  const todosIndex = todo.children[0].innerText;
  // delete these one element from the array
  todosArray.splice(todosArray.indexOf(todosIndex), 1);
  //refresh LS
  localStorage.setItem('todos', JSON.stringify(todosArray));
}

// delete all todos
function clearAll(event) {
  event.preventDefault();
  
  // while (todoList.firstChild) {
  //   todoList.removeChild(todoList.firstChild);
  // }

  // localStorage.clear();

  const todos = todoList.children;
  const nodesArray = Array.prototype.slice.call(todos);
  
  nodesArray.forEach(function(todo) {
    if(!(todo.classList.contains('template'))) {
      
      todo.classList.add('fall');
      // todo.remove();

      document.addEventListener('transitionend', function() {
        location.reload();
      });
    }
  })
  localStorage.clear();
}

// filter todos
function filterOptions(event) {
  
  const todos = todoList.children;
  const nodesArray = Array.prototype.slice.call(todos);

  nodesArray.forEach(function(todo) {

    if(!(todo.classList.contains('template'))) {
      switch (event.target.value) {

        case 'all':
          todo.style.display = 'flex';
          break;

        case 'completed':
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
        break;

        case 'uncompleted':
          if (!(todo.classList.contains('completed'))) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
      }
    }
  })
}

// check input 
function inputHandler(event) {

  const name = event.currentTarget.elements.name;

  function deactivateButton() {
    addButton.setAttribute('disabled', 'disabled');
    addButton.classList.add('todo-button_disabled');
  }

  function activateButton() {
    addButton.removeAttribute('disabled', 'disabled');
    addButton.classList.remove('todo-button_disabled');
  }

  if (event.target.parentElement.classList.contains('form')) {
    if (name.value.length <= 1 ) {
      deactivateButton();
    } else {
      activateButton();
    }
  }


}

// EventListeners
document.addEventListener('DOMContentLoaded', getLocalTodos);
addButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
clearButton.addEventListener('click', clearAll);
filterTodos.addEventListener('input', filterOptions);
form.addEventListener('keydown', inputHandler); // use keydown not to enter an empty string
