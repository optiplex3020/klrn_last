export const CartReducer = (state, action) => {

    const {shoppingCart, totalPrice, totalQty} = state;
    
    let item;
    let index;
    let updatedPrice;
    let updatedQty;

    
    switch (action.type) {
        case 'ADD_TO_CART':
    
        const check = shoppingCart.find(item => item.ItemID === action.id);
            if (check) {
                console.log('Ce produit est déja dans votre panier.');
                return state;
            } else {
                item = action.item; 
                item['qty'] = 1;
                item['TotalItemPrice'] = item.ItemPrice * item.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + item.ItemPrice
                return {
                    shoppingCart: [item, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            break;
        
            case 'INC':
                product = action.cart;
                product.qty = ++product.qty;
                product.TotalProductPrice = product.qty * product.ProductPrice;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.ProductPrice;
                index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                shoppingCart[index] = product;
                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
                break;
    
            case 'DEC':
                product = action.cart;
                if (product.qty > 1) {
                    product.qty = product.qty - 1;
                    product.TotalProductPrice = product.qty * product.ProductPrice;
                    updatedPrice = totalPrice - product.ProductPrice;
                    updatedQty = totalQty - 1;
                    index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                    shoppingCart[index] = product;
                    return {
                        shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                    }
                }
                else {
                    return state;
                }
                break;
    
            case 'DELETE':
                const filtered = shoppingCart.filter(product => product.ProductID !== action.id);
                product = action.cart;
                updatedQty = totalQty - product.qty;
                updatedPrice = totalPrice - product.qty * product.ProductPrice;
                return {
                    shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
                }
                break;
    
            case 'EMPTY':
                return {
                    shoppingCart: [], totalPrice: 0, totalQty: 0
                }
    
            default:
                return state;
    
    }
}