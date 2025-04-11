import { orbitron } from "../fonts/font"
import styles from "./contactbutton.module.css" 
import Link from "next/link"

 export const ContactButton = ({text}) => {
   return (
     <div className={`${styles.components}`}>
        <Link href={`/${text}`}>
            <button className={`${styles.button} ${orbitron.className}`}>{text}</button>
        </Link>
     </div>
   )
 }
 