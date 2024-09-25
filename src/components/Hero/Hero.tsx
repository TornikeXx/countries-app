import styles from "./Hero.module.css"

const Hero:React.FC = () => {
  return (
      <div className={styles.heroWrapper}>
          <div className={styles.tittle}>
             <h1>Discover story-worthy travel moments</h1> 
          </div>      
    </div>
  )
}

export default Hero
