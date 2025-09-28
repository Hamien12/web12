// format giá tiền
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

renderProduct();
let flag = 0;
let bookID = 0;

// render Products
function renderProduct() {
  document.getElementById("table-addBook").style.display = "none";
  document.getElementById("table-addBook-1").style.display = "block";
  document.getElementById("table-products").style.display = "block";
  document.getElementById("li-product").style.backgroundColor =
    "rgb(85, 67, 208)";
  document.getElementById("li-category").style.backgroundColor = "black";
  document.getElementById("li-users").style.backgroundColor = "black";
  document.getElementById("li-logout").style.backgroundColor = "black";
  document.getElementById("li-order").style.backgroundColor = "black";

  let products = JSON.parse(localStorage.getItem("productList"));

  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      if (products[i].name > products[j].name) {
        let temp = products[i];
        products[i] = products[j];
        products[j] = temp;
      }
    }
  }

  let a = 0;
  text = ``;
  for (let i = 0; i < products.length; i++) {
    a++;
    if (products[i].status == true) {
      text += `
          <tr>
            <td>${a}</td>
            <td><div><img style="height: 150px; width: 100px; object-fit: cover;" src="${
              products[i].image
            }" alt=""></div></td>
            <td>${products[i].name}</td>
            <td>${products[i].author}</td>
            <td>${formatter.format(products[i].price)}</td>
            <td>${products[i].stock}</td>
            <td>
                <button onclick="hidenProduct(${
                  products[i].id
                })" style="background-color: rgb(238, 65, 65); ">Delete</button>
                <button onclick="editProduct(${
                  products[i].id
                })" style="background-color: rgb(75, 152, 241); ">Edit</button>
            </td>
          </tr>
          `;
    } else {
      text += `
          <tr>
            <td>${a}</td>
            <td><div><img style="height: 150px; width: 100px; object-fit: cover;" src="${
              products[i].image
            }" alt=""></div></td>
            <td>${products[i].name}</td>
            <td>${products[i].author}</td>
            <td>${formatter.format(products[i].price)}$</td>
            <td>${products[i].stock}</td>
            <td>
              <button onclick="displayProduct(${
                products[i].id
              })" style="background-color: rgb(47, 211, 47);">Remove</button>
              <button onclick="editProduct(${
                products[i].id
              })" style="background-color: rgb(75, 152, 241); ">Edit</button>
            </td>
          </tr>
          `;
    }
  }
  document.getElementById("renderProducts").innerHTML = text;
}

// Thêm sách
function addBook(idBook) {
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

  if (flag == 0) {
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
    alert("Thêm sách thành công.");
    localStorage.setItem("productList", JSON.stringify(productList));
    renderProduct();
    imgBook.value = "";
    nameBook.value = " ";
    categoryBook.value = " ";
    authorBook.value = " ";
    priceBook.value = " ";
    stockBook.value = " ";
    // statusBook.value = " ";
    saleBook.value = " ";
    descriptionBook.value = " ";
    publisherBook.value = " ";
  } else if (flag == 1) {
    console.log(bookID);
    let flagg = 0;
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].name === nameBook.value) {
        alert("Vui lòng không nhập trùng tên sách.");
        flagg = 1;
        break;
      }
    }
    if (flagg == 0) {
      for (let i = 0; i < productList.length; i++) {
        if (bookID == productList[i].id) {
          productList[i].image = [
            `${"../assets/" + directory.split(`\\`).pop()}`,
          ];

          productList[i].name = nameBook.value;
          productList[i].category = +categoryBook.value;
          productList[i].author = `${authorBook.value}`;
          productList[i].publisher = `${publisherBook.value}`;
          productList[i].price = +priceBook.value;
          productList[i].stock = +stockBook.value;
          // productList[i].status = statusNewbook;
          productList[i].sale = saleBook.value;
          productList[i].description = `${descriptionBook.value}`;
          console.log(productList[i]);
          localStorage.setItem("productList", JSON.stringify(productList));
          renderProduct();
          break;
        }
      }
    }
  }
  flag = 0;
}

// Hiển thị table add book
function displayAddBook() {
  flag = 0;
  document.getElementById("table-addBook").style.display = "block";
  document.getElementById("table-addBook-1").style.display = "none";
  document.getElementById("btnAddBook").innerHTML = "Add";
  document.getElementById("nameTable").innerHTML = "Add new books";
  // document.getElementById("imgBook").value = " ";
  document.getElementById("nameBook").value = "";
  document.getElementById("categoryBook").value = " ";
  document.getElementById("authorBook").value = " ";
  document.getElementById("priceBook").value = " ";
  document.getElementById("stockBook").value = " ";
  // document.getElementById("statusBook").value = " ";
  document.getElementById("saleBook").value = " ";
  document.getElementById("publisherBook").value = " ";
  document.getElementById("descriptionBook").value = " ";
}
// Đóng table addBook
function closeBook() {
  document.getElementById("table-addBook").style.display = "none";
  document.getElementById("table-addBook-1").style.display = "block";
  document.getElementById("table-editBook").style.display = "none";
  document.getElementById("btnAddBook").innerHTML = "Add";
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

// Edit product
function editProduct(idBook) {
  bookID = idBook;
  let productList = JSON.parse(localStorage.getItem("productList"));

  document.getElementById("table-addBook").style.display = "block";
  document.getElementById("table-addBook-1").style.display = "none";
  document.getElementById("btnAddBook").innerHTML = "Edit";
  document.getElementById("nameTable").innerHTML = "Edit books";
  flag = 1;

  let nameBook = document.getElementById("nameBook");
  let authorBook = document.getElementById("authorBook");
  let priceBook = document.getElementById("priceBook");
  let stockBook = document.getElementById("stockBook");
  let saleBook = document.getElementById("saleBook");
  let descriptionBook = document.getElementById("descriptionBook");
  let publisherBook = document.getElementById("publisherBook");
  // let statusBook = document.getElementById("statusBook");
  let categoryBook = document.getElementById("categoryBook");

  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id == idBook) {
      nameBook.value = productList[i].name;
      authorBook.value = productList[i].author;
      priceBook.value = productList[i].price;
      stockBook.value = productList[i].stock;
      // imgBook.value = productList[i].image;
      saleBook.value = productList[i].sale;
      descriptionBook.value = productList[i].description;
      publisherBook.value = productList[i].publisher;
      // statusBook.value = productList[i].status;
      categoryBook.value = productList[i].category;
      break;
    }
  }
}
