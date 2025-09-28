// render Users
function renderUsers() {
    document.getElementById("table-users").style.display = "block";
    document.getElementById("li-product").style.backgroundColor = "black";
    document.getElementById("li-logout").style.backgroundColor = "black";
    document.getElementById("li-category").style.backgroundColor = "black";
    document.getElementById("li-order").style.backgroundColor = "black";
  
    document.getElementById("li-users").style.backgroundColor =
      "rgb(85, 67, 208)";
    let users = JSON.parse(localStorage.getItem("users"));
    let a = 0;
    text = ``;
    for (let i = 0; i < users.length; i++) {
      if (users[i].status == true) {
        a++;
        text += `
        <tr>
          <td>${a}</td>
          <td>${users[i].Name}</td>
          <td>${users[i].Mail}</td>
          <td>
              <button onclick="banUser(${users[i].userID})" style="background-color: rgb(238, 65, 65);">Khóa</button>
          </td>
        </tr>
        `;
      } else {
        a++;
        text += `
        <tr>
          <td>${a}</td>
          <td>${users[i].Name}</td>
          <td>${users[i].Mail}</td>
          <td>
              <button onclick="unbanUser(${users[i].userID})" style="background-color: rgb(47, 211, 47);">Mở Khóa</button>
          </td>
        </tr>
        `;
      }
    }
    document.getElementById("renderUsers").innerHTML = text;
  }
  renderUsers();
  
 
  
  // Logout
  function logout() {
    document.getElementById("li-category").style.backgroundColor = "black";
    document.getElementById("li-users").style.backgroundColor = "black";
    document.getElementById("li-product").style.backgroundColor = "black";
    document.getElementById("li-logout").style.backgroundColor =
      "rgb(85, 67, 208)";
    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 500);
  }

  function banUser(idUser) {
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      if (idUser == users[i].userID) {
        users[i].status = false;
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
        break;
      }
    }
  }
  
  function unbanUser(idUser) {
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      if (idUser == users[i].userID) {
        users[i].status = true;
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
        break;
      }
    }
  }
  