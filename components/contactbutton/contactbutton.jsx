import { orbitron } from "../fonts/font"
import styles from "./contactbutton.module.css" 
import Link from "next/link"

 export const ContactButton = ({text, className}) => {
   var linktext = text.toLowerCase()
   return (
     <div className={`${styles.components}`}>
        <Link href={`/${linktext}`}>
            <button className={`${styles.button} ${orbitron.className}  ${className}`}>{text}</button>
        </Link>
     </div>
   )
 }
 