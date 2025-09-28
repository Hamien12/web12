// Lấy ra element của trang

const formDK = document.getElementById("formDK");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("rePassword");
// const address = document.getElementById("address");

// Element liên quan đến lỗi
const userNameError = document.getElementById("userNameError");
const emailError = document.getElementById("emailError");
const emailError2 = document.getElementById("emailError2");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");

//Lấy dữ liệu từ localStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

formDK.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!userName.value) {
    userNameError.style.display = "block";
  } else {
    userNameError.style.display = "none";
  }

  if (!email.value) {
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";

    // Kiểm tra xem email đã được đăng kí hay chưa
    for (let i = 0; i < userLocal.length; i++) {
      if (email.value == userLocal[i].Mail) {
        emailError2.style.display = "block";
        return;
      } else {
        emailError2.style.display = "none";
      }
    }

    // Kiểm tra định dạng email
    if (!validateEmail(email.value)) {
      emailError.style.display = "block";
      emailError.innerHTML = "Email không đúng định dạng";
    }
  }

  if (!password.value) {
    passwordError.style.display = "block";
  } else {
    passwordError.style.display = "none";
  }

  if (!rePassword.value) {
    rePasswordError.style.display = "block";
  } else {
    rePasswordError.style.display = "none";
  }

  // Kiểm tra mật khẩu với nhập lại mk
  if (password.value !== rePassword.value) {
    rePasswordError.style.display = "block";
    rePasswordError.innerHTML = "Mật khẩu không khớp";
  }

  //Gửi dữ liệu từ form lên localStorage
  if (
    userName.value &&
    email.value &&
    password.value &&
    rePassword.value &&
    password.value === rePassword.value &&
    validateEmail(email.value)
  ) {
    // Lấy dữ liệu từ form và gộp thành đối tượng user
    const user = {
      userID: Math.ceil(Math.random() * 100000000),
      Name: userName.value,
      Mail: email.value,
      Pass: password.value,
      // Dress: address.value,
      status: true,
      Cart: [],
    };
    // Push user vào trong mảng userLocal
    userLocal.push(user);
    // Lưu trữ dữ liệu lên Local
    localStorage.setItem("users", JSON.stringify(userLocal));
    alert("Đăng kí thành công.");
    // Chuyển hướng về trang đăng nhập sau 1s
    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1000);
  }
});
