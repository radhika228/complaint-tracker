function getToken() {
  return localStorage.getItem("ch_token");
}

function getUser() {
  const u = localStorage.getItem("ch_user");
  return u ? JSON.parse(u) : null;
}

function saveAuth(token, user) {
  localStorage.setItem("ch_token", token);
  localStorage.setItem("ch_user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("ch_token");
  localStorage.removeItem("ch_user");
  window.location.href = "/";
}

document.addEventListener("DOMContentLoaded", () => {
  const user = getUser();
  const navLogin = document.getElementById("navLogin");
  const navLogout = document.getElementById("navLogout");
  const navUser = document.getElementById("navUser");

  if (user) {
    if (navLogin) navLogin.style.display = "none";
    if (navLogout) {
      navLogout.style.display = "inline-block";
      navLogout.addEventListener("click", logout);
    }
    if (navUser) {
      navUser.textContent = `Hi, ${user.name}`;
      navUser.classList.remove("hidden");
    }
  }
});