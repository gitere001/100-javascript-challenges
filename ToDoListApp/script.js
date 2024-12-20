import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const textArea = document.getElementById("task-description");
const addTaskBtn = document.getElementById("add-task-btn");
const addTaskModal = document.querySelector(".add-task-modal");
const closeModalBtn = document.querySelector("#close-modal-btn");
const submitTaskBtn = document.getElementById("submit-task");
const messageFeedBack = document.querySelector(".message-feedback");
const tasksContainer = document.querySelector(".task-display");
const editTaskBtn = document.querySelector("#edit-task");

const taskTitleInput = document.getElementById("task-title");
const titleError = document.querySelector(".title-error");

const taskDescriptionInput = document.getElementById("task-description");
const priorityInput = document.getElementById("priority");
const categoryInput = document.getElementById("category");
const dueDateInput = document.getElementById("due-date");
const dueDateError = document.querySelector(".due-date-error");
const statusFilterElement = document.querySelector("#status");
const timeFilterElement = document.getElementById("task-time-period");

const allTasks = [
  {
    id: "1a6f1d8b-b623-4a9f-9397-2c3d2a982d1f",
    title: "Finish reading JavaScript documentation",
    description: "Complete the ES6 section and take notes for reference.",
    priority: "medium",
    category: "education",
    dueDate: "2024-12-18T12:00",
    status: "In Progress",
  },
  {
    id: "7c4b2f62-cb8a-49db-91ff-8e0a9e918b6d",
    title: "Plan family vacation itinerary",
    description: "Include activities for kids and finalize hotel bookings.",
    priority: "high",
    category: "personal",
    dueDate: "2024-12-20T09:30",
    status: "Not Started",
  },
  {
    id: "b3a756e8-ae77-4872-a3fa-59a9f3a82bb8",
    title: "Organize team meeting for new project kickoff",
    description:
      "Discuss goals, deliverables, and assign tasks to team members.",
    priority: "urgent",
    category: "work",
    dueDate: "2024-12-15T14:00",
    status: "Completed",
  },
  {
    id: "2b1d6f53-e61d-4ef1-8d6a-33d3a1f0a3fc",
    title: "Prepare monthly financial report",
    description: "Ensure accuracy and highlight key performance indicators.",
    priority: "medium",
    category: "finance",
    dueDate: "2024-12-22T11:45",
    status: "Cancelled",
  },
  {
    id: "3df1c6e7-56f8-4c75-b47f-0247d6b9a38e",
    title: "Schedule dentist appointment for annual checkup",
    description: "Call the clinic to book a convenient time next week.",
    priority: "low",
    category: "health",
    dueDate: "2024-12-25T16:15",
    status: "Not Started",
  },
  {
    id: "4e2d9a74-89f0-4f0a-a2ef-f3f93ab2d9d1",
    title: "Revise business plan and update market analysis",
    description: "Incorporate recent data trends and competitor insights.",
    priority: "high",
    category: "work",
    dueDate: "2024-12-28T10:00",
    status: "In Progress",
  },
  {
    id: "5c3f8b79-77d1-483a-ae95-fc3b32ba1f8e",
    title: "Buy groceries for the week",
    description:
      "Include fresh fruits, vegetables, and essential pantry items.",
    priority: "low",
    category: "personal",
    dueDate: "2024-12-14T18:30",
    status: "Completed",
  },
  {
    id: "6d2b3c87-94a8-41db-bf0a-238f3d98c9a7",
    title: "Create a workout plan for next month",
    description: "Focus on strength training and improving endurance.",
    priority: "medium",
    category: "health",
    dueDate: "2024-12-16T07:45",
    status: "In Progress",
  },
  {
    id: "7f3e1d9b-c7b9-432d-ae0d-b2f9a36dc8f2",
    title: "Finalize design for website homepage",
    description: "Review drafts and implement feedback from the client.",
    priority: "urgent",
    category: "work",
    dueDate: "2024-12-19T20:00",
    status: "Not Started",
  },
  {
    id: "8a5d6e42-bd7b-4a5d-8f5c-94b7a6d7b1e4",
    title: "Read 'Atomic Habits' and take notes",
    description: "Focus on strategies to build effective habits.",
    priority: "low",
    category: "education",
    dueDate: "2024-12-30T21:00",
    status: "Not Started",
  },
];

const getDate = (date) => new Date(date).toISOString().split("T")[0];
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
  }
}
function validateInput(elementInput, errorElement) {
  if (!elementInput.value.trim()) {
    elementInput.style.border = "1px solid red";
    errorElement.style.display = "block";
  }
}

function getTimeAndStatusFilters(timeFilterElement, statusFilterElement) {
  const timePeriod = timeFilterElement.value;
  const status = statusFilterElement.value;
  // console.log(timePeriod, status);
  const todayDate = getDate(new Date());
  // console.log(todayDate);
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
      // console.log('entered the blocked');
      const dates = getLast7Dates();
      // console.log(dates);
      const result = allTasks.filter((task) =>
        dates.includes(getDate(task.dueDate))
      );
      // console.log(result);
      return result;
    }
  }
  // console.log('this is lastweek', filterByTime());

  function filterByAll() {
    if (status === "all-status") {
      return filterByTime();
    } else {
      const result = filterByTime().filter((task) => task.status === status);
      return result;
    }
  }
  const taskToDisplay = filterByAll();
  // console.log(taskToDisplay);
  return taskToDisplay;
}

function createNewTaskCard(task) {
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

  const taskTitle = task.title ? task.title : "failed to load title";
  const taskDescription = task.description
    ? task.description
    : "Failed to load Description";
  const taskPriority = task.priority ? task.priority : "";
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

  titleSection.appendChild(titleSectionH2);
  titleSection.appendChild(titleSectionPriority);
  newDiv.appendChild(titleSection);

  const descriptionP = document.createElement("p");
  descriptionP.textContent = taskDescription;
  newDiv.appendChild(descriptionP);

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

function displayTasks() {
  const tasksToDisplay = getTimeAndStatusFilters(
    timeFilterElement,
    statusFilterElement
  );
  tasksToDisplay.forEach((task) => {
    const taskCard = createNewTaskCard(task);
    tasksContainer.appendChild(taskCard);
  });
}

function submitTask(e) {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim() || "No Description";
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
        description,
        priority,
        category,
        dueDate,
        status: "Not Started",
      };

      allTasks.push(task);
      messageFeedBack.textContent = "Task Added Successfully!";
      messageFeedBack.style.display = "block";
      messageFeedBack.classList.add("success");
      console.log(allTasks);
      setTimeout(() => {
        messageFeedBack.style.display = "none";
        messageFeedBack.textContent = "";
        messageFeedBack.classList.remove("success");
        closeAddTaskModal();
      }, 2000);
    } catch (error) {
      messageFeedBack.textContent = "An Error Occurred";
      messageFeedBack.classList.add("error");
      messageFeedBack.style.display = "block";
      setTimeout(() => {
        messageFeedBack.style.display = "None";
        messageFeedBack.textContent = "";
        messageFeedBack.classList.remove("error");
      }, 2000);
    }
  }
}

textArea.addEventListener("input", () => {
  textArea.style.height = "auto";
  textArea.style.height = `${Math.min(textArea.scrollHeight, 100)}px`;
});
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
// tasksContainer.addEventListener('click', (event)=> {
//   const closestCard = event.target.closest('.task-card')
//   console.log(closestCard);
//   const closestEditBtn = closestCard.children[3].children[1]
//   if (closestEditBtn) {
//     // const tastToEdit = allTasks.find(task => task.)

//     showAddTaskModal()
//     const title = closestCard.querySelector('.task-title h2').textContent
//     const priority = closestCard.querySelector('p').textContent
//     const category = closestCard.querySelector('.task-details p:nth-child(2)').textContent
//     const description = closestCard.querySelector('.task-card > p').textContent
//     const duedate = closestCard.querySelector('.task-details p:nth-child(1) span').textContent
//     console.log(title, priority, category, description, duedate);
//     console.log(addTaskModal);
//     console.log(closestCard);
//   }

// })
displayTasks();
addTaskBtn.addEventListener("click", showAddTaskModal);
closeModalBtn.addEventListener("click", closeAddTaskModal);
submitTaskBtn.addEventListener("click", submitTask);
