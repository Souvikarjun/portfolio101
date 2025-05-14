import Navbar from "@/components/navbar/navbar";
import styles from "./developer.module.css"
import Musician from "../musician/page";

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Navbar mainComp="Musician"/>
          {children}
        </div>
    );
  }