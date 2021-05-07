import React from 'react'

import emailjs from 'emailjs-com';


import styles from '../styles/Contact.module.css'

const sendEmail = (e) => {
  e.preventDefault()

  emailjs.sendForm('test', 'template1', e.target, process.env.USER_EMAILJS)
    .then((result) => {
        // console.log(result.text);
    }, (error) => {
        // console.log(error.text);
  });
}

const ContactForm = () => {  
  return (
    <>
        <div>
          <form className={styles.contactform} onSubmit={sendEmail}>
            <h1 style={{padding:10}}>Send meg en Epost!</h1>
            <input type="hidden" name="contact_number" />
            <div className={styles.emailname}>
              <input type="text" name="user_name" placeholder="Name"/>
              <input type="email" name="user_email" placeholder="Email"/>
            </div>
            <input type="text" name="subject" placeholder="Subject"/>
            <textarea name="message" placeholder="Message"/>
            <div className={styles.btndiv}>
              <button className={styles.submitbtn} type="submit" value="Send">Send</button>
            </div>
          </form>
        </div>
    </>
  )
}

export default ContactForm