// Lucide icons initialization
lucide.createIcons();

const API_BASE_URL = '/api/tasks';

// DOM Elements
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const searchInput = document.getElementById('searchTask');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');

// State
let tasks = [];

// Fetch all tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_BASE_URL);
        tasks = await response.json();
        renderTasks(tasks);
        updateStats();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Render tasks to the list
function renderTasks(tasksToRender) {
    taskList.innerHTML = '';
    
    tasksToRender.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <div class="task-info">
                <div class="task-title ${task.status === 'COMPLETED' ? 'completed' : ''}">${task.title}</div>
                <div class="task-meta">
                    <span class="badge badge-${task.priority.toLowerCase()}">${task.priority}</span>
                    <span class="category">${task.category || 'No Category'}</span>
                    <span class="due-date">${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-icon" onclick="toggleTaskStatus(${task.id})" title="Toggle Complete">
                    <i data-lucide="${task.status === 'COMPLETED' ? 'undo' : 'check'}"></i>
                </button>
                <button class="btn-icon delete" onclick="deleteTask(${task.id})" title="Delete Task">
                  <i data-lucide="trash-2"></i>
                </button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
    
    lucide.createIcons();
}

// Add new task
async function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;
    const category = document.getElementById('taskCategory').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;

    if (!title) {
        alert('Please enter a task title');
        return;
    }

    const newTask = {
        title,
        description,
        category,
        priority,
        status: 'PENDING',
        dueDate: dueDate ? dueDate : null
    };

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            // Reset form
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDesc').value = '';
            document.getElementById('taskCategory').value = '';
            document.getElementById('taskPriority').value = 'MEDIUM';
            document.getElementById('taskDueDate').value = '';
            
            fetchTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Delete task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Toggle task status
async function toggleTaskStatus(id) {
    const task = tasks.find(t => t.id === id);
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    
    const updatedTask = { ...task, status: newStatus };

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

// Update statistics
function updateStats() {
    totalTasksEl.textContent = tasks.length;
    completedTasksEl.textContent = tasks.filter(t => t.status === 'COMPLETED').length;
}

// Search tasks
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(query) || 
        (task.category && task.category.toLowerCase().includes(query))
    );
    renderTasks(filteredTasks);
});

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

// Initial Load
fetchTasks();
