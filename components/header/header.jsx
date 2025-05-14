import styles from "./header.module.css"

const Header = () => {
  return (
    <div className={styles.container}>
        <h1 className={`${styles.title} ${styles.anime}`}>Hello</h1>
        <h1 className={`${styles.subtitle} ${styles.anime}`}>This is Souvikarjun</h1>
    </div>
  )
}

export default Header