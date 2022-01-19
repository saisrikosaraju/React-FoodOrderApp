import { useContext,useState,Fragment } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/CartContext";
import Checkout from "./Checkout";
import styles from "./Cart.module.css";

const Cart =(props)=>{

    const[isCheckout,setIsCheckout]= useState(false);
    const [isSubmitting,setIsSubmitting]= useState(false);
    const [didSubmit,setDidSubmit]= useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}SEK`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item)=>{
        cartCtx.addItem({...item,amount:1});
    };

    const cartItemRemoveHandler = (id)=>{
        cartCtx.removeItem(id);
    };

    const orderHandler= ()=>{
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData)=>{
       setIsSubmitting(true);
       await fetch("https://food-500c1-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {method:"POST",
         body: JSON.stringify({
             user: userData,
             orderedItems:cartCtx.items
         })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }
    
    //output the cart items using cartctx
    
    const cartItems = (<ul className={styles["cart-items"]}>{cartCtx.items.map(
        (item)=>(<CartItem
             key={item.id} 
             name={item.name}
             amount={item.amount}
             price={item.price}
             onRemove={cartItemRemoveHandler.bind(null,item.id)}
             onAdd={cartItemAddHandler.bind(null,item)}/>
             ))}</ul>);

    const modalActions = <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}> 
        Close 
        </button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>
            Order
            </button>}
    </div>

    const cartModalContent = <Fragment>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancle={props.onClose}/>}
        {!isCheckout && modalActions}
    </Fragment>

    const submittingModalContent = <p>Sending order data....</p>

    const didSubmitModalContetnt = <Fragment>
        <p>Your order is successful.</p>
        <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}> 
        Close 
        </button>
    </div>

    </Fragment>

    return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && submittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContetnt}
        
    </Modal>
    )
};
export default Cart;
