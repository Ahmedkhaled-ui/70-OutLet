let products = JSON.parse(localStorage.getItem("product"));

function display() {
  let cartona = "";
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    if (element.found == "فاتح") {
      let felter = products.filter(
        (element) => element.found && element.found.includes("فاتح")
      );
      let sum = felter.reduce((total, element) => {
        let price = parseFloat(element.priceSalle);
        return total + price;
      }, 0);
      let index = felter.length;

      document.getElementById("numItem").innerHTML = ` <div>
      
      <h1 class=" fs-6"> عدد المنتجات : <span class="text-success fw-bolder"> ${index}   </span> 
       <h2 class=" fs-6"> المديونية لدي فاتح : <span class="text-danger fw-bolder"> ${sum} </span>
       
       </h2>
        </h1>
      </div> `;

      cartona += `
        <div class="col-sm-4 mx-auto col-small p-1">
                 <div>
                   <div class="card">
                     <img
                                       class="settingPhoto"
                       src="${element.image} "
                       class="card-img-top w-100"
                       alt="adidas" />
                     <div class="card-body text-end">
                       <h5 class="card-title fs-6">${element.name}</h5>
                       <p class="card-text my-0 py-0">السعر: ${element.priceSalle}</p>
           <button onclick="sale(${i})"   class="btn btn-success px-4"> بيع نهائي</button>

                       </div>

                   </div>
                 </div>
               </div>
       `;
      document.getElementById("show").innerHTML = cartona;
    }
  }
}

display();
function sale(index) {
  Swal.fire({
    title: "هل تريد بيع المنتج؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم اريد",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "تم بيع المنتج",
        icon: "success",
      });
      products.splice(index, 1);
      localStorage.setItem("product", JSON.stringify(products));
      display();
    }
  });
}
