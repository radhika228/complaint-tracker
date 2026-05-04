async function loadStats() {
  try {
    const res = await fetch("https://complaint-tracker-45ts.onrender.com/api/complaints");
    const complaints = await res.json();
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === "Pending").length;
    const resolved = complaints.filter(c => c.status === "Resolved").length;
    animateNumber("statTotal", total);
    animateNumber("statPending", pending);
    animateNumber("statResolved", resolved);
  } catch {}
}

function animateNumber(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.ceil(target / 30);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 40);
}

loadStats();