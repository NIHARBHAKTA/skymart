import { createContext, useEffect, useState } from "react";


export let Mystore = createContext()


export const ContextProvider = ({ children }) => {

    const [productsData, setProductsData] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState([]);


    //Logic to add products to the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const isItemInCart = prevCart.find((item) => item.id === product.id);

            if (isItemInCart) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity: 1 }];
        });

        setIsCartOpen(true);
    };


    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };


    const decrementQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };


    //clear cart logic
    const clearCart = () => {
        setCart([]);
    };

    // Calculate total price dynamically
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


    //calling API
    let getData = async () => {
        let fetchData = await fetch('https://dummyjson.com/products')

        let data = await fetchData.json()
        // console.log(data.products)
        setProductsData(data.products)

    }

    useEffect(() => {
        getData()

    }, [])


    return (
        <Mystore.Provider value={{ productsData, setProductsData, isCartOpen, setIsCartOpen, cart, addToCart, removeFromCart, decrementQuantity, totalPrice , clearCart }}>
            {children}
        </Mystore.Provider>

    )
}


