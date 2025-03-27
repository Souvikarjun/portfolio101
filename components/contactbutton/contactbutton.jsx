import styles from "./contactbutton.module.css" 
import Link from "next/link"

 export const ContactButton = ({text}) => {
   return (
     <div className={styles.components}>
        <Link href={`/${text}`}>
            <button className={styles.button}>{text}</button>
        </Link>
     </div>
   )
 }
 