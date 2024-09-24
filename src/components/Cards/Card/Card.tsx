import { PropsWithChildren } from "react"
import "./Card.css"

const Card:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="cards-wrapper">
      {children}
    </div>
  )
}

export default Card
