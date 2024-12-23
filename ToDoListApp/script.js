import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// const textArea = document.getElementById("task-description");
const addTaskBtn = document.getElementById("add-task-btn");
const addTaskModal = document.querySelector(".add-task-modal");
const closeModalBtn = document.querySelector("#close-modal-btn");
const submitTaskBtn = document.getElementById("submit-task");
const messageFeedBack = document.querySelector(".message-feedback");
const tasksContainer = document.querySelector(".task-display");
const taskStatusUpdateSelect = document.getElementById("task-status-update");

const taskTitleInput = document.getElementById("task-title");
const titleError = document.querySelector(".title-error");

// const taskDescriptionInput = document.getElementById("task-description");
const priorityInput = document.getElementById("priority");
const categoryInput = document.getElementById("category");
const dueDateInput = document.getElementById("due-date");
const dueDateError = document.querySelector(".due-date-error");
const statusFilterElement = document.querySelector("#status");
const timeFilterElement = document.getElementById("task-time-period");

// Initialize allTasks by parsing JSON or using an empty array as fallback
let allTasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(allTasks)); // Store as JSON string
}

// Remove an item by index
function removeItem(index) {
  allTasks.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem("tasks", JSON.stringify(allTasks)); // Update localStorage
}

const categoryIcons = {
  work: ["fas", "fa-briefcase"],
  personal: ["fas", "fa-user"],
  health: ["fas", "fa-heartbeat"],
  finance: ["fas", "fa-dollar-sign"],
  education: ["fas", "fa-graduation-cap"],
  other: ["fas", "fa-ellipsis-h"],
};

const statusIcons = {
  "Not Started": ["fas", "fa-hourglass-start"],
  "In Progress": ["fas", "fa-spinner"],
  Completed: ["fas", "fa-check-circle"],
  Cancelled: ["fas", "fa-times-circle"],
};

const getDate = (date) => new Date(date).toISOString().split("T")[0];

function clearAtMidnight() {
  const currentTimestamp = new Date().getTime();
  const lastClearTimestamp = localStorage.getItem("lastClearTimestamp");
  console.log(lastClearTimestamp);

  if (lastClearTimestamp) {
    const lastClearDate = new Date(parseInt(lastClearTimestamp, 10));
    const now = new Date();

    // Check if a new day has started
    if (
      lastClearDate.getDate() !== now.getDate() ||
      lastClearDate.getMonth() !== now.getMonth() ||
      lastClearDate.getFullYear() !== now.getFullYear()
    ) {
      localStorage.removeItem("tasks");
      console.log("LocalStorage cleared as it is now a new day.");
      localStorage.setItem("lastClearTimestamp", currentTimestamp.toString());
    }
  } else {
    // No timestamp found, clear and set it
    localStorage.removeItem("tasks");
    console.log("LocalStorage cleared because no timestamp was found.");
    localStorage.setItem("lastClearTimestamp", currentTimestamp.toString());
  }
}

function sanitizeInput(input) {
  let sanitized = input.trim();
  sanitized = sanitized.replace(/\s+/g, " ");
  sanitized = sanitized
    .split(" ")
    .map((word) => {
      if (word.length > 15) {
        let chunks = [];
        for (let i = 0; i < word.length; i += 15) {
          chunks.push(word.slice(i, i + 15));
        }
        return chunks.join(" ");
      }
      return word;
    })
    .join(" ");
  return sanitized;
}

function updateAppsDate() {
  const today = new Date();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  document.getElementById("current-date").textContent = `${formattedDate}`;
}
function showAddTaskModal() {
  const modalOverly = document.createElement("div");
  modalOverly.classList.add("overly");
  modalOverly.style.display = "block";
  addTaskModal.style.display = "block";
  document.body.appendChild(modalOverly);
}

