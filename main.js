// استيراد Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAwVQtHt58BU8VDEKX6t3EltJ2g7-8adAs",
  authDomain: "alshari3a-c-quran.firebaseapp.com",
  databaseURL: "https://alshari3a-c-quran-default-rtdb.firebaseio.com",
  projectId: "alshari3a-c-quran",
  storageBucket: "alshari3a-c-quran.firebasestorage.app",
  messagingSenderId: "1028144161407",
  appId: "1:1028144161407:web:ba5d6e308e02aa418e154a",
  measurementId: "G-ND2EGNC1Z9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // مرجع قاعدة البيانات

// عناصر واجهة المستخدم
const button = document.querySelector("button");
const input = document.querySelector("input");
const form = document.querySelector("form");
const container = document.getElementById("container");

// إضافة الحدود (اختياري)
container.style.border = "2px solid red";

// التعامل مع الأحداث في قائمة المهام
container.addEventListener("click", (eo) => {
  switch (eo.target.className) {
    case "icon-trash icon":
      eo.target.parentElement.parentElement.remove();
      saveTasks(); // حفظ التغييرات في Firebase
      break;

    case "icon-angry2 icon":
      eo.target.classList.add("dn");
      const heart = `<span class="icon-heart">   </span>`;
      eo.target.parentElement.parentElement
        .getElementsByClassName("task-text")[0]
        .classList.add("finish");
      eo.target.parentElement.innerHTML += heart;
      saveTasks(); // حفظ التغييرات في Firebase
      break;

    case "icon-heart":
      eo.target.parentElement.parentElement
        .getElementsByClassName("task-text")[0]
        .classList.remove("finish");
      eo.target.classList.add("dn");
      const addAngry = `
      <span class="icon-angry2 icon"> </span>
      `;
      eo.target.parentElement.innerHTML += addAngry;
      saveTasks(); // حفظ التغييرات في Firebase
      break;

    case "icon-star icon":
      eo.target.classList.add("orange");
      container.prepend(eo.target.parentElement);
      saveTasks(); // حفظ التغييرات في Firebase
      break;

    case "icon-star icon orange":
      eo.target.classList.remove("orange");
      saveTasks(); // حفظ التغييرات في Firebase
      break;
  }
});

// إضافة مهمة جديدة
form.addEventListener("submit", (eo) => {
  eo.preventDefault();
  const task = `   
    <div class="task">
      <span class="icon-star icon"> </span>
      <p lang="ar" class="task-text"> ${input.value} </p>
      <div>
        <span class="icon-trash icon"> </span>
        <span class="icon-angry2 icon"> </span>
      </div>
    </div>`;
  container.innerHTML += task;
  input.value = "";
  saveTasks(); // حفظ المهمة الجديدة
});

// حفظ المهام إلى Firebase
function saveTasks() {
  const tasksRef = ref(db, "tasks"); // مرجع عقدة 'tasks'
  set(tasksRef, container.innerHTML); // حفظ قائمة المهام
}

// تحميل المهام من Firebase
function loadTasks() {
  const tasksRef = ref(db, "tasks");
  onValue(tasksRef, (snapshot) => {
    const savedTasks = snapshot.val();
    if (savedTasks) {
      container.innerHTML = savedTasks; // تحميل قائمة المهام
    }
  });
}

// تحميل المهام عند بدء التطبيق
loadTasks();
