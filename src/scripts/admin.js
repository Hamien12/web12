// render Users
function renderUsers() {
  document.getElementById("table-users").style.display = "block";
  document.getElementById("table-category").style.display = "none";
  document.getElementById("table-products").style.display = "none";
  document.getElementById("table-addCategory").style.display = "none";
  document.getElementById("table-addBook-1").style.display = "none";
  document.getElementById("table-addBook").style.display = "none";
  document.getElementById("li-product").style.backgroundColor = "black";
  document.getElementById("li-logout").style.backgroundColor = "black";
  document.getElementById("li-category").style.backgroundColor = "black";

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
        <td>${users[i].Dress}</td>
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
        <td>${users[i].Dress}</td>
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

// render Category
function renderCategory() {
  document.getElementById("li-users").style.backgroundColor = "black";
  document.getElementById("li-product").style.backgroundColor = "black";
  document.getElementById("li-category").style.backgroundColor =
    "rgb(85, 67, 208)";
  document.getElementById("table-category").style.display = "block";
  document.getElementById("table-users").style.display = "none";
  document.getElementById("table-addBook").style.display = "none";
  document.getElementById("table-products").style.display = "none";
  document.getElementById("table-addBook-1").style.display = "none";
  document.getElementById("table-addCategory").style.display = "block";

  let categoryList = JSON.parse(localStorage.getItem("categoryList"));

  let text = ``;
  let a = 0;
  for (let i = 0; i < categoryList.length; i++) {
    a++;
    text += `
            <tr>
              <td>${a}</td>
              <td>${categoryList[i].id}</td>
              <td>${categoryList[i].name}</td>
              <td>
                  <button onclick="hidenCategory(${categoryList[i].id})" style="background-color: rgb(238, 65, 65); ">Delete</button>
                  <button onclick="displayCategory(${categoryList[i].id})" style="background-color: rgb(47, 211, 47);">Remove</button>
              </td>
            </tr>
            `;
    document.getElementById("renderCategory").innerHTML = text;
  }
}

// render Products
function renderProduct() {
  document.getElementById("table-users").style.display = "none";
  document.getElementById("table-category").style.display = "none";
  document.getElementById("table-addBook").style.display = "block";
  document.getElementById("table-addBook-1").style.display = "none";
  document.getElementById("table-addCategory").style.display = "none";
  document.getElementById("table-products").style.display = "block";
  document.getElementById("li-product").style.backgroundColor =
    "rgb(85, 67, 208)";
  document.getElementById("li-category").style.backgroundColor = "black";
  document.getElementById("li-users").style.backgroundColor = "black";
  document.getElementById("li-logout").style.backgroundColor = "black";

  let products = JSON.parse(localStorage.getItem("productList"));
  let a = 0;
  text = ``;
  for (let i = 0; i < products.length; i++) {
    a++;
    if (products[i].status == true) {
      text += `
        <tr>
          <td>${a}</td>
          <td><div><img style="height: 150px; width: 100px; object-fit: cover;" src="${products[i].image}" alt=""></div></td>
          <td>${products[i].name}</td>
          <td>${products[i].author}</td>
          <td>${products[i].price}$</td>
          <td>${products[i].stock}</td>
          <td>
              <button onclick="hidenProduct(${products[i].id})" style="background-color: rgb(238, 65, 65); ">Delete</button>
          </td>
        </tr>
        `;
    } else {
      text += `
        <tr>
          <td>${a}</td>
          <td><div><img style="height: 150px; width: 100px; object-fit: cover;" src="${products[i].image}" alt=""></div></td>
          <td>${products[i].name}</td>
          <td>${products[i].author}</td>
          <td>${products[i].price}$</td>
          <td>${products[i].stock}</td>
          <td>
            <button onclick="displayProduct(${products[i].id})" style="background-color: rgb(47, 211, 47);">Remove</button>
          </td>
        </tr>
        `;
    }
  }
  document.getElementById("renderProducts").innerHTML = text;
}

// Thêm sách
function addBook() {
  let productList = JSON.parse(localStorage.getItem("productList"));
  console.log(productList);

  // let idBook = document.getElementById("idBook");
  let imgBook = document.getElementById("imgBook");
  let nameBook = document.getElementById("nameBook");
  let categoryBook = document.getElementById("categoryBook");
  let authorBook = document.getElementById("authorBook");
  let publisherBook = document.getElementById("publisherBook");
  let priceBook = document.getElementById("priceBook");
  let stockBook = document.getElementById("stockBook");
  // let statusBook = document.getElementById("statusBook");
  let saleBook = document.getElementById("saleBook");
  let descriptionBook = document.getElementById("descriptionBook");

  let directory = imgBook.value;
  // let statusNewbook;

  // if (statusBook.value == "true") {
  //   statusNewbook = true;
  // } else {
  //   statusNewbook = false;
  // }

  let idNewBook = 0;

  for (let i = 0; i < productList.length; i++) {
    idNewBook = productList[i].id;
  }
  let newBook = {
    id: idNewBook + 1,
    image: [`${"../assets/" + directory.split(`\\`).pop()}`],
    name: `${nameBook.value}`,
    category: +categoryBook.value,
    author: `${authorBook.value}`,
    publisher: `${publisherBook.value}`,
    price: +priceBook.value,
    stock: +stockBook.value,
    status: true,
    sale: saleBook.value,
    description: `${descriptionBook.value}`,
  };
  productList.push(newBook);
  localStorage.setItem("productList", JSON.stringify(productList));
  renderProduct();

  imgBook.value = "";
  nameBook.value = " ";
  categoryBook.value = " ";
  authorBook.value = " ";
  publisherBook.value = " ";
  priceBook.value = " ";
  stockBook.value = " ";
  statusBook.value = " ";
  saleBook.value = " ";
  descriptionBook.value = " ";
}

// Đóng table addBook
function closeBook() {
  document.getElementById("table-addBook").style.display = "none";
  document.getElementById("table-addBook-1").style.display = "block";
}

// Thêm sách trong Category
function addCategory() {
  let categoryList = JSON.parse(localStorage.getItem("categoryList"));

  let imgCategory = document.getElementById("imgCategory");
  let nameCategory = document.getElementById("nameCategory");
  let statusCategory = document.getElementById("statusCategory");
  let descriptionCategory = document.getElementById("descriptionCategory");

  let directory = imgCategory.value;
  // let statusNewcategory;

  // if (statusCategory.value == "true") {
  //   statusNewcategory = true;
  // } else {
  //   statusNewcategory = false;
  // }

  let idNewCategory = 0;

  for (let i = 0; i < categoryList.length; i++) {
    idNewCategory = categoryList[i].id;
  }
  let newCategory = {
    id: idNewCategory + 1,
    image: [`${"../assets/" + directory.split(`\\`).pop()}`],
    name: `${nameCategory.value}`,
    status: true,
    description: `${descriptionCategory.value}`,
  };
  categoryList.push(newCategory);
  localStorage.setItem("categoryList", JSON.stringify(categoryList));
  renderCategory();

  imgBook.value = "";
  nameBook.value = " ";
  statusBook.value = " ";
  descriptionBook.value = " ";
}

// Đóng table addBook
function closeCategory() {
  document.getElementById("table-addCategory").style.display = "none";
  document.getElementById("table-addBook-1").style.display = "block";
}

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

// hiden và display Product
function hidenProduct(idBook) {
  let productList = JSON.parse(localStorage.getItem("productList"));
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id == idBook) {
      productList[i].status = false;
      localStorage.setItem("productList", JSON.stringify(productList));
      renderProduct();
      break;
    }
  }
}

function displayProduct(idBook) {
  let productList = JSON.parse(localStorage.getItem("productList"));
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id == idBook) {
      productList[i].status = true;
      localStorage.setItem("productList", JSON.stringify(productList));
      renderProduct();
      break;
    }
  }
}

// hiden và display Categorry
function hidenCategory(idBook) {
  let productList = JSON.parse(localStorage.getItem("productList"));
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id == idBook) {
      productList[i].status = false;
      localStorage.setItem("productList", JSON.stringify(productList));
      renderCategory();
      break;
    }
  }
}

function displayCategory(idBook) {
  let productList = JSON.parse(localStorage.getItem("productList"));
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id == idBook) {
      productList[i].status = true;
      localStorage.setItem("productList", JSON.stringify(productList));
      renderCategory();
      break;
    }
  }
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
