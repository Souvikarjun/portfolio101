// import { Button } from "../button/button";
import Link from "next/link";
import Navigation from "./navigation";
import { ContactButton } from "../contactbutton/contactbutton";
import styles from "./navbar.module.css"
import Image from "next/image";

// const menuItem = ["Home", "Skill", "Projects", "About", "Blog", "Reviews"]

const Navbar = ({mainComp}) => {
    // console.log(menuItem)
  return (
    <div className={styles.container}>
        <Image src="/next.svg" alt="Logo" width={100} height={30} className={styles.img}/>
        <Navigation/>
        <div className={styles.buttons}> 
            <ContactButton text={mainComp}/>
            <ContactButton text="Contact Me"/>
        </div>

    </div>
  )
}

export default Navbar;

const scroll = (el) => {
  const scroll = document.querySelector(el)
  window.addEventListener('scroll', ()=>{
    if (window.scrollY > 30) {
        scroll.classList.add()
    }
  })
}