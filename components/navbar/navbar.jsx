// import { Button } from "../button/button";
import Link from "next/link";
import { ContactButton } from "../contactbutton/contactbutton";
import styles from "./navbar.module.css"
import Image from "next/image";

const Navbar = () => {
  return (
    <div className={styles.container}>
        <Image src="/public/logo.png" alt="Logo" width={30} height={30} className={styles.img}/>
        <ul className={styles.list}>
            <Link href="#" className={styles.links} >
                <li className={styles.comp}>Home</li>
            </Link>
            <Link href="#" className={styles.links}>
                <li className={styles.comp}>Skills</li>
            </Link>
            <Link href="#" className={styles.links}>
                <li className={styles.comp}>Projects</li>
            </Link>
            <Link href="#" className={styles.links}>
                <li className={styles.comp}>About</li>
            </Link>
            <Link href="#" className={styles.links}>
                <li className={styles.comp}>Blogs</li>
            </Link>
            <Link href="#" className={styles.links}>
                <li className={styles.comp}>Review</li>
            </Link>
        </ul>
        <ContactButton text="Contact Me"/>
    </div>
  )
}

export default Navbar;