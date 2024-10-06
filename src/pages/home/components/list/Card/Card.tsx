import { PropsWithChildren } from "react"
import styles from "./Card.module.css"

const Card:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.cardsWrapper}>
      {children}
    </div>
  )
}

export default Card
