import styles from "./boxes.module.css"


export const boxes = ({pages}) => {
    return (
        <div className={styles.grad}>
            <div>(${pages})</div>
        </div>
    )
}