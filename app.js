// creating UI vars
const form = document.querySelector('#form');
const taskList = document.querySelector('collection');
const clearBtn = document.querySelector('.clear');
const filter = document.querySelector('#filter');
const input = document.querySelector('#task-input');
const li = document.querySelector('.li');

// Loading all of the event listeners
loadEventListeners();
// load event listeners function
function loadEventListeners() {
  // adding a task event
  form.addEventListener('submit', addTask);
}

// adding tasks function 
function addTask(e) {
  if (input.value === '') {
    alert("Add a task first!!");
  }
  taskList.appendChild(li);
  input.value = '';
  e.preventDefault();
}
