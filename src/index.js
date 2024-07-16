document.getElementById('add-task').addEventListener('click', addTask);

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskValue = taskInput.value.trim();

  if (taskValue === '') return;

  // Split the task input into task text and count
  const taskMatch = taskValue.match(/(.*?)(\d+)$/);
  let taskText = taskValue;
  let taskCount = 1;

  if (taskMatch) {
    taskText = taskMatch[1].trim();
    taskCount = parseInt(taskMatch[2], 10);
  }

  for (let i = 0; i < taskCount; i++) {
    createTask(taskText);
  }

  taskInput.value = '';
}

function createTask(text) {
  const taskList = document.getElementById('task-list');
  let existingTaskItem = Array.from(taskList.children).find(taskItem => 
    taskItem.querySelector('span').textContent.startsWith(text)
  );

  if (existingTaskItem) {
    updateTask(existingTaskItem, text);
  } else {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    taskItem.setAttribute('data-counter', '0');
    taskItem.innerHTML = `
      <span>${text} (Updated 0 times)</span>
      <div class="actions">
        <button class="edit">✏️</button>
        <button class="delete">❌</button>
      </div>
    `;

    const editButton = taskItem.querySelector('.edit');
    editButton.addEventListener('click', () => updateTask(taskItem, text));

    const deleteButton = taskItem.querySelector('.delete');
    deleteButton.addEventListener('click', () => deleteTask(taskItem));

    taskList.appendChild(taskItem);
  }
}

function updateTask(taskItem, text) {
  let counter = parseInt(taskItem.getAttribute('data-counter'), 10);
  counter++;
  taskItem.setAttribute('data-counter', counter);
  taskItem.querySelector('span').textContent = `${text} (Updated ${counter} times)`;

  // Change the color to orange if updated
  taskItem.classList.add('updated-task');
}

function deleteTask(taskItem) {
  taskItem.remove();
}
