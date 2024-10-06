import { PropsWithChildren } from "react"
import styles from "./Contact.module.css"
const Contact:React.FC<PropsWithChildren> = ({children}) => {
    return (
<div className={styles.page}>
    <div className={styles.contactWrapper}>
      {children}
    </div>
</div>
  )
}

export default Contact
