// Npm installs
import React, { useState } from 'react';
import { Phone, InstagramLogo, At } from 'phosphor-react';
// Components
import ContactForm from '../components/ContactForm';
// CSS
import styles from '../styles/Contact.module.css';

const Kontakt = () => {
	return (
		<>
      <div className="title">  
        <h1>KONTAKT</h1>
      </div>
			<div className={styles.container}>
				<ContactForm className={styles.icon}/>
				<div className={styles.contactinfo}>
					<div className={styles.contentOuter}>
            <div className={styles.contentInner}>  
              <Phone className={styles.icon}/>
              <p>+47 980 56 823</p>
            </div>
          </div>
					<div className={styles.contentOuter}>
            <div className={styles.contentInner}>
              <At className={styles.icon}/>
              <p>test@mail.com</p>
             </div>
          </div>
					<div className={styles.contentOuter}>
            <div className={styles.contentInner}>
              <InstagramLogo className={styles.icon}/>
              <p>@francescosolimeo</p>
            </div>
          </div>
				</div>
			</div>
		</>
	);
};

export default Kontakt;
