const taskList = document.getElementById('list');
const addButton = document.getElementById('btn');
const taskInput = document.getElementById('input');
const AllTasks = document.getElementById('all');
const CompleteTasks = document.getElementById('completed');
const IncompleteTasks = document.getElementById('incomplete');
const CompleteAll = document.getElementById('completeAll');
const DeleteCompleted = document.getElementById('deleteCompleted');

let allTask = 0;    // variable to keep track of all tasks
let completedTask = 0;  // variable to keep track of completed tasks
updateCount();

addButton.addEventListener('click', addTask);   // add event listener for add task button
taskList.addEventListener('click', deleteTask); // add event listener for delete task button
AllTasks.addEventListener('click', filterAllTasks);  // add event listener for All Tasks button
CompleteTasks.addEventListener('click', filterCompleteTasks);   // add event listener for Completed Tasks button
IncompleteTasks.addEventListener('click', filterIncompleteTasks);   // add event listener for Incomplete Tasks button
CompleteAll.addEventListener('click', markAllCompleted);    // add event listener for Complete All button
DeleteCompleted.addEventListener('click', deleteAllCompleted);  // add event listener for Delete Completed button

// function to add a task
function addTask(e) {
    e.preventDefault();
    if (taskInput.value === ''){
        alert('Enter Task First');
    } else {
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo');

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add('check');
        newTodo.appendChild(completedButton);
        
        const taskText = document.createElement('span');
        taskText.innerText = taskInput.value;
        newTodo.appendChild(taskText);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash');
        newTodo.appendChild(trashButton);
        taskList.appendChild(newTodo);
        taskInput.value = '';
        allTask++;
        updateCount();
    };

};

// function to delete a task
function deleteTask(e) {
    const item = e.target;
    if (item.classList[0] === 'trash'){
        const task = item.parentElement;
        if (task.classList.contains('completed')){
            completedTask--;
        }
        allTask--;
        task.classList.add('fade');
		task.remove();
        updateCount();
    };
    // check if the clicked item is the check button
    if (item.classList[0] === 'check'){
        const task = item.parentElement;
        // check if the task is already completed
        if (task.classList.contains('completed')){
            return;
        }
        task.classList.add('completed');
        completedTask++;
        updateCount();
    }
};

// function to filter all tasks
function filterAllTasks() {
    const todos = taskList.childNodes;

    // loop through all the tasks and set their display to flex
    todos.forEach(function(todo){
        if (todo.style){
                todo.style.display = 'flex';
        };
    });
}

// function to filter completed tasks
function filterCompleteTasks(){
    const todos = taskList.childNodes;
    // loop through all the tasks and set the display of completed tasks to flex and the rest to none
    todos.forEach(function(todo){
        if (todo.style){
            if (todo.classList.contains('completed')){
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        }});
}

// function to filter incomplete tasks
function filterIncompleteTasks(){
    const todos = taskList.childNodes;
    // loop through all the tasks and set the display of incomplete tasks to flex and the rest to none
    todos.forEach(function(todo){
        if (todo.style){
            if (!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        }});
}

// function to mark all tasks as completed
function markAllCompleted(){
    const todos = taskList.childNodes;
    // loop through all the tasks and add the class 'completed' to them
    todos.forEach(function(todo){
        todo.classList.add('completed');
    });
    completedTask = allTask;
    updateCount();
}

// function to delete all completed tasks
function deleteAllCompleted(){
    const todos = taskList.querySelectorAll('.completed');
    // loop through all the tasks and remove the tasks that have the class 'completed'
    todos.forEach(function(todo){
        if (todo.classList.contains('completed')){
            completedTask--;
            allTask--;
            todo.remove();
        }
    });
    updateCount();
}

// function to update the count of all tasks and completed tasks
function updateCount(){
    document.getElementById('allCount').innerText = allTask;
    document.getElementById('completeCount').innerText = completedTask;
    document.getElementById('incompleteCount').innerText = allTask-completedTask;
}