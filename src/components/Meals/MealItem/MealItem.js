import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import styles from "./MealItem.module.css";
import CartContext from "../../../store/CartContext";

const MealItem =(props)=>{
    const cartCtx = useContext(CartContext);

    const price = `${props.price.toFixed(2)}SEK`;
    
    //function from mealform.js
    //it uses the cart context and pass the item to the additem() defined in context provider to add it to cart

    const addToCartHandler = (amount)=>{
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount
        })
    };

    return(
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart = {addToCartHandler}/>
            </div>
        </li>
    )};
export default MealItem;
