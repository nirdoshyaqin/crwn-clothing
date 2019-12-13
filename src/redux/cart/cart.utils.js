export const addItemtoCart = (cartItems, cartItemtoAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemtoAdd.id);

    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === cartItemtoAdd.id
            ? { ...cartItem, quantitiy: cartItem.quantitiy + 1 }
            : cartItem
        )
    }

    return [...cartItems, { ...cartItemtoAdd, quantitiy: 1 }]
}