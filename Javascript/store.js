// DEFINE VARIABLES

//buttons

let removeCartItemButtons = document.getElementsByClassName('btn-danger');
let quantityInputs = document.getElementsByClassName('cart-quantity-input');
let addToCartButtons = document.getElementsByClassName('shop-item-button');


// CartItemContainer wraps all the rows inside of our cart - we only one the very first one because getelementbyclassname returns an array of elements
let cartItemContainer = document.getElementsByClassName("cart-items")[0];
let cartRows = cartItemContainer.getElementsByClassName('cart-row');
let finalTotalPrice = document.getElementsByClassName('cart-total-price')[0];



// CALL FUNCTIONS

addToCartClicked();
removeCartItems();
updateQuantity();


// DEFINE FUNCTIONS

function updateQuantity(){
    for (let i= 0; i< quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener("change", function(event){
            console.log(input.value);
            if(isNaN(input.value) || input.value <= 0){
                input.value = 1;
            } else {
            updateCartTotal();
            }
        });
    }
}

function removeCartItems(){
    for(let i=0; i< removeCartItemButtons.length; i++){
        let button = removeCartItemButtons[i];
        button.addEventListener('click', function(event){
            let buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            updateCartTotal();
        })
    }
}

function addToCartClicked(){
    for(let i=0; i < addToCartButtons.length; i++){
        let button = addToCartButtons[i];
        button.addEventListener("click",function(){
            let shopItem = button.parentElement.parentElement;
            console.log(shopItem);
            let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
            let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
            let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
            addItemToCart(title, price, imageSrc);
            updateCartTotal();

        })
    }
}

function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems =document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i= 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert("This item has already been added to the cart.");
            return;
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
        </div>` 

    cartRow.innerHTML = cartRowContents; 
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener("click", removeCartItems);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener("change", updateQuantity);

}

function updateCartTotal(){
    let total = 0;
    for(let i=0; i< cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
   //   console.log(priceElement, quantityElement);

        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
   //   console.log(price * quantity);
        total = parseFloat(total + (price * quantity));
      console.log(total);
    }

    if (!document.body.contains(cartRows[0])){
        finalTotalPrice.innerText = '$' + 0;
    } else{
        finalTotalPrice.innerText = '$' + parseFloat(total.toFixed(2));
    }
}



