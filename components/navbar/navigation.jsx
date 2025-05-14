import styles from "./navigation.module.css"
import Link from "next/link"

const menuItem = ["Home", "Skill", "Projects", "About", "Blog", "Reviews"];
// console.log(typeof(menuItem));

const Navigation = () => {
    
    return(
    <header className={styles.list}>
    <nav className={styles.underline}>
      {menuItem.map((menu,i) => {
        return (
          // console.log(typeof(menu)),
          <Link key={i} href={`#${menu.toLowerCase()}`} className={`${styles.links} ${styles.comp}`} >
              {/* console.log(menu); */}
                {menu}
            </Link>
      )
    })}
    </nav>
    </header>
)}
export default Navigation