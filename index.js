const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productSalle = document.querySelector("#productSalle");
const img = document.querySelector("#img");
const btn = document.querySelector("#btn");
const loading = document.querySelector("#loading");
let test;
let products;

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:3000/images");
  const images = await response.json();

  console.log(images);
});

document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        loading.classList.remove("d-none");

        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("رد الخادم:", text);
          throw new Error("فشل الطلب");
        }

        const data = await response.json();
        test = data.url;
        img.value = test;
        loading.classList.add("d-none");
      } catch (error) {}
    }
  });
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
    image: test,
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
