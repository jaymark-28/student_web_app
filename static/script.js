const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");

const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const subjectInput = document.getElementById("subject");
const emailInput = document.getElementById("email");
const gradeInput = document.getElementById("grade");

const dateField = document.getElementById("dateField");
const subjectField = document.getElementById("subjectField");
const emailField = document.getElementById("emailField");
const gradeField = document.getElementById("gradeField");
const submitBtn = document.getElementById("submitBtn");

let students = JSON.parse(localStorage.getItem("students")) || [];

/* FIELD REVEAL LOGIC */
nameInput.addEventListener("input", () => {
  dateField.classList.toggle("hidden", nameInput.value.trim() === "");
});

dateInput.addEventListener("change", () => {
  subjectField.classList.toggle("hidden", dateInput.value === "");
});

subjectInput.addEventListener("change", () => {
  emailField.classList.toggle("hidden", subjectInput.value === "");
});

emailInput.addEventListener("input", () => {
  gradeField.classList.toggle("hidden", !emailInput.checkValidity());
});

gradeInput.addEventListener("input", () => {
  submitBtn.classList.toggle(
    "hidden",
    gradeInput.value === "" || gradeInput.value < 0 || gradeInput.value > 100
  );
});

/* RENDER STUDENTS */
function render() {
  list.innerHTML = "";

  students.forEach(s => {
    const li = document.createElement("li");
    const status = s.grade >= 75 ? "Passed" : "Failed";
    li.className = s.grade >= 75 ? "pass" : "fail";
    li.textContent = `${s.name} - ${s.subject} - ${s.grade} (${status})`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  students.push({
    name: nameInput.value,
    date: dateInput.value,
    subject: subjectInput.value,
    email: emailInput.value,
    grade: Number(gradeInput.value)
  });

  localStorage.setItem("students", JSON.stringify(students));
  render();
  form.reset();

  // Reset visibility
  dateField.classList.add("hidden");
  subjectField.classList.add("hidden");
  emailField.classList.add("hidden");
  gradeField.classList.add("hidden");
  submitBtn.classList.add("hidden");
});

render();
