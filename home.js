let products = JSON.parse(localStorage.getItem("product"));
console.log(products);

function display() {
  let cartona = "";
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    cartona += `
       <div class="col-sm-4 mx-auto col-small p-1">
                <div>
                  <div class="card">
                    <img
                                      class="settingPhoto"
                      src="${element.image} "
                      class="card-img-top "
                      alt="adidas" />
                    <div class="card-body settingCard text-end">
                      <h5 class="card-title fs-6 text-center">${element.name}</h5>
                      <div class=" d-flex flex-column gap-1 justify-content-between mb-1">

                       <p class="card-text small my-0 py-0">سعر الجملة :<span class=" text-danger fw-bolder">${element.price} </span>  </p>
                                            <p class="card-text small my-0 py-0">سعر البيع:<span class=" text-success fw-bolder">${element.priceSalle} </span> </p>

                       </div>
                     
                      <p class="card-text my-0 py-0">متواجد: <span class=" text-primary fw-bolder">${element.found} </span>  </p>
                    </div>
                  </div>
                </div>
              </div>
      `;
    document.getElementById("show").innerHTML = cartona;
  }
}
display();
