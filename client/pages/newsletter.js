import React, { useState } from 'react';
import axios from 'axios'

import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "https://gmail.us1.list-manage.com/subscribe/post?u=626959619ccc4341d70b0b034&amp;id=e2787d42b4";

const newsletter = () => {
	return (
      <MailchimpSubscribe url={url}/> 
	);
};

export default newsletter


