const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".conut-value");
const lista = document.querySelector(".lista")

console.log(lista);
let taskCount = 0;

let todos = JSON.parse(localStorage.getItem("todo-list"))



newTaskInput.addEventListener("keyup", e =>{
  let userTask = newTaskInput.value;
  if(e.key == "Enter" && userTask) {
    
      
      if(!todos){
        todos = [];
      }
      newTaskInput.value = "";
        let taskInfo = {name: userTask, status: "penging"}
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();

      
  }
});



const displayCount = (taskCount) =>{
 countValue.innerText = taskCount
};

const addTask = () =>{
  const taskName = newTaskInput.value.trim();
  error.style.display ="none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display ="block";
    }, 200);
    return;
  }
 
    const task = `
<div class="tasks">

    <input type="checkbox"  id="tasks-ckeck">
    <span class="taskname">${taskName}</span>
    
    </button>
    <button class="delete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>          
    </button>
    </div>
   
 `;

    taskContainer.insertAdjacentHTML 
    ("beforeend", task);

    const deleteBtn = document.querySelectorAll(".delete");
    console.log(deleteBtn);
    deleteBtn.forEach(button =>{
      button.onclick = () =>{
        button.parentElement.remove();
        taskCount -= 1;
        displayCount(taskCount);
      };
    });
   
    const taskCheck = document.querySelectorAll("#tasks-ckeck")
    console.log(taskCheck);
    taskCheck.forEach((checkBox) =>{
      checkBox.onchange = () => {
       checkBox.nextElementSibling.classList.toggle("completed");
       checkBox.classList.add("completed")
        if (checkBox.checked) {
          taskCount -= 1;
        } else{
          taskCount += 1;
        }
        displayCount(taskCount);
      };
    });
    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};   
addBtn.addEventListener("click", addTask);  

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
}
