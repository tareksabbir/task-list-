// define ui element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

//define event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTask);
filter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',getTask)



// define functions
// add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('add a task!');
    } else{
        //creat li element 
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value)
        taskInput.value = '';
    }
    e.preventDefault();
}
//remove task 

function removeTask(e) {
    if(e.target.hasAttribute("href")){
        if(confirm("are you sure?")){
            let ele = e.target.parentElement;
            ele.remove();
        }
    }
}

//clear task

function clearTask(e){
    taskList.innerHTML = "";
}

// filter task 

function filterTask(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
             task.style.display = ' block';
        } else{
            task.style.display = 'none';
        }
    });
}

//store in local storage

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    task.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {

        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);

    });
    e.preventDefault();
}