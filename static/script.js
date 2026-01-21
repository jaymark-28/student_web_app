const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];

function validateForm(name, grade) {
  if (name === "" || isNaN(grade)) {
    alert("Please fill in all fields.");
    return false;
  }

  if (grade < 0 || grade > 100) {
    alert("Grade must be between 0 and 100.");
    return false;
  }

  return true;
}

function render() {
  list.innerHTML = "";

  students.forEach(s => {
    const li = document.createElement("li");

    let status, cssClass;
    if (s.grade >= 75) {
      status = "Passed";
      cssClass = "pass";
    } else {
      status = "Failed";
      cssClass = "fail";
    }

    li.className = cssClass;
    li.textContent = `${s.name} - ${s.grade} (${status})`;

    list.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const grade = Number(document.getElementById("grade").value);

  if (!validateForm(name, grade)) return;

  students.push({ name, grade });
  localStorage.setItem("students", JSON.stringify(students));

  render();
  form.reset();
});

render();
