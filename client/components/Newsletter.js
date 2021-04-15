import React, { useState, useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import styles from '../styles/Newsletter.module.css';
import { EnvelopeOpen } from 'phosphor-react';

const CustomForm = ({ status, message, onValidated }) => {

  const [active, setActive] = useState(false)

  useEffect(() => {
    if(!sessionStorage.getItem("disablePopup")){
      setTimeout(()=>{
        setActive(true)
      }, 5000)
    }
  },[])

	let email;
	const submit = () => {
    email &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
    }, sessionStorage.setItem("disablePopup", true));
  }

  
	return (
    <>
		{active && <div className={styles.container}>
			<div className={styles.newsletter}>
				<EnvelopeOpen size={100} />
				<div className={styles.text}>
					<h1>Subscribe!</h1>
					<h4>
						Join my mailing list and be <br /> the first to be
						notified on new updates!
					</h4>
				</div>
				<input
					className='input'
					ref={(node) => (email = node)}
					type='email'
					placeholder='Your email'
				/>
				<br />
				<button className='submit-btn' onClick={submit}>
					Subscribe
				</button>
				<button className='cancel-btn' onClick={() => {sessionStorage.setItem("disablePopup", true), setActive(false)}}>No thanks!</button>
				<br />
        <div>
          {status === 'error' && (
            <div>{message.includes("already subscribed")  ? <p>Already subscribed!</p> : <p>{message}</p>}</div>
          )}
        </div>
			</div>
      <div className={styles.background}/>
		</div>}
    {status === 'success' && (
      <div></div>
    )}

    </>
	);
};

const Newsletter = () => {
	const url = process.env.API_URL_MAILCHIMP


  console.log(url)
	return (
		<div>
			<MailchimpSubscribe
				url={url}
				render={({ subscribe, status, message }) => (
					<CustomForm
						status={status}
						message={message}
						onValidated={(formData) => subscribe(formData)}
					/>
				)}
			/>
		</div>
	);
};

export default Newsletter;
