import React, { useState, useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import styles from '../styles/Newsletter.module.css';
import { EnvelopeOpen } from 'phosphor-react';

import Link from 'next/link'

const CustomForm = ({ status, message, onValidated, setActive }) => {

	let email;
	const submit = (e) => {
    email &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
    }, sessionStorage.setItem("disablePopup", true), setActive(false));
  }

  
	return (
    <>
		<div className={styles.container}>
			<div className={styles.newsletter}>
				<EnvelopeOpen size={100} />
				<div className={styles.text}>
					<h1>Subscribe!</h1>
					<h4>
						Join my mailing list and be <br /> the first one to be
						notified on new courses!
					</h4>
				</div>
        <form onSubmit={submit}>
          <input
            className='input'
            ref={(node) => (email = node)}
            type='email'
            placeholder='Your email'
          />
          <br />
          <button type="submit" className='submit-btn'>
            Subscribe
          </button>
        </form>
				<button className='cancel-btn' onClick={(e) => {e.preventDefault(), sessionStorage.setItem("disablePopup", true), setActive(false)}}>No thanks!</button>
				<br />
        <div>
          {status === 'error' && (
            <div>{message.includes("already subscribed")  ? <p>Already subscribed!</p> : <p>{message}</p>}</div>
          )}
        </div>
			</div>
      <div className={styles.background}/>
		</div>
    {status === 'success' && (
      <div></div>
    )}

    </>
	);
};

const Newsletter = ({setActive}) => {
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
            setActive={setActive}
					/>
				)}
			/>
		</div>
	);
};

export default Newsletter;
