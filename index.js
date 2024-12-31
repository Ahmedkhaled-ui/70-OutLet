const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productSalle = document.querySelector("#productSalle");
const img = document.querySelector("#img");
const btn = document.querySelector("#btn");
let products;
if (localStorage.getItem("product") == null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("product"));
}
function getProduct() {
  let productlist = {
    name: productName.value,
    price: productPrice.value,
    priceSalle: productSalle.value,
    image: img.value,
    found: "متاح",
  };
  products.push(productlist);
  localStorage.setItem("product", JSON.stringify(products));
  console.log(productlist);
  console.log(products);

  clear();
}

function clear() {
  productName.value = null;
  productPrice.value = null;
  productSalle.value = null;
  img.value = null;
}

btn.addEventListener("click", () => {
  if (
    productName.value &&
    productPrice.value &&
    productSalle.value &&
    img.value
  ) {
    getProduct();
    Swal.fire({
      title: "تم اضافة المنتج الي المخزن بنجاح",
      icon: "success",
      draggable: true,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: " من فضلك ادخل المعلومات المطلوبة",
    });
  }
});
