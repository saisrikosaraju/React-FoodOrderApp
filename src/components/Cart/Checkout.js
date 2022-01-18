import {useRef,useState} from "react";
import styles from "./Checkout.module.css";

const isEmpty = value => value.trim() === "";
const isFiveChars = value => value.trim().length === 5;

const Checkout =(props)=>{

    const [formInputsValidity,setFormInputsValidity] = useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const submitHandler = (event)=>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalIsValid,
            city: enteredCityIsValid

        })

        const formIsValid = enteredNameIsValid && 
                            enteredStreetIsValid && 
                            enteredPostalIsValid && 
                            enteredCityIsValid;

        if(!formIsValid){
            return;
        }    
        props.onConfirm({
            name:enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        });               
    }

    const nameControlStyles = `${styles.control}
     ${formInputsValidity.name ? "": styles.invalid}`;
     
     const streetControlStyles = `${styles.control}
     ${formInputsValidity.street ? "": styles.invalid}`;
     
     const postalControlStyles = `${styles.control}
     ${formInputsValidity.postalCode ? "": styles.invalid}`;
     
     const cityControlStyles = `${styles.control}
     ${formInputsValidity.city ? "": styles.invalid}`;

    return <form onSubmit={submitHandler}>
        <div className={nameControlStyles}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef}></input>
            {!formInputsValidity.name && <p>Please enter a valid name</p>}
        </div>
        <div className={streetControlStyles}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streetInputRef}></input>
            {!formInputsValidity.street && <p>Please enter a valid street</p>}
        </div>
        <div className={postalControlStyles}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalInputRef}></input>
            {!formInputsValidity.postalCode && (<p>Please enter a valid postalcode (5 char long)!</p>)}
        </div>
        <div className={cityControlStyles}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef}></input>
            {!formInputsValidity.city && <p>Please enter a valid city</p>}
        </div>
        <div className={styles.actions}>
        <button type="button" onClick={props.onCancle}>Cancle</button>
        <button className={styles.submit}>Confirm</button>
        </div>
        
    </form>

}
export default Checkout;