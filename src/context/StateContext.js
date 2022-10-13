import {createContext, useContext, useEffect, useState} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {ShoppingCart} from "../components";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", [])

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id) {
        return cartItems.find((item) => item.id === id)?.quantity || 0
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
    function increaseCartQuantity(id){
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

    function decreaseCartQuantity(id) {
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
    function removeFromCart(id) {
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
            value={{getItemQuantity, addToCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartItems, cartQuantity,}}>
            {children}
            {isOpen === true && <ShoppingCart isOpen={isOpen} setIsOpen={setIsOpen}/> }
        </ShoppingCartContext.Provider>
    )
}