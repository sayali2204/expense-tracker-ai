const API = "http://127.0.0.1:5000";

/* Load expenses */
async function loadExpenses() {
  const res = await fetch(`${API}/get_expenses`);
  const data = await res.json();

  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  data.forEach(exp => {
    const li = document.createElement("li");
    li.textContent = `${exp.title} - ₹${exp.amount} (${exp.date})`;
    list.appendChild(li);
  });
}

/* Send chat command */
async function sendCommand() {
  const input = document.getElementById("chat-input");
  const message = input.value;

  await fetch(`${API}/ai-command`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  input.value = "";
  loadExpenses();
}

loadExpenses();
