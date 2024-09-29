import styles from "@/components/Header/Header.module.css"
import logo from "@/assets/logo.svg"
import search from "@/assets/search.svg"
import save from "@/assets/save.svg"

const Header:React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <img src={logo} alt=""  />
      <div className={styles.navigation}>
        <div className={styles.attributes}>
          <img src={search} alt="" />
          <p>Search</p>
        </div>
        <div className={styles.attributes}>
          <img src={save} alt="" />
          <p>Saves</p>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default Header