function closeAddTaskModal() {
  const modalOverly = document.querySelector(".overly");
  if (modalOverly) {
    modalOverly.remove();
    addTaskModal.style.display = "none";
    titleError.style.display = "none";
    taskTitleInput.style.border = "1px solid #ccc";
    dueDateInput.style.border = "1px solid #ccc";
    dueDateError.style.display = "none";
    clearAddItemsModal();
  }
}
function validateInput(elementInput, errorElement) {
  if (!sanitizeInput(elementInput.value)) {
    elementInput.style.border = "1px solid red";
    errorElement.style.display = "block";
  }
}

function getTimeAndStatusFilters(timeFilterElement, statusFilterElement) {
  const timePeriod = timeFilterElement.value;
  const status = statusFilterElement.value;
  const todayDate = getDate(new Date());
  function getLast7Dates() {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }

    return dates;
  }

  function filterByTime() {
    if (timePeriod === "all") {
      return allTasks;
    }
    if (timePeriod === "today") {
      return allTasks.filter((task) => getDate(task.dueDate) === todayDate);
    }
    if (timePeriod === "past-week") {
      const dates = getLast7Dates();
      const result = allTasks.filter((task) =>
        dates.includes(getDate(task.dueDate))
      );
      return result;
    }
  }

  function filterByAll() {
    if (status === "all-status") {
      return filterByTime();
    } else {
      const result = filterByTime().filter((task) => task.status === status);
      return result;
    }
  }
  const taskToDisplay = filterByAll();
  return taskToDisplay;
}

function createNewTaskCard(task) {
  let categoryName;
  let categoryIcon;
  let statuName;
  let statusIcon;
  if (task.category) {
    categoryName = task.category;
    categoryIcon = categoryIcons[categoryName];
  } else {
    categoryName = "";
    categoryIcon = categoryIcons["other"];
  }

  if (task.status) {
    statuName = task.status;
    statusIcon = statusIcons[statuName];
  } else {
    statuName = "";
    statusIcon = statusIcons["Not Started"];
  }

  const taskTitle = task.title;
  // const taskDescription = task.description.trim() || "No Description";
  const taskPriority = task.priority;
  const taskDueDate = task.dueDate
    ? getDate(task.dueDate).replace("-", "/").replace("-", "/")
    : "";
  const taskDueTime = task.dueDate
    ? new Date(task.dueDate)
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Enables 12-hour format
        })
        .toLowerCase() // Converts AM/PM to lowercase
    : "";
  const newDiv = document.createElement("div");
  newDiv.classList.add("task-card");
  newDiv.setAttribute("data-id", task.id);

  const titleSection = document.createElement("div");
  titleSection.classList.add("task-title");

  const titleSectionH2 = document.createElement("h2");
  titleSectionH2.textContent = taskTitle;

  const titleSectionPriority = document.createElement("p");
  titleSectionPriority.textContent = taskPriority;
  titleSectionPriority.classList.add(taskPriority);

  titleSection.appendChild(titleSectionH2);
  titleSection.appendChild(titleSectionPriority);
  newDiv.appendChild(titleSection);

  // const descriptionP = document.createElement("p");
  // descriptionP.textContent = taskDescription;
  // newDiv.appendChild(descriptionP);

  const taskDetailsDiv = document.createElement("div");
  taskDetailsDiv.classList.add("task-details");

  const timeP = document.createElement("p");
  const clockIcon = document.createElement("i");
  clockIcon.classList.add("fas", "fa-clock");

  const timeDateSpan = document.createElement("span");
  timeDateSpan.textContent = `${taskDueDate} ${taskDueTime}`;

  timeP.appendChild(clockIcon);
  timeP.appendChild(timeDateSpan);
  taskDetailsDiv.appendChild(timeP);

  const categoryP = document.createElement("p");
  const iconI = document.createElement("i");
  const categorySpan = document.createElement("span");
  categorySpan.textContent = categoryName;
  iconI.classList.add(...categoryIcon);

  categoryP.appendChild(iconI);
  categoryP.appendChild(categorySpan);
  taskDetailsDiv.appendChild(categoryP);

  const statusP = document.createElement("p");
  const statusIconI = document.createElement("i");
  const statusSpan = document.createElement("span");
  statusIconI.classList.add(...statusIcon);
  statusSpan.textContent = statuName;
  statusP.appendChild(statusIconI);
  statusP.classList.add(statuName.replace(" ", ""));
  statusP.appendChild(statusSpan);
  taskDetailsDiv.appendChild(statusP);

  newDiv.appendChild(taskDetailsDiv);

  const taskActionsDiv = document.createElement("div");
  taskActionsDiv.classList.add("task-actions");

  const statusSelect = document.createElement("select");
  statusSelect.name = "";
  statusSelect.id = "task-status-update";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.selected = true;
  defaultOption.disabled = true;
  defaultOption.textContent = "Update Status";
  statusSelect.appendChild(defaultOption);

  const statuses = [
    { value: "task-status-update-not-started", text: "Not Started" },
    { value: "task-status-update-inprogress", text: "In Progress" },
    { value: "task-status-update-completed", text: "Completed" },
    { value: "task-status-update-cancelled", text: "Cancelled" },
  ];

  statuses.forEach((status) => {
    const option = document.createElement("option");
    option.value = status.value;
    option.textContent = status.text;
    statusSelect.appendChild(option);
  });

  const editButton = document.createElement("button");
  editButton.id = "edit-task";
  editButton.classList.add("edit-task-btn");
  editButton.textContent = "Edit task";

  const deleteButton = document.createElement("button");
  deleteButton.id = "delete-task";
  deleteButton.textContent = "Delete Task";

  taskActionsDiv.appendChild(statusSelect);
  taskActionsDiv.appendChild(editButton);
  taskActionsDiv.appendChild(deleteButton);

  newDiv.appendChild(taskActionsDiv);

  return newDiv;
}

