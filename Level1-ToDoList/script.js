const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";
    if (task.done) span.classList.add("done");
    li.appendChild(span);

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.className = "done-btn";
    doneBtn.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };
    li.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      const newText = prompt("Edit your task:", tasks[index].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Del";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return alert("Please enter a task!");
  tasks.push({ text, done: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

renderTasks();