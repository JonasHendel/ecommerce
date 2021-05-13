import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notify from './Notify';

const Toast = ({ message, handleShow }) => {
	
  if (message.error === true) {
		toast.error(message.msg, {
			onClose: () => handleShow(),
			position: 'top-center',
      toastId: message.msg
		});
	}
	if (message.error === false) {
		toast.success(message.msg, {
			onClose: () => handleShow(),
			position: 'top-center',
      toastId: message.msg
		});
	}
	return (
		<div>
			<ToastContainer
				limit={2}
				pauseOnHover={false}
				autoClose={3000}
				newestOnTop={true}
			/>
		</div>
	);
};

export default Toast;
