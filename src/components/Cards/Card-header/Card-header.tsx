import "./Card-header.css"

const CardHeader:React.FC = () => {
  return (
    <div className="heading">
        <div className="planning">
           <p>PLAN YOUR TRIP</p> 
           <h2>Where to next?</h2>       
        </div>
        <button>View all destinations</button>
    </div>
  )
}

export default CardHeader;
