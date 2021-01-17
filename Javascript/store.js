// DEFINE VARIABLES

const removeCartItemButtons = document.getElementsByClassName('btn-danger');

// CartItemContainer wraps all the rows inside of our cart - we only one the very first one because getelementbyclassname returns an array of elements
const cartItemContainer = document.getElementsByClassName("cart-items")[0];
const cartRows = cartItemContainer.getElementsByClassName('cart-row');
let finalTotalPrice = document.getElementsByClassName('cart-total-price')[0];
let quantityInputs = document.getElementsByClassName('cart-quantity-input');



// CALL FUNCTIONS

removeCartItems();
updateQuantity();


// DEFINE FUNCTIONS

function updateQuantity(){
    for (let i= 0; i< quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener("change", function(event){
            let input = event.target;
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
    console.log(cartItemContainer);
    for(let i=0; i< removeCartItemButtons.length; i++){
        let button = removeCartItemButtons[i];
        button.addEventListener('click', function(event){
            let buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            updateCartTotal();
        })
    }
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



