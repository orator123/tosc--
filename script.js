function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
}
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const msg = document.getElementById("loginMessage");
  if (user === "admin" && pass === "admin123") {
    msg.textContent = "Login successful. Welcome!";
    msg.style.color = "green";
  } else {
    msg.textContent = "Invalid credentials. Try again.";
    msg.style.color = "red";
  }
}
function calculateRemaining() {
  const total = parseFloat(document.getElementById("totalBudget").value);
  const used = parseFloat(document.getElementById("usedBudget").value);
  const result = document.getElementById("result");
  if (isNaN(total) || isNaN(used)) {
    result.textContent = "Please enter valid numbers.";
    result.style.color = "red";
  } else {
    const remaining = total - used;
    const percent = ((remaining / total) * 100).toFixed(2);
    result.textContent = `Remaining: $${remaining} (${percent}% of budget left)`;
    result.style.color = "green";
  }
}