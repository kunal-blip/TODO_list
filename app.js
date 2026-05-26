document.addEventListener("DOMContentLoaded", ()=>{
    const strodeTask = JSON.parse(localStorage.getItem('tasks'));

    if (strodeTask){
        storedTasks.forEach((task)=> tasks.push(task))
    }
})

let tasks = [];

const SaveTask = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () =>{
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim()

    if(text){
        tasks.push({text:text, completed: false});

        taskInput.value = "";
        updateTaskList();
        updateStats();
        SaveTask();
    }
};

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats(); 
    SaveTask();   
}

const deleteTask = (index)=>{
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    SaveTask();
}

const editTask = (index)=>{
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text

    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    SaveTask();
}

const updateStats = ()=>{
    const completedTask = tasks.filter(tasks => tasks.completed).length
    const totalTask = tasks.length
    const progress = (completedTask/totalTask) *100
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completedTask} / ${totalTask}`;
}

const updateTaskList = ()=> {
    const task_list = document.getElementById("task-list");
    task_list.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li")

        listItem.innerHTML = `
            <div class = "taskitem">
                <div class="task ${tasks.completed ? "completed": ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} data-index="${index}"/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="editing.png" alt="edit" onClick ="editTask(${index})">
                    <img src="delete.png" alt="edit" onClick ="deleteTask(${index})">
                </div>
            </div>
        `;

        listItem.addEventListener("change", ()=> toggleTaskComplete(index));
        task_list.appendChild(listItem);
    });
}

document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault()
    addTask();
})