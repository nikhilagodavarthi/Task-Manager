const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        try {
            const response = await axios.post('/tasks', { text: taskText });
            const newTask = response.data;
            addTaskToList(newTask);
            taskInput.value = '';
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
});

function addTaskToList(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
        try {
            await axios.delete(`/tasks/${task._id}`);
            taskList.removeChild(li);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    });
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}
