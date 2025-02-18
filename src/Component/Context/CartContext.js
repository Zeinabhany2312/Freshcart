import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export function CartContextProvider({ children }) {

    let [numsItem, setItemNum] = useState()

    function getUserCart() {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', options)
    }
    async function addCart(productID) {
        let body = {
            productId: productID
        }
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', body, options)

    }
    async function removeCart(id) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, options)
    }
    async function clearCart() {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, options)
    }
    function updateCart(id, count) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body, options)
    }
    function checkoutPayment(id, data) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            shippingAddress: data
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, body, options)
    }
    return <CartContext.Provider value={{ addCart, numsItem, setItemNum, getUserCart, clearCart, removeCart, updateCart,checkoutPayment }}>
        {children}
    </CartContext.Provider>
}