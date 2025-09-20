// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } 
  from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// 🔹 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
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
window.addCompany = async function() {
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
};

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

// Load apps on page start
document.addEventListener("DOMContentLoaded", loadCompanies);
