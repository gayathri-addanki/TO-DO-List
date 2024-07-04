const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.dueDate, task.completed);
    });
});

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText !== '') {
        createTaskElement(taskText, dueDate, false);

        // Save tasks to local storage
        saveTasksToLocalStorage();
        
        taskInput.value = '';
        dueDateInput.value = '';
    }
}

function createTaskElement(text, dueDate, completed) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.classList.add('checkbox');
    
    const taskText = document.createElement('span');
    taskText.textContent = `${text} - Due: ${dueDate || 'Not set'}`;
    
    li.appendChild(checkbox);
    li.appendChild(taskText);

    taskList.appendChild(li);

    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        saveTasksToLocalStorage();
    });
}

function clearTasks() {
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach(task => task.remove());
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map(li => {
        const checkbox = li.querySelector('.checkbox');
        const text = li.querySelector('span').textContent.split(' - Due: ')[0];
        const dueDate = li.querySelector('span').textContent.split(' - Due: ')[1] || '';
        const completed = checkbox.checked;
        return { text, dueDate, completed };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
