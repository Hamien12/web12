// console.log(window.location.href.split("?")[1].split("=")[1])
let id = window.location.href.split("?")[1].split("=")[1];

// format giá tiền
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let productList = JSON.parse(localStorage.getItem("productList"));

let product = productList.find(function (e, i) {
  return e.id === +id;
});

let title = document.getElementById("title");
let description = document.getElementById("description");
let price = document.getElementById("price");
let image = document.getElementById("image");
let author = document.getElementById("author");
let publisher = document.getElementById("publisher");

console.log(product);
image.src = product.image;

function render() {
  let text = ``;
  text += `
  <h4 id="title">${product.name}</h4>
  <p id="authorMedia" >
      <span><b>Author</b>: </span><span id="author">${product.author}</span>.
      <p></p>
      <span><b>Publisher</b>: </span><span id="publisher">${
        product.publisher
      }</span>.
  </p>
  <p><b>Description</b>: <span id="description">${
    product.description
  }</span></p>
  <p><b>Price</b>: <span style="color: red;" id="price">${formatter.format(
    product.price
  )}</span></p >
  <p><button type="submit" class="btn btn-primary" onclick="addToCart(${
    product.id
  })">Add to cart</button></p>
  `;
  document.getElementById("body-detail").innerHTML = text;
}
render();

// title.innerHTML = product.name;
// description.innerHTML = product.description;
// price.innerHTML = product.price;
// author.innerHTML = product.author;
// publisher.innerHTML = product.publisher;

// Mua hàng
function addToCart(productId) {
  // Khi đăng nhập mới cho mua.
  console.log(productId);
  let checkLogin = JSON.parse(localStorage.getItem("checkLogin"));
  if (checkLogin == null) {
    alert("Bạn cần phải đăng nhập mới được mua hàng.");
    window.location.href = "../pages/login.html";
    return;
  } else {
    // console.log("Đã thành công");
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      if (checkLogin == users[i].userID) {
        // console.log("1111", users[i].Cart);
        if (users[i].status == true) {
          let product = JSON.parse(localStorage.getItem("productList"));
          for (let j = 0; j < product.length; j++) {
            if (productId == product[j].id) {
              // lấy thông tin sản phẩm
              console.log("1111", product[j]);
              console.log("giỏ hàng của user sẽ là ", users[i].Cart);
              // let a={...product[j],quantity:1}
              /* 
                          trước khi thêm vào phải xem trong giỏ hàng có sản phẩm đó chưa
                          có rồi thì tăng số lượng còn chưa có thì thêm vào bt
                      */
              // kiểm tra xem trong giỏ hàng có tồn tại sản phẩm đó chưa
              // duyệt giỏ hàng
              let index = users[i].Cart.findIndex((item, index) => {
                return item.id == productId;
              });
              if (index == -1) {
                //tức là không có thêm bình thường
                alert("Thêm vào giỏ hàng thành công.");
                console.log("chưa có ");
                users[i].Cart.push({ ...product[j], quantity: 1 });
                localStorage.setItem("users", JSON.stringify(users));
                showQuantityCart();
              } else {
                //có rồi đi tăng số lượng
                // mình phải biết vị trí của cái cần tăng
                alert("Sách đã có trong giỏ hàng.");
                // users[i].Cart[index].quantity = ++users[i].Cart[index].quantity;
                localStorage.setItem("users", JSON.stringify(users));
              }
            }
          }
        } else {
          alert("Tài khoản của bạn đã bị khóa.");
          break;
        }
      }
    }
  }
}

// function hiển thị số lượng sản phẩm
function showQuantityCart() {
  // lấy giỏ hàng ra.length là được
  let checkLogin = JSON.parse(localStorage.getItem("checkLogin"));
  let users = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < users.length; i++) {
    if (users[i].userID == checkLogin) {
      console.log(users[i].cart);
      document.getElementsByClassName("itemInCart")[0].innerHTML =
        users[i].Cart.length;
    }
  }
}
showQuantityCart();
