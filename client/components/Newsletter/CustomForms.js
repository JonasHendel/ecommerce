import {DataContext} from '../../store/GlobalState'
import {useContext, useState} from 'react'
import { useEffect } from 'react/cjs/react.development';

export const FooterForm = ({ status, message, onValidated, setActive }) => {

  const [userEmail, setUserEmail] = useState('')
  
  const {state} = useContext(DataContext)
  const {auth} = state
  
  useEffect(()=>{
    if(auth.user){
      setUserEmail(auth.user.email)
    }
  },[auth])

	let email;
	const submit = (e) => {
		e.preventDefault();
		email &&
			email.value.indexOf('@') > -1 &&
			onValidated(
				{
					EMAIL: email.value,
				},
				sessionStorage.setItem('disablePopup', true)
			);
	};

	return (
		<>
					<form className="flex flex-col justify-center h-full" onSubmit={submit}>
            <div>
              <h1 className="text-lg w-60">Subscribe to my newsletter!</h1>
            </div>
						<input
							className='text-black rounded-lg p-2 w-60 focus:outline-none'
							ref={(node) => (email = node)}
							type='email'
							placeholder='Your email'
              defaultValue={userEmail}
						/>
						<button className="border-2 border-gray-50 p-2 my-2 rounded-lg w-60 focus:outline-none active:bg-white" type='submit'>Subscribe</button>
					</form>
					<br />
					<div>
						{/* {status === 'error' && (
							<div>
								{message.includes('already subscribed') ? (
									<p>Already subscribed!</p>
								) : (
									<p>{message}</p>
								)}
							</div>
						)} */}
					</div>
		</>
	);
};