// function updateSelectedOption(filterElement) {
//   Array.from(filterElement.children).forEach((option) => {
//     // Set the 'selected' attribute for the matching option
//     if (option.value === filterElement.value) {
//       option.setAttribute("selected", ""); // Explicitly set the 'selected' attribute
//     } else {
//       option.removeAttribute("selected"); // Remove 'selected' from non-matching options
//     }
//   });
// }
function displayNoTasksFound() {
  tasksContainer.innerHTML = "";
  const noTaskDiv = document.createElement("div");
  const noTaskMessage = document.createElement("p");
  noTaskMessage.textContent = "No Tasks Found By Above filters";
  noTaskDiv.appendChild(noTaskMessage);

  noTaskDiv.classList.add("no-task");
  tasksContainer.appendChild(noTaskDiv);
}

function displayTasks(tasksArray) {
  if (tasksArray.length > 0) {
    tasksArray.forEach((task) => {
      const taskCard = createNewTaskCard(task);
      tasksContainer.appendChild(taskCard);
    });
  } else {
    displayNoTasksFound();
  }
}

let isNewTask = true;
function submitTask(e) {
  e.preventDefault();

  if (isNewTask) {
    const filterStatusValue = statusFilterElement.value;
    const title = sanitizeInput(taskTitleInput.value);
    // const description =
    //   sanitizeInput(taskDescriptionInput.value) || "No Description";
    const priority = priorityInput.value.trim();
    const category = categoryInput.value.trim();
    const dueDate = dueDateInput.value.trim();

    if (!title || !dueDate) {
      validateInput(taskTitleInput, titleError);
      validateInput(dueDateInput, dueDateError);
    } else {
      try {
        const task = {
          id: uuidv4(),
          title,
          // description,
          priority,
          category,
          dueDate,
          status: "Not Started",
        };
        const taskDueDate = parseInt(new Date(task.dueDate).getDate());
        const todayDate = parseInt(new Date().getDate());
        if (
          (filterStatusValue === "all-status" ||
            filterStatusValue === task.status) &&
          taskDueDate <= todayDate
        ) {
          const fistChildCard = tasksContainer.firstElementChild;
          const card = createNewTaskCard(task);
          if (fistChildCard) {
            tasksContainer.insertBefore(card, fistChildCard);
          } else {
            tasksContainer.appendChild(card);
          }
          const noTask = tasksContainer.querySelector(".no-task");
          if (noTask) {
            noTask.remove();
          }
        }

        allTasks.push(task);
        save();
        messageFeedBack.textContent = "Task Added Successfully!";
        messageFeedBack.style.display = "block";
        messageFeedBack.classList.add("success");
        setTimeout(() => {
          messageFeedBack.style.display = "none";
          messageFeedBack.textContent = "";
          messageFeedBack.classList.remove("success");
          taskTitleInput.value = "";
          // taskDescriptionInput.value = "";
          dueDateInput.value = "";
          priorityInput.selected = "";
          categoryInput.selected = "";
          closeAddTaskModal();
          // displayTasks(getTimeAndStatusFilters(timeFilterElement, statusFilterElement))
        }, 2000);
      } catch (error) {
        messageFeedBack.textContent = "An Error Occurred";
        messageFeedBack.classList.add("error");
        messageFeedBack.style.display = "block";
        console.log(error);
        setTimeout(() => {
          messageFeedBack.style.display = "None";
          messageFeedBack.textContent = "";
          messageFeedBack.classList.remove("error");
        }, 2000);
      }
    }
  }
}

