let products = JSON.parse(localStorage.getItem("product"));
const conferm = document.querySelector("#conferm");
const fateh = document.querySelector("#fateh");
const carem = document.querySelector("#carem");
const other = document.querySelector("#other");
const closee = document.querySelector("#close");
const load = document.querySelector("#load");
let myIndex;
function display() {
  let cartona = "";
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    if (element.found == "متاح") {
      cartona += `
  <div class="col-sm-4 mx-auto col-small p-1  ">
    <div>
      <div class="card">
        <img
        class="settingPhoto"
          src="${element.image}"
          class="card-img-top w-100"
          alt="adidas" />
        <div class="card-body settingCard text-end">
        <h1 class="card-title fs-5 text-center ">${element.name}</h1>
            <div class=" d-flex justify-content-between align-items-center" >
                                 <button onclick="sale(${i}) "   class="btn btn-success  px-3">بيع</button>

            <div>
            <p class="card-text my-0 py-0">السعر: ${element.priceSalle}</p>
               <p class="card-text my-0 py-0 ">متواجد: ${element.found} </p>

            </div>

            </div>
                                 
            </div>
      </div>
    </div>
  </div>

`;
    }
    document.getElementById("show").innerHTML = cartona;
  }
}
display();

function sale(index) {
  myIndex = index;
  conferm.classList.remove("d-none");
}
closee.addEventListener("click", (myIndex) => {
  conferm.classList.add("d-none");
});
fateh.addEventListener("click", () => {
  Swal.fire({
    title: "هل تريد بيع المنتج لفاتح؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم اريد",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: " تم بيع المنتج لفاتح",
        icon: "success",
      });
      products[myIndex].found = "فاتح";
      localStorage.setItem("product", JSON.stringify(products));
      conferm.classList.add("d-none");
      display();
    }
  });
});
carem.addEventListener("click", () => {
  Swal.fire({
    title: "هل تريد بيع المنتج لكريم؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم اريد",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: " تم بيع المنتج لكريم",
        icon: "success",
      });
      products[myIndex].found = "كريم";
      localStorage.setItem("product", JSON.stringify(products));
      conferm.classList.add("d-none");
      display();
    }
  });
});
other.addEventListener("click", () => {
  Swal.fire({
    title: "هل تريد بيع المنتج ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "تم بيع المنتج",
        icon: "success",
      });
      products.splice(myIndex, 1);
      localStorage.setItem("product", JSON.stringify(products));
      conferm.classList.add("d-none");
      display();
    }
  });
});
