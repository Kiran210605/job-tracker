// Import Firebase (v9 modular style)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } 
  from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your Firebase config (replace with your own!)
const firebaseConfig = {
  apiKey: "AIzaSyDioJ-fyROEsF4l41M43zdNMsMcclbh1SI",
  authDomain: "job-tracker-8e73a.firebaseapp.com",
  projectId: "job-tracker-8e73a",
  storageBucket: "job-tracker-8e73a.firebasestorage.app",
  messagingSenderId: "642214335961",
  appId: "1:642214335961:web:63be515deff5177e3935c8"
  // measurementId: "G-GGXJVPKZBE"
};

// Init Firebase + Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load applications from Firestore
async function loadCompanies() {
  const querySnapshot = await getDocs(collection(db, "applications"));
  querySnapshot.forEach((docSnap) => {
    const appData = docSnap.data();
    renderCompany({ id: docSnap.id, ...appData });
  });
}

// Add new company
async function addCompany() {
  const companyName = document.getElementById("companyInput").value.trim();
  const date = document.getElementById("dateInput").value;
  const notes = document.getElementById("notesInput").value.trim();

  if (companyName === "" || date === "") {
    alert("Please enter both company name and date!");
    return;
  }

  const newApp = { company: companyName, date: date, notes: notes };

  const docRef = await addDoc(collection(db, "applications"), newApp);
  renderCompany({ id: docRef.id, ...newApp });

  document.getElementById("companyInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("notesInput").value = "";
}

// Render company in UI
function renderCompany(app) {
  const li = document.createElement("li");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("company-info");
  infoDiv.innerHTML = `<strong>${app.company}</strong>
                       <span class="date">Applied on: ${app.date}</span>
                       <span class="notes">${app.notes}</span>`;

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = async () => {
    await deleteDoc(doc(db, "applications", app.id));
    li.remove();
  };

  li.appendChild(infoDiv);
  li.appendChild(delBtn);

  document.getElementById("companyList").appendChild(li);
}

// Load everything when page opens
document.addEventListener("DOMContentLoaded", loadCompanies);
