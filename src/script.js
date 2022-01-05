// grabbing DOM elements for dark mode
const body = document.querySelector('body');
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// grabbing DOM elements for todo
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoRemove = document.querySelectorAll('.todo-remove');
const checkBox = document.querySelectorAll('.check-box');
const filterBtns = document.querySelectorAll('.todo-filter');
const clearBtn = document.querySelector('.btn-clear');
let todoLeft = document.getElementById('todo-left');

todoLeft.innerHTML = todoList.childElementCount;

// DARK MODE
// set theme based on local storage
if (currentTheme) {
  body.classList.add(currentTheme);
}

// listen for click event on theme toggle
themeToggle.addEventListener('click', () => {
  // toggle theme
  body.classList.toggle('dark-theme');

  // add dark theme to local storage
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark-theme');
  } else {
    localStorage.setItem('theme', null);
  }
});

// TODO FUNCTIONS
todoInput.addEventListener('keyup', addTodo);
clearBtn.addEventListener('click', clearTodos);
filterBtns.forEach((btn) => {
  btn.addEventListener('click', filterTodo);
});
document.addEventListener('click', (e) => {
  removeTodo(e);
  checkTodo(e);
});

// add todo
function addTodo(e) {
  if (e.key === 'Enter' && todoInput.value !== '') {
    // get todo value
    const todoText = todoInput.value;
    // console.log(todo);

    // create new div
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-item');

    // create html template for todo
    newTodo.innerHTML = `
        <div class="check-box">
            <img src="./images/icon-check.svg" alt="" />
        </div>
        <p class="todo-text">${todoText}</p>
        <div class="todo-remove">
            <img src="./images/icon-cross.svg" alt="" />
        </div>
    `;

    // append todo to list
    todoList.appendChild(newTodo);

    // increment todo left
    todoLeft.innerHTML = todoList.childElementCount;

    // clear input
    todoInput.value = '';
  }
}

// funciton to remove todo item
function removeTodo(e) {
  if (e.target.parentElement.classList.contains('todo-remove')) {
    const todoItem = e.target.parentElement.parentElement;
    todoItem.classList.add('delete');
    setTimeout(() => {
      todoItem.remove();
      todoLeft.innerHTML = todoList.childElementCount;
    }, 500);
  }
}

// function to check todo item
function checkTodo(e) {
  if (e.target.classList.contains('check-box')) {
    const todoItem = e.target.parentElement;
    todoItem.classList.toggle('completed');
  }
}

// function to filter todo items
function filterTodo(e) {
  const todoItems = todoList.querySelectorAll('.todo-item');

  // get filter value from button
  const filterValue = e.target.dataset.filter;

  //   give the clicked button a class of active
  filterBtns.forEach((btn) => {
    btn.classList.remove('active');
  });

  e.target.classList.add('active');

  // loop through todo items
  todoItems.forEach((todo) => {
    // check if todo contains filter value
    if (filterValue === 'all') {
      // show all todos
      todo.style.display = 'flex';
    } else if (filterValue === 'completed') {
      // show completed todos
      if (todo.classList.contains('completed')) {
        todo.style.display = 'flex';
      } else {
        todo.style.display = 'none';
      }
    } else {
      // show uncompleted todos
      if (!todo.classList.contains('completed')) {
        todo.style.display = 'flex';
      } else {
        todo.style.display = 'none';
      }
    }
  });
}

// clear completed todos
function clearTodos() {
  const todoItems = todoList.querySelectorAll('.todo-item');

  todoItems.forEach((todo) => {
    if (todo.classList.contains('completed')) {
      todo.classList.add('delete');
      setTimeout(() => {
        todo.remove();
        todoLeft.innerHTML = todoList.childElementCount;
      }, 500);
    }
  });
}
