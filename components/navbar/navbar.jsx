// import { Button } from "../button/button";
import Link from "next/link";
import { ContactButton } from "../contactbutton/contactbutton";
import styles from "./navbar.module.css"
import Image from "next/image";

const Navbar = ({mainComp}) => {
  return (
    <div className={styles.container}>
        <Image src="/next.svg" alt="Logo" width={100} height={30} className={styles.img}/>
        <ul className={styles.list}>
            <div className={styles.underline}>
                <Link href="/" className={styles.links} >
                    <li className={styles.comp}>Home</li>
                </Link>
            </div>
            <div className={styles.underline}>
                <Link href="/" className={styles.links} >
                    <li className={styles.comp}>Skill</li>
                </Link>
            </div>
            <div className={styles.underline}>
                <Link href="/" className={styles.links} >
                    <li className={styles.comp}>Projects</li>
                </Link>
            </div>
            <div className={styles.underline}>
                <Link href="/" className={styles.links} >
                    <li className={styles.comp}>About</li>
                </Link>
            </div>
            <div className={styles.underline}>
                <Link href="/" className={styles.links} >
                    <li className={styles.comp}>Blog</li>
                </Link>
            </div>
            <div className={styles.underline}>
                <Link href="/" className={styles.links} >
                    <li className={styles.comp}>Reviews</li>
                </Link>
            </div>

        </ul>
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