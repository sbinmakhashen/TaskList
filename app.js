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
  // clear input
  input.value = '';

  e.preventDefault();
}

// removing tasks by icon button
function remove(e) {
  // getting the aTag
  if (e.target.parentElement.classList.contains('delete-item')) {
    // removing the li by clicking on the aTag
    e.target.parentElement.parentElement.remove();
  }
}

// clear button function
function clear(e) {
  // clearing the tasks in ul
  taskList.innerHTML = '';
  e.preventDefault();
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