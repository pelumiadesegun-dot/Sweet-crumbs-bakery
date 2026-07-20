const searchbtn = document.getElementById("searchbtn");
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".product-card");
const message = document.createElement("p");
message.textContent ="No product found";
message.style.color  = "black";
message.style.textAlign = "center";


searchbtn.addEventListener("click", event =>{
   const searchValue = searchInput.value.toLowerCase();
   let found = false;
    cards.forEach(card => {
       const menu = card.querySelector(".card-title").textContent.toLowerCase();
       const category = card.dataset.category.toLowerCase();
        
       const column = card.closest(".col-12");
       if(menu.includes(searchValue) || category.includes(searchValue) ){
         column.style.display ="";
         found = true;
       }
       else{
         column.style.display ="none";
       }
      
    });
     if(!found){
         document.querySelector("main").append(message);
       }else{
         message.remove();
       }

});

 const sizeSelectors = document.querySelectorAll(".size");

 sizeSelectors.forEach(size =>{
    size.addEventListener("change", event =>{
         const modalBody = event.target.closest(".modal-body");
         const newPrice = Number(event.target.value) ;
         const price = modalBody.querySelector(".price");
         price.textContent ="₦" + Number(event.target.value).toLocaleString();
         if(currentCartBox){
            const cartPrice = currentCartBox.querySelector(".cart-price");
             cartPrice.textContent = "₦" + newPrice.toLocaleString();

            updateTotalPrice();
         }
    });
 });

        
const offcanvasBody = document.querySelector(".offcanvas-body");
const addCartButtons = document.querySelectorAll(".add-cart");
const total = document.querySelector(".total");
  let currentCartBox = null;

addCartButtons.forEach( button =>{
  button.addEventListener("click",event =>{
        event.preventDefault();
   const productCard = event.target.closest(".product-card");
   const modalBody = event.target.closest(".modal-body");
   addToCart(productCard,modalBody);

});
});
  

const addToCart = (productCard, modalBody) =>{
    const productImgSrc = productCard.querySelector("img").src;
    const productTitle = productCard.querySelector(".card-title").textContent;
    let productPrice;
       if(modalBody){
        productPrice = Number(modalBody
                              .querySelector(".price")
                              .textContent
                              .replace(/[^0-9.]/g, ""));
    }
    else{
        productPrice = Number(  productCard
        .querySelector(".price")
        .textContent
        .replace(/[^0-9.]/g, ""))
    }
    
   const ViewDetails = productCard.querySelector("[data-bs-toggle='modal']");
   ViewDetails.forEach
    const modalTarget = productCard.querySelector("[data-bs-toggle='modal']").dataset.bsTarget;

    const cartItems = document.querySelectorAll(".cart-title");
    for(let item of cartItems){
        if(item.textContent === productTitle){
            alert("This item is already in the cart");
            return;
        }
    }
    const cartBox = document.createElement("div");
      cartBox.classList.add("cart-body");
      cartBox.innerHTML =`
             <img src="${productImgSrc}" alt="cake" class="cart-img">
              <div class="cart-details">
             <h3 class="cart-title ">${productTitle}</h3>
                        <p class="cart-price">₦${productPrice.toLocaleString()}</p>
                        
                        <button type="button" 
                                class="cart-btn" 
                                data-bs-toggle="modal" 
                                data-bs-target="${modalTarget}">
                            View details
                        </button>
                        <div class="cart-footer">
                        <div class="cart-quantity">
                            <button class="decrement">-</button>
                            <span class="number">1</span>
                            <button class="increment">+</button>
                        </div>
                        <i class="fa-solid fa-trash-can cart-remove"></i>
                        </div>
              </div>
      `;
       offcanvasBody.insertBefore(cartBox,total);
       const viewDetailsBtn = cartBox.querySelector(".cart-btn");
        viewDetailsBtn.addEventListener("click", ()=>{
               currentCartBox = cartBox;
        });

   const removeBtn= cartBox.querySelector(".cart-remove");
      removeBtn.addEventListener("click" ,event =>{
        cartBox.remove();
         updateTotalPrice();
         cartCountUpdate();
      });
      const increaseBtn = cartBox.querySelector(".increment");
      const decreaseBtn = cartBox.querySelector(".decrement");
      const number = cartBox.querySelector(".number");
      increaseBtn.addEventListener("click", () =>{
         let quantity = Number(number.textContent);
         quantity++;
         number.textContent = quantity
         updateTotalPrice();
         cartCountUpdate();
      });
      decreaseBtn.addEventListener("click",  event=>{
       let quantity = Number(number.textContent);

       if(quantity > 1){
        quantity--;
        number.textContent = quantity;
       }
       updateTotalPrice();
       cartCountUpdate();
      });
      updateTotalPrice();
      cartCountUpdate();

      const modalElement = document.querySelector(modalTarget);
      const modal = bootstrap.Modal.getInstance(modalElement);
      if(modal){
        modal.hide();
      }

};

const updateTotalPrice = () =>{
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = document.querySelectorAll(".cart-body");
    
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        const PriceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = Number(PriceElement.textContent.replace(/[^0-9.]/g, ""));
        const quantity = Number( quantityElement.textContent);
        total += price* quantity;
    });
    totalPriceElement.textContent=`₦${total.toLocaleString()}`;
    
}
const cartCounts = document.querySelectorAll(".cart-count");

const cartCountUpdate =() =>{
    const quantityElements = document.querySelectorAll(".number");
    let totalQuantity = 0;
quantityElements.forEach( quantity =>{
    totalQuantity += Number(quantity.textContent);
});
cartCounts.forEach(count =>{
    count.textContent=totalQuantity;
});
}


const buyNowButton = document.querySelector(".btn-buy");

buyNowButton.addEventListener("click", event =>{
    const cartBoxes = document.querySelectorAll(".cart-body");
    if(cartBoxes.length === 0)
    {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
}
cartBoxes.forEach(cartBox => cartBox.remove());
cartCountUpdate();

updateTotalPrice();
alert("Thank you for purchasing");
});
 

