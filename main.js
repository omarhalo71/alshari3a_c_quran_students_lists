const button = document.querySelector("button");
const input = document.querySelector("input");
const form = document.querySelector("form");
const container = document.getElementById("container");


container.style.border = "2px solid red"


container.addEventListener("click", (eo) => {

  
  switch (eo.target.className) {
    case "icon-trash icon":
      eo.target.parentElement.parentElement.remove();
      break;

    case "icon-angry2 icon":
      eo.target.classList.add("dn");
      const heart = `<span class="icon-heart">   </span>`;

      eo.target.parentElement.parentElement
        .getElementsByClassName("task-text")[0]
        .classList.add("finish");

      eo.target.parentElement.innerHTML += heart;
      ;

    case "icon-heart":
      eo.target.parentElement.parentElement
        .getElementsByClassName("task-text")[0]
        .classList.remove("finish");

      eo.target.classList.add("dn");

      const addAngry = `
<span class="icon-angry2 icon"> </span>
`;

      eo.target.parentElement.innerHTML += addAngry;
      break;

    case "icon-star icon":
      eo.target.classList.add("orange");

      container.prepend(eo.target.parentElement);
      break;

    case "icon-star icon orange":
      eo.target.classList.remove("orange");
      break;
 
  }
});

form.addEventListener("submit", (eo) => {
  eo.preventDefault();
  const task = `   
  
  <div class="task">
  <span class="icon-star icon"> </span>
  <p lang="ar"  class="task-text">      ${input.value}     </p>

  <div>
    <span class="icon-trash icon"> </span>

    <span class="icon-angry2 icon"> </span>
  </div>

 </div>`;

  container.innerHTML += task;

  input.value = "";
});
// ... other imports ...
import { getDatabase, ref, set, onValue } from "firebase/database";

// ... Firebase initialization ...

const db = getDatabase(app); // Get a reference to the database

function saveTasks() {
  const tasksRef = ref(db, 'tasks'); // Create a reference to the 'tasks' node
  set(tasksRef, container.innerHTML); // Save the tasks HTML to the database
}

function loadTasks() {
  const tasksRef = ref(db, 'tasks');
  onValue(tasksRef, (snapshot) => { // Listen for changes in the 'tasks' node
    const savedTasks = snapshot.val();
    if (savedTasks) {
      container.innerHTML = savedTasks; // Update the UI with the tasks
    }
  });
}
