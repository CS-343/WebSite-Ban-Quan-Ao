document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginButton");
  const logoutBtn = document.getElementById("logoutButton");
  const loginForm = document.getElementById("loginForm");
  const cancelLogin = document.getElementById("cancelLogin");
  const formLogin = document.getElementById("formLogin");
  const loginStatus = document.getElementById("loginStatus");

  function updateUI() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");
    if (isLoggedIn === "true" && username) {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      // Hiển thị lời chào
      loginStatus.querySelector('button').style.display = "none"; // ẩn nút login cũ
      if (!document.getElementById("welcomeUser")) {
        const welcomeUser = document.createElement("span");
        welcomeUser.id = "welcomeUser";
        welcomeUser.style.color = "white";
        welcomeUser.style.marginRight = "10px";
        welcomeUser.textContent = `Xin chào, ${username}`;
        loginStatus.insertBefore(welcomeUser, logoutBtn);
      } else {
        document.getElementById("welcomeUser").textContent = `Xin chào, ${username}`;
      }
    } else {
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
      const welcomeUser = document.getElementById("welcomeUser");
      if (welcomeUser) welcomeUser.remove();
      loginStatus.querySelector('button').style.display = "inline-block";
    }
  }

  loginBtn.addEventListener("click", () => {
    loginForm.style.display = "flex";
  });

  cancelLogin.addEventListener("click", () => {
    loginForm.style.display = "none";
  });

  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        alert(data.message);
        loginForm.style.display = "none";
        updateUI();
        formLogin.reset();
      } else {
        alert(data.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      alert("Lỗi kết nối server");
      console.error(error);
    }
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    alert("Đăng xuất thành công.");
    updateUI();
  });

  updateUI();
});