function clearAddItemsModal() {
  taskTitleInput.value = "";
  // taskDescriptionInput.value = "";
  priorityInput.value = "medium";
  categoryInput.value = "personal";
  dueDateInput.value = "";
}
function updateMinDate(formated) {
  let dateToFormat = formated ? new Date(formated) : new Date();

  const year = dateToFormat.getFullYear();
  let month = dateToFormat.getMonth() + 1; // Months are 0-based
  let day = dateToFormat.getDate();
  let hours = dateToFormat.getHours();
  let minutes = dateToFormat.getMinutes();

  // Add leading zero if necessary
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const formatedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  dueDateInput.min = formatedDate;

  return formatedDate;
}

// textArea.addEventListener("input", () => {
//   textArea.style.height = "auto";
//   textArea.style.height = `${Math.min(textArea.scrollHeight, 100)}px`;
// });
taskTitleInput.addEventListener("input", () => {
  if (taskTitleInput.value.trim()) {
    taskTitleInput.style.border = "1px solid #ccc";
    titleError.style.display = "none";
  }
});
dueDateInput.addEventListener("input", () => {
  if (dueDateInput.value.trim()) {
    dueDateInput.style.border = "1px solid #ccc";
    dueDateError.style.display = "none";
  }
});
tasksContainer.addEventListener("click", (event) => {
  const elementClicked = event.target;
  if (elementClicked.classList.contains("edit-task-btn")) {
    isNewTask = false;
    const editButton = event.target;
    const closestCard = editButton.closest(".task-card");

    const id = closestCard.dataset.id;
    const title = closestCard.querySelector(".task-title h2").textContent;
    const priority = closestCard.querySelector("p").textContent;
    const category = closestCard.querySelector(
      ".task-details p:nth-child(2)"
    ).textContent;
    // const description = closestCard.querySelector(".task-card > p").textContent;
    const duedate = closestCard.querySelector(
      ".task-details p:nth-child(1) span"
    ).textContent;
    addTaskModal.style.display = "block";
    taskTitleInput.value = title;
    // taskDescriptionInput.value =
    //   description === "No Description" ? "" : description;
    priorityInput.value = priority;
    categoryInput.value = category;
    dueDateInput.value = updateMinDate(duedate);
    submitTaskBtn.id = "update-task";
    submitTaskBtn.textContent = "Update";
    showAddTaskModal();
    submitTaskBtn.addEventListener("click", () => {

      const updatedDetails = {
        id,
        title: sanitizeInput(taskTitleInput.value),
        // description:
        //   sanitizeInput(taskDescriptionInput.value) || "No Description",
        category: categoryInput.value,
        priority: priorityInput.value,
        dueDate: dueDateInput.value,
      };
      if (!updatedDetails.title || !updatedDetails.dueDate) {
        validateInput(taskTitleInput, titleError);
        validateInput(dueDateInput, dueDateError);
      } else {
        const index = allTasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          const taskToUpdate = allTasks[index];
          updatedDetails.status = taskToUpdate.status;
          allTasks.splice(index, 1, updatedDetails);
          save();
          messageFeedBack.textContent = "Task Updated Successfully";
          messageFeedBack.classList.add("success");
          messageFeedBack.style.display = "block";
          setTimeout(() => {
            messageFeedBack.textContent = "";
            messageFeedBack.classList.remove("success");
            messageFeedBack.style.display = "none";
            submitTaskBtn.id = "add-task";
            submitTaskBtn.textContent = "Add";
            isNewTask = true;
            console.log(tasksContainer.children);
            closestCard.remove()
            clearAddItemsModal();
            closeAddTaskModal();
            displayTasks(
              getTimeAndStatusFilters(timeFilterElement, statusFilterElement)
            );
            window.location.reload();

          }, 2000);
        } else {
          alert("Try again later");
        }
      }
    });
  } else if (elementClicked.id === "delete-task") {
    const closestCard = elementClicked.closest(".task-card");
    const id = closestCard.dataset.id;
    const taskIndex = allTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      allTasks.splice(taskIndex, 1);
      save();
      closestCard.remove();
      if (tasksContainer.children.length === 0) {
        displayNoTasksFound();
      }
    } else {
      alert("Failed to delete task try again later");
    }
  }
});
tasksContainer.addEventListener("change", (event) => {
  const changedStatus = event.target;
  if (changedStatus.id === "task-status-update") {
    const closestCard = event.target.closest(".task-card");
    const taskId = closestCard.dataset.id;
    const taskIndex = allTasks.findIndex((task) => task.id === taskId);
    console.log(closestCard);

    if (taskIndex !== -1) {
      const detailsContainer = closestCard.querySelector(".task-details");
      const pToChange = detailsContainer.querySelector("p:last-child");
      if (pToChange) {
        const option = Array.from(changedStatus.children).find(
          (opt) => opt.value === changedStatus.value
        );
        if (option) {
          const optionName = option.textContent;
          allTasks[taskIndex].status = optionName;
          save();
          const newStatusP = document.createElement("p");
          newStatusP.className = optionName.replace(" ", "");
          const newI = document.createElement("i");
          newI.classList.add(...statusIcons[optionName]);
          const newSpan = document.createElement("span");
          newSpan.textContent = optionName;

          newStatusP.appendChild(newI);
          newStatusP.appendChild(newSpan);
          detailsContainer.replaceChild(newStatusP, pToChange);
        }
      }
    } else {
      alert("Error while Updating Task");
    }
  }
});

updateMinDate();
updateAppsDate();
displayTasks(getTimeAndStatusFilters(timeFilterElement, statusFilterElement));
clearAtMidnight();
timeFilterElement.addEventListener("change", () => {
  tasksContainer.innerHTML = "";
  const tasksToDisplay = getTimeAndStatusFilters(
    timeFilterElement,
    statusFilterElement
  );

  console.log(timeFilterElement);

  displayTasks(tasksToDisplay);
});
statusFilterElement.addEventListener("change", () => {
  tasksContainer.innerHTML = "";

  const tasksToDisplay = getTimeAndStatusFilters(
    timeFilterElement,
    statusFilterElement
  );
  displayTasks(tasksToDisplay);
});

addTaskBtn.addEventListener("click", showAddTaskModal);
closeModalBtn.addEventListener("click", closeAddTaskModal);
submitTaskBtn.addEventListener("click", submitTask);
