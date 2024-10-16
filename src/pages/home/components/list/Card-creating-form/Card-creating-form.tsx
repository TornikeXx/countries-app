import styles from "./Card-creating-form.module.css"
import { ChangeEvent, FormEvent, useState } from "react";

type CountryCreateFormProps = {
  onCountryCreate: (articleFields: { name: string, capital:string, population:string}) => void;
};
const CardForm: React.FC<CountryCreateFormProps> = ({ onCountryCreate }) => {

  const [name, setName] = useState("")
  const [capital, setCapital] = useState("")
  const [population, setPopulation] = useState("")

  const[nameError,setNameError] = useState("")
  const[capitalError,setCapitalError] = useState("")
  const[populationError,setPopulationError] = useState("")
  
  const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (name.length > 10) {
      setNameError("max 10 characters")
    } else {
      setNameError("")
    }
    setName(value)
  }
  const handleChangeCapital = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (capital.length > 10) {
      setCapitalError("max 10 characters")
    } else {
      setCapitalError("")
    }
    setCapital(value)
  }
  const handleChangePopulation = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isNaN(Number(value))) {
      setPopulationError("only numbers")
    } else {
      setPopulationError("")
    }
    setPopulation(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onCountryCreate({ name, capital, population })
    setName("")
    setCapital("")
    setPopulation("")
  }
  return (
    <form className={styles.wrapper}
      onSubmit={handleSubmit}
      >
      <input name="name" placeholder="name" value={name} onChange={handleChangeName} />
      <span>{nameError}</span>
      <input name="capital" placeholder="capital" value={capital} onChange={handleChangeCapital} />
      <span>{capitalError }</span>
      <input name="population" placeholder="populaton" value={population} onChange={handleChangePopulation} />
      <span>{ populationError}</span>
      <button type="submit">Add</button>
  </form>
  )
}

export default CardForm
