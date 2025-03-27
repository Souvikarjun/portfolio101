import Navbar from "@/components/navbar/navbar";
import styles from "./developer.module.css"

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Navbar/>
          {children}
        </div>
    );
  }