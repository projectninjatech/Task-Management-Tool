const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];


// Retrieve tasks from localStorage
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderTasks();
}

// Add task
function addTask(task) {
  tasks.push(task);
  renderTasks();
  saveTasksToLocalStorage();
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        console.log(task);
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        const taskText = document.createElement("span");
        taskText.textContent = task;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("editBtn")
        editButton.addEventListener("click", editTask) ;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteBtn")
        deleteButton.addEventListener("click", deleteTask);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        taskItem.appendChild(taskText);
        taskItem.appendChild(buttonContainer);
        taskList.appendChild(taskItem);
        taskItem.setAttribute("data-index", index);
    });
  }
  

// Save tasks to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task
function deleteTask(event) {
    const taskItem = event.target.closest("li"); // The delete button triggered the event and so it will call the closest li to that particular delete button
    const index = taskItem.getAttribute("data-index");
    tasks.splice(index, 1);
    renderTasks();
    saveTasksToLocalStorage();
  }

// function editTask(event) {
//     const taskItem = event.target.closest("li");
//     const index = taskItem.getAttribute("data-index");
//     const newTask = prompt("Edit task:");
//     tasks[index] = newTask;
//     renderTasks();
//   }

function editTask(event) {
  const taskItem = event.target.closest("li");
  const taskText = taskItem.querySelector("span");
  taskText.innerHTML = `<input class="inputTxt" type='text' value='${taskText.textContent}'/>`;
  const inputField = taskText.querySelector("input");
  inputField.addEventListener("blur", () => {
    tasks[taskItem.getAttribute("data-index")] = inputField.value;
    taskText.innerHTML = inputField.value;
    saveTasksToLocalStorage();
  });
}



// Event listeners
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (taskInput.value) {
    addTask(taskInput.value);
    taskInput.value = "";
  }
});
