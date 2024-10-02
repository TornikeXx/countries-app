import styles from "./Card-header.module.css"

const CardHeader:React.FC = () => {
  return (
    <div className={styles.heading}>
        <div className={styles.planning}>
           <p>PLAN YOUR TRIP</p> 
           <h2>Where to next?</h2>       
        </div>
        <button>View all destinations</button>
    </div>
  )
}

export default CardHeader;
