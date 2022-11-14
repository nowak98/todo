window.addEventListener("load", () => {
  // variable declarations
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const listEl = document.querySelector("#tasks");
  const nameInput = document.querySelector("#name");
  let username = localStorage.getItem("username") || "";
  nameInput.value = username;

  // Saving the entered name
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value;

    if (!task) {
      alert("Please, fill out the task");
      return;
    }

    // Adding tasks, editing tasks, deleting tasks, etc
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";

    const task_checkbox = document.createElement("button");
    task_checkbox.classList.add("checkbox");
    task_checkbox.innerHTML = "Done";

    task_actions_el.appendChild(task_checkbox);
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    listEl.appendChild(task_el);

    input.value = "";

    task_edit_el.addEventListener("click", () => {
      if (task_edit_el.innerText.toLocaleLowerCase() === "edit") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        task_edit_el.innerText = "Save";
      } else {
        task_input_el.setAttribute("readonly", "readonly");
        task_edit_el.innerText = "Edit";
      }

      if (task_el.classList.contains("done")) {
        task_el.classList.remove("done");
        task_checkbox.style.cursor = "pointer";

        task_input_el.style.textDecoration = "none";
      }
    });
    task_delete_el.addEventListener("click", () => {
      listEl.removeChild(task_el);
    });
    task_checkbox.addEventListener("click", () => {
      task_el.classList.add("done");
      task_edit_el.innerText = "Undo";
      task_checkbox.style.color = "#f9f9f9";
      task_checkbox.style.cursor = "auto";
      task_input_el.style.textDecoration = "line-through";
      task_input_el.style.textDecorationThickness = "2px";
      task_input_el.style.textDecorationColor = "#ff6392";
    });
  });
});
