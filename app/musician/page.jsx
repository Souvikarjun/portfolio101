import styles from "./musician.module.css"

const Musician = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <div className={styles.maintitle}>
                <h1 className={styles.title}>Hello</h1>
                <h2 className={styles.subtitle}>This is Souvikarjun as Musician</h2>
            </div>
            {/* <ContactButton /> */}

        </div>
            <p>Disclaimer: The project is under development. Please have patience</p>
        {/* <Card Header="Header" body="this is body"/> */}

    </div>
  )
}

export default Musician