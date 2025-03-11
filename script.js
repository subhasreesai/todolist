let input = document.getElementById("input-task");
let add = document.getElementById("add-task");
let taskList = document.getElementById("tasks-list");

input.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        add.click();
    }
});


add.addEventListener('click', () => {
    let inputText = input.value.trim();
    if (inputText === "") {
        alert("Please Enter a Task");
    } else {
        addTaskToList(inputText, false); 
        saveTasks();
    }
    input.value = "";
});

 addTaskToList=(inputText, isCompleted = false)=> {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = inputText;
    if (isCompleted) {
        span.classList.add("completed");
    }

    
    span.addEventListener('click', () => {
        span.classList.toggle("completed");
        saveTasks();
    });
    let deleteButton = document.createElement("img");
    deleteButton.src = "delete img/delete_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg";
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    
    let editButton = document.createElement("img");
    editButton.src = "delete img/edit_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg";
    editButton.addEventListener('click', () => {
        let div = document.createElement("div");
        div.classList = "editbox";
        let textarea = document.createElement("input");
        textarea.value = span.textContent;

        textarea.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                updateButton.click();
            }
        });

        let updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.id = "update-task";
        updateButton.addEventListener('click', () => {
            span.textContent = textarea.value;
            div.remove();
            saveTasks();
        });

        div.appendChild(textarea);
        div.appendChild(updateButton);
        li.appendChild(div);
    });

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}


function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#tasks-list li").forEach((task) => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToList(task.text, task.completed));
}
loadTasks();