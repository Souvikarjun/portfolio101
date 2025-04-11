import styles from "./button.module.css" 
import Link from "next/link"

 export const Button = ({text}) => {
   return (
     <div className={styles.container}>
        <Link href={`/${text}`}>
            <button className={styles.button}>{text}</button>
        </Link>
     </div>
   )
 }
 