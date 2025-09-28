// render Category
function renderCategory() {
  document.getElementById("li-users").style.backgroundColor = "black";
  document.getElementById("li-product").style.backgroundColor = "black";
  document.getElementById("li-order").style.backgroundColor = "black";
  document.getElementById("li-logout").style.backgroundColor = "black";
  document.getElementById("li-category").style.backgroundColor =
    "rgb(85, 67, 208)";
  document.getElementById("table-category").style.display = "block";
  document.getElementById("table-addCategory").style.display = "block";

  let categoryList = JSON.parse(localStorage.getItem("categoryList"));

  let text = ``;
  let a = 0;
  for (let i = 0; i < categoryList.length; i++) {
    a++;
    if(categoryList[i].status == true){
      text += `
              <tr>
                <td>${a}</td>
                <td>${categoryList[i].id}</td>
                <td>${categoryList[i].name}</td>
                <td>
                    <button onclick="hidenCategory(${categoryList[i].id})" style="background-color: rgb(238, 65, 65); ">Delete</button>
                </td>
              </tr>
              `;
    }else{
      text += `
              <tr>
                <td>${a}</td>
                <td>${categoryList[i].id}</td>
                <td>${categoryList[i].name}</td>
                <td>
                    <button onclick="displayCategory(${categoryList[i].id})" style="background-color: rgb(47, 211, 47);">Remove</button>
                </td>
              </tr>
              `;
    }
    
    document.getElementById("renderCategory").innerHTML = text;
  }
}
renderCategory();

// Thêm sách trong Category
function addCategory() {
  let categoryList = JSON.parse(localStorage.getItem("categoryList"));

  let imgCategory = document.getElementById("imgCategory");
  let nameCategory = document.getElementById("nameCategory");
  let descriptionCategory = document.getElementById("descriptionCategory");

  let directory = imgCategory.value;

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
  descriptionBook.value = " ";
}

// Đóng table addCategory
function closeCategory() {
  document.getElementById("table-addCategory").style.display = "none";
  document.getElementById("btn-addcategory").style.display = "block";
}

// Mở table addCategory
function btnAddCategory() {
  document.getElementById("table-addCategory").style.display = "block";
  document.getElementById("btn-addcategory").style.display = "none";
}

// hiden và display Categorry
function hidenCategory(idCategory) {
  let categoryList = JSON.parse(localStorage.getItem("categoryList"));
  for (let i = 0; i < categoryList.length; i++) {
    if (categoryList[i].id == idCategory) {
      categoryList[i].status = false;
      localStorage.setItem("categoryList", JSON.stringify(categoryList));
      renderCategory();
      break;
    }
  }
}

function displayCategory(idCategory) {
  let categoryList = JSON.parse(localStorage.getItem("categoryList"));
  for (let i = 0; i < categoryList.length; i++) {
    if (categoryList[i].id == idCategory) {
      categoryList[i].status = true;
      localStorage.setItem("categoryList", JSON.stringify(categoryList));
      renderCategory();
      break;
    }
  }
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