// DEFINE VARIABLES

const removeCartItemButtons = document.getElementsByClassName('btn-danger');

// CartItemContainer wraps all the rows inside of our cart - we only one the very first one because getelementbyclassname returns an array of elements
const cartItemContainer = document.getElementsByClassName("cart-items")[0];
const cartRows = cartItemContainer.getElementsByClassName('cart-row');
let finalTotal = document.getElementsByClassName('cart-total-price')[0];
let total = 0;
let price = 0;
let quantity = 0;



// CALL FUNCTIONS

removeCartItems();


// DEFINE FUNCTIONS

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
    for(let i=0; i< cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        console.log(priceElement, quantityElement);

        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        console.log(price * quantity);
        total = parseFloat(total + (price + quantity));
    //  console.log(total);
    }

    if (!document.body.contains(cartRows[0])){
        finalTotal.innerText = '$' + 0;
    } else{
    finalTotal.innerText = '$' + parseFloat(total.toFixed(2));
    }
}


