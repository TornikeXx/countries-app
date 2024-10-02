import styles from "./Hero.module.css"

 const Hero: React.FC<{ title: string }> = (props) => {
  const {title} = props
  return (
      <div className={styles.heroWrapper}>
          <div className={styles.tittle}>
            <h1>{ title }</h1> 
          </div>      
    </div>
  )
}

export default Hero
