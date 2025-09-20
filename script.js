function addCompany() {
  const companyInput = document.getElementById("companyInput");
  const dateInput = document.getElementById("dateInput");
  const notesInput = document.getElementById("notesInput");

  const companyName = companyInput.value.trim();
  const date = dateInput.value;
  const notes = notesInput.value.trim();

  if (companyName === "" || date === "") {
    alert("Please enter both company name and date!");
    return;
  }

  const li = document.createElement("li");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("company-info");
  infoDiv.innerHTML = `<strong>${companyName}</strong>
                       <span class="date">Applied on: ${date}</span>
                       <span class="notes">${notes}</span>`;

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = () => li.remove();

  li.appendChild(infoDiv);
  li.appendChild(delBtn);

  document.getElementById("companyList").appendChild(li);

  // Clear input fields
  companyInput.value = "";
  dateInput.value = "";
  notesInput.value = "";
}
// Load saved applications from localStorage when the page loads
window.onload = function () {
  const savedCompanies = JSON.parse(localStorage.getItem("applications")) || [];
  savedCompanies.forEach(app => renderCompany(app.company, app.date, app.notes));
};

function addCompany() {
  const companyInput = document.getElementById("companyInput");
  const dateInput = document.getElementById("dateInput");
  const notesInput = document.getElementById("notesInput");

  const companyName = companyInput.value.trim();
  const date = dateInput.value;
  const notes = notesInput.value.trim();

  if (companyName === "" || date === "") {
    alert("Please enter both company name and date!");
    return;
  }

  // Render on screen
  renderCompany(companyName, date, notes);

  // Save to localStorage
  const savedCompanies = JSON.parse(localStorage.getItem("applications")) || [];
  savedCompanies.push({ company: companyName, date: date, notes: notes });
  localStorage.setItem("applications", JSON.stringify(savedCompanies));

  // Clear inputs
  companyInput.value = "";
  dateInput.value = "";
  notesInput.value = "";
}

function renderCompany(companyName, date, notes) {
  const li = document.createElement("li");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("company-info");
  infoDiv.innerHTML = `<strong>${companyName}</strong>
                       <span class="date">Applied on: ${date}</span>
                       <span class="notes">${notes}</span>`;

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = function () {
    li.remove();
    deleteCompany(companyName, date, notes);
  };

  li.appendChild(infoDiv);
  li.appendChild(delBtn);

  document.getElementById("companyList").appendChild(li);
}

function deleteCompany(companyName, date, notes) {
  let savedCompanies = JSON.parse(localStorage.getItem("applications")) || [];
  savedCompanies = savedCompanies.filter(
    app => !(app.company === companyName && app.date === date && app.notes === notes)
  );
  localStorage.setItem("applications", JSON.stringify(savedCompanies));
}
