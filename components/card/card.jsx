import { Children } from "react"
import styles from "./card.module.css"

export const Card = ({Header, body}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{Header}</h2>
      <p className={styles.body}>{body}</p>
    </div>
  )
}
