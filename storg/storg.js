let products = JSON.parse(localStorage.getItem("product"));
console.log(products);

function display() {
  let cartona = "";
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    if (element.found == "متاح") {
      let felter = products.filter(
        (element) => element.found && element.found.includes("متاح")
      );
      let sum = felter.reduce((total, element) => {
        let price = parseFloat(element.priceSalle);
        return total + price;
      }, 0);
      let index = felter.length;

      document.getElementById("numItem").innerHTML = ` <div>
      
      <h1 class=" fs-6"> عدد المنتجات : <span class="text-success fw-bolder"> ${index}   </span> 
       <h2 class=" fs-6"> رصيد المال في المخزن: <span class="text-danger fw-bolder"> ${sum} </span>
       
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
                     <div class="card-body settingCard text-end">
                       <h1 class="card-title fs-5">${element.name}</h1>
                       <p class="card-text my-0 py-0">السعر: ${element.priceSalle}</p>
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
