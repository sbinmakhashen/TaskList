// creating UI vars
const form = document.querySelector('#form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear');
const filter = document.querySelector('#filter');
const input = document.querySelector('#task-input');

// Loading all of the event listeners
loadEventListeners();
// load event listeners function
function loadEventListeners() {
  // adding a task event
  form.addEventListener('submit', addTask);
  // removing tasks
  taskList.addEventListener('click', remove);
  // making the clear btn work
  clearBtn.addEventListener('click', clear);
  // filter tasks
  filter.addEventListener('keyup', filterTask);
  // sotre tasks in LS when DOM is refreshing
  document.addEventListener('DOMContentLoaded', getTasksLS);
}
// Getting the tasks from local storage
function getTasksLS(e) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create the li tag
    const li = document.createElement('li');
    // creating the class of the li
    li.className = 'lis';
    // creating a text node and append it to the li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const aTag = document.createElement('a');
    aTag.className = 'delete-item';
    // creating the icon that is inside of the aTag
    aTag.innerHTML = '<i class="fas fa-window-close fa-lg"></i>';
    // console.log(aTag);
    // appending the aTag to the li
    li.appendChild(aTag);
    // append to the li we created into ul or taskList
    taskList.appendChild(li);
  });
}


// adding tasks function 
function addTask(e) {
  if (input.value === '') {
    alert("Add a task first!!");
  }
  // Create the li tag
  const li = document.createElement('li');
  // creating the class of the li
  li.className = 'lis';
  // creating a text node and append it to the li
  li.appendChild(document.createTextNode(input.value));
  // Create new link element
  const aTag = document.createElement('a');
  aTag.className = 'delete-item';
  // creating the icon that is inside of the aTag
  aTag.innerHTML = '<i class="fas fa-window-close fa-lg"></i>';
  // console.log(aTag);
  // appending the aTag to the li
  li.appendChild(aTag);
  // append to the li we created into ul or taskList
  taskList.appendChild(li);
  // store in local sotrage
  storeTaskInLS(input.value);
  // clear input
  input.value = '';

  e.preventDefault();
}

// store tasks in local storage
function storeTaskInLS(e) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(e);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// removing tasks by icon button
function remove(e) {
  // getting the aTag
  if (e.target.parentElement.classList.contains('delete-item')) {
    // removing the li by clicking on the aTag
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from local storage
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}

// remove tasks from the local storage
function removeTaskFromLS(e) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (e.textContent == task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clear button function
function clear(e) {
  // clearing the tasks in ul
  if (confirm('Are you sure you want to delete all tasks?')) {
    taskList.innerHTML = '';
    // clearing tasks from the local storage
    clearTasksLS();
  }
  e.preventDefault();
}

// Clear local storage
function clearTasksLS() {
  localStorage.clear();
}

// filtering the tasks
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  // selecting all of the items that are in class of lis
  document.querySelectorAll('.lis').forEach(function (task) {
    const liItem = task.firstChild.textContent;
    if (liItem.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}