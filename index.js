const input = document.getElementById("input");
const add = document.getElementById("add");
const list = document.getElementById("list");

const storedtask = JSON.parse(localStorage.getItem("tasks")) || [];
const localarrey = [...storedtask];

document.addEventListener("DOMContentLoaded", () => {
    
    localarrey.sort((a, b) => a.completed - b.completed)
    .forEach(({ task, completed }) => {
        showtasks(task, completed);
    });
});


// let add task in local arrey 

add.addEventListener("click", () => {
    const task = input.value.trim();
    if (task !== "" && !localarrey.some(item => item.task == task)) {
        showtasks(task, false);
        localarrey.push({ task, completed: false });
        localStorage.setItem("tasks", JSON.stringify(localarrey));
        input.value = "";
    } else {
        alert("Enter a task that isn't already added.")
        input.value = "";
    }
})
//  function for listing the tsak in todo
function showtasks(task, completed) {

    //lstitem
    const li = document.createElement("li");
    li.className = "listitem";
    list.appendChild(li);


    //toggle
    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = completed;
    toggle.className = "toggle";
    li.appendChild(toggle);


    // todotext
    const todotext = document.createElement("span")
    todotext.innerText = task;
    li.appendChild(todotext);


    //status 
    const statusText = document.createElement("span");
    statusText.innerText = "Completed";
    statusText.className = "status-text";
    li.appendChild(statusText);


    // delete button
    const delbutton = document.createElement("button");
    delbutton.innerText = "delete";
    delbutton.className = "delete";
    list.appendChild(delbutton);
    delebutton(li, task,delbutton);
    iscompletedtask(li,toggle, task, todotext, statusText,delbutton);

}

// togle button function
function iscompletedtask(li,toggle, task,todotext,statusText, delbutton) {
    toggle.addEventListener("change", () => {
        const index = localarrey.findIndex(item => item.task == task)
        console.log(index)
        localarrey[index].completed = toggle.checked;
        localStorage.setItem("tasks", JSON.stringify(localarrey));
        if (toggle.checked) {
            todotext.classList.add("completed");
            statusText.style.display = "inline";
            list.appendChild(li);
            list.appendChild(delbutton);
        } else {
            todotext.classList.remove("completed");
            statusText.style.display = "none";
        }

    });

    if (toggle.checked) {
        todotext.classList.add("completed");
        statusText.style.display = "inline";
    } else {
        todotext.classList.remove("completed");
        statusText.style.display = "none";
    }
}


// deletebutton function
function delebutton(li, task, delbutton) {
    delbutton.addEventListener("click", () => {
        list.removeChild(li);
        list.removeChild(delbutton)
        const index = localarrey.findIndex(eve=> eve.task == task);
        localarrey.splice(index,1)
        localStorage.setItem("tasks", JSON.stringify(localarrey));
    });
}
