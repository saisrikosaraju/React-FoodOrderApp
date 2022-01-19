import React from "react";
import styles from "./Input.module.css";

// since input is a custom component we need to wrap it with forwardref to be able to use the ref 
const Input =React.forwardRef((props,ref) =>{

    return (
        <div className={styles.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}/>
        </div>
    )
});
export default Input;
