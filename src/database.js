import holderDom from "./holdersForDom";
import renderHolder from "./formRender";
import renderToDoHolder from "./toDoRender";
import { v4 as uuidv4 } from "uuid";

//LOCAL STORAGE
const LOCAL_STORAGE_DATABASE_KEY = "task.wholeDatabase";
let database = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATABASE_KEY)) || [
  {
    id: 0,
    title: "This is the name of project",
    description:
      "Each project has a name and a description. You can either delete or edit them",
    todo: [
      {
        id: "0",
        title: "To-Do Name",
        description: "To-Do Description",
        date: renderToDoHolder.getTodayDate(),
        priority: "",
        status: "",
      },
      {
        id: "1",
        title: "To-Do Name 1",
        description: "To-Do Description 2",
        date: renderToDoHolder.getTodayDate(),
        priority: "",
        status: "",
      },
    ],
  },
];
const LOCAL_STORAGE_SELECTED_DATABASE_KEY = "task.selectedProject";
let selectedProjectID = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_DATABASE_KEY
);

function saveToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_DATABASE_KEY, JSON.stringify(database));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_DATABASE_KEY, selectedProjectID);
}
//LOCAL STORAGE

//0 items in database array
function createDummy() {
  let object = {
    id: 0,
    title: "Base project",
    description: "Your project list will never be empty!",
    todo: [
      {
        id: "0",
        title: "To-Do Name",
        description: "You can put your description here!",
        date: renderToDoHolder.getTodayDate(),
        priority: "",
        status: "",
      },
      {
        id: "1",
        title: "To-Do Name1",
        description: "To-Do Description1",
        date: renderToDoHolder.getTodayDate(),
        priority: "",
        status: "",
      },
    ],
  };
  database.push(object);
  return database;
}
//ID
function createID() {
  let increment = database[database.length - 1];
  let incrementId = increment.id;
  let newId = incrementId + 1;
  return newId;
}

function updateID() {
  let counter = 0;
  for (let i = 0; i < database.length; i++) {
    database[i].id = counter;
    counter++;
  }
  return database;
}

//movementindatabase
function pushIntoDatabase() {
  let object = {
    id: createID(),
    title: holderDom.formProjectName.value,
    description: holderDom.formProjectDescription.value,
    todo: [],
  };
  database.push(object);
  saveToLocalStorage();
  return database;
}
function removeProject() {
  database.splice(event.target.getAttribute("data-delete"), 1);
  if (!database.length) {
    createDummy();
    renderHolder.render();
  }
  updateID();
  saveToLocalStorage();
  renderHolder.render();
}
function editProject() {
  holderDom.formProjectWrapEdit.setAttribute(
    "id",
    "formProjectWholeAbsoluteEdit"
  );
  holderDom.formProjectNameEdit.value =
    event.target.parentNode.childNodes[2].textContent;
  holderDom.formProjectDescriptionEdit.value =
    event.target.parentNode.childNodes[3].textContent;
  let indexOfProject = event.target.parentNode.getAttribute("data-projectid");
  holderDom.updateFormButton.setAttribute("data-databaseindex", indexOfProject);
}
function updateProject() {
  let indexInDatabase = holderDom.updateFormButton.getAttribute(
    "data-databaseindex"
  );
  let selectedProject = database[indexInDatabase];
  if (holderDom.formProjectNameEdit.value == "") {
    alert("Your project needs a name. It cannot be saved without a name.");
  } else {
    selectedProject.title = holderDom.formProjectNameEdit.value;
    selectedProject.description = holderDom.formProjectDescriptionEdit.value;
  }
  saveToLocalStorage();
}
//TODO functionality
function pushToDoIntoProject() {
  const selectedProjectForPush = document.querySelector(".selectedProject");
  let objectToDo = {
    id: uuidv4(),
    title: holderDom.formToDoName.value,
    description: holderDom.formToDoDescription.value,
    date: holderDom.formToDoDate.value,
    priority: holderDom.formToDoPriority.value,
    status: holderDom.formToDoStatus.value,
  };
  database[selectedProjectForPush.dataset.projectid].todo.push(objectToDo);
  saveToLocalStorage();
  return database;
}

const databaseHolder = {
  database,
  createID,
  pushIntoDatabase,
  removeProject,
  editProject,
  updateProject,
  saveToLocalStorage,
  selectedProjectID,
  //updateToDoId,
  pushToDoIntoProject,
};
export default databaseHolder;