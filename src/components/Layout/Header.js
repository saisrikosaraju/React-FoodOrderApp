import {Fragment} from "react";
import HeaderCartButton from "./HeaderCartButton";
import Image from "../../assets/food.jpg";
import styles from "./Header.module.css";

const Header = (props)=>{
    return <Fragment>
        <header className={styles.header}>
            <h1> Welcome to Deli Restaurent </h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={styles["main-image"]}>
            <img src={Image} alt="Food Buffet"/>
        </div>

    </Fragment>

};

export default Header;
