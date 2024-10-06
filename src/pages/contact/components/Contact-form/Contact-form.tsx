import styles from "./Contact-form.module.css"
const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //@ts-expect-error რადგანაც მუშაობს ამ ეტაპზე არ მივაქცევ ტაიპსკრიპტის ერორს ყურადღებას
    const name = e.currentTarget.name.value
    const email = e.currentTarget.email.value
    const message = e.currentTarget.message.value

    console.log({
      "name": name,
      "email": email,
      "message":message
    })
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  

  return (
    <form className={styles.formsWrapper} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <div className={styles.info}>
        <input type="text" id="name" placeholder="name" name="name" />    
        <input type="email" placeholder="email" id="email" name="email" />      
      </div>
      <textarea className={styles.message} placeholder="message" id="message" name="message" />
      <button type="submit">Send</button>
    </form>
  )
}

export default ContactForm
