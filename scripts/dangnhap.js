// Element của trang
const formLogin = document.getElementById("formLogin");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const checkUser = document.getElementById("checkUser");

// Lắng nghe sự kiện submit form đăng nhập của trang
formLogin.addEventListener("submit", function (e) {
  let flag = 0;

  let checkLogin;
  e.preventDefault();

  // Validate dữ liệu đầu vào

  // Lấy dữ liệu từ local về
  if (
    emailElement.value == `admin@gmail.com` &&
    passwordElement.value == "admin"
  ) {
    window.location.href = "../pages/admin.user.html";
    return;
  } else {
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];
    // Tìm kiếm email và mật khẩu người dùng nhập vào có tồn tại trên local ?
    const findUser = userLocal.find(
      (user) => user.Mail === emailElement.value && user.Pass === password.value
    );
    console.log(findUser);
    if (!findUser) {
      // Nếu không thì thông báo cho người dùng nhập lại dữ liệu
      flag = 0;
      localStorage.setItem("flag", JSON.stringify(flag));
      checkUser.style.display = "block";
    } else {
      // Nếu có thì đăng nhập thành công và chuyển hướng về trang chủ
      flag = 1;
      localStorage.setItem("flag", JSON.stringify(flag));
      window.location.href = "../pages/project2.html";
      // Lưu ID đăng nhập lên local
      checkLogin = findUser.userID;
      localStorage.setItem("checkLogin", JSON.stringify(checkLogin));

      // Lưu thông tin của user đăng nhập lên local
      localStorage.setItem("userLogin", JSON.stringify(findUser));
    }
  }
});
