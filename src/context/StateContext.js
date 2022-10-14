import {createContext, useContext, useEffect, useState} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {ShoppingCart} from "../components";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children,activeCurrency }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)


    const getItemQuantity = (id) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    const getItemSpecs = (id) => {
        return cartItems.find((item) => item.id === id)?.specifications || 0;
    }

    const changeItemSpecs = (id, newSpecs) =>{
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, specifications: newSpecs }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const addToCart = (id, specifications, params, imgGallery, name, brand, prices, options) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                console.log("Added '"+name+"' to the cart!")
                return [...currItems, { id, quantity: 1, specifications, params, imgGallery, name, brand, prices, options }]
            } else {
                return currItems.map((item) => {
                    console.log("Added '"+name+"' to the cart!")
                    if (item.id === id) {
                        if((JSON.stringify(item.specifications) === JSON.stringify(specifications))){
                            return { ...item, quantity: item.quantity + 1, specifications, params, imgGallery, name, brand, prices, options }
                        }else{
                            return [...currItems, { id, quantity: 1, specifications, params, imgGallery, name, brand, prices, options }]
                        }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const increaseCartQuantity = (id) =>{
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id)
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const removeFromCart = (id) => {
        setCartItems((currItems) => {
            return currItems.filter(item => item.id !== id)
        })
    }
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <ShoppingCartContext.Provider
            value={{getItemQuantity, changeItemSpecs, addToCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart,
                openCart, closeCart, cartItems, cartQuantity, getItemSpecs}}>
            {children}
            {isOpen === true && <ShoppingCart isOpen={isOpen} setIsOpen={setIsOpen} activeCurrency={activeCurrency}/> }
        </ShoppingCartContext.Provider>
    )
}