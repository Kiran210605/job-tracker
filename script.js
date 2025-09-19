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
