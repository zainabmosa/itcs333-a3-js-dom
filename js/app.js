(() => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const errorMsg = document.getElementById("error-msg");
  const todoList = document.getElementById("todo-list");
  const counter = document.getElementById("counter");

  const filterAll = document.getElementById("filter-all");
  const filterActive = document.getElementById("filter-active");
  const filterDone = document.getElementById("filter-done");

  let currentFilter = "all";

  function updateCounter() {
    const items = todoList.querySelectorAll("li");

    const remaining = [...items].filter(
      item => !item.classList.contains("completed")
    ).length;

    counter.textContent = `${remaining} items left`;
  }

  function applyFilter() {
    const items = todoList.querySelectorAll("li");

    items.forEach(item => {
      const isCompleted = item.classList.contains("completed");

      if (currentFilter === "all") {
        item.style.display = "";
      } else if (currentFilter === "active") {
        item.style.display = isCompleted ? "none" : "";
      } else {
        item.style.display = isCompleted ? "" : "none";
      }
    });
  }

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText === "") {
      errorMsg.classList.remove("hidden");
      return;
    }

    errorMsg.classList.add("hidden");

    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.classList.add("item-text");
    span.textContent = taskText;

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.type = "button";

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    todoInput.value = "";

    applyFilter();
    updateCounter();
  });

  todoList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    const itemText = event.target.closest(".item-text");

    if (deleteBtn) {
      deleteBtn.closest("li").remove();
    } else if (itemText) {
      itemText.closest("li").classList.toggle("completed");
    }

    applyFilter();
    updateCounter();
  });

  filterAll.addEventListener("click", () => {
    currentFilter = "all";
    applyFilter();
  });

  filterActive.addEventListener("click", () => {
    currentFilter = "active";
    applyFilter();
  });

  filterDone.addEventListener("click", () => {
    currentFilter = "done";
    applyFilter();
  });

  updateCounter();
})();