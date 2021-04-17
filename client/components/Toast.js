import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Notify from './Notify';
  
const Toast = ({message}) => {
  if(message.error === true ){
    toast.error(message.msg);
  }
  if(message.error === false){
    toast.success('Registered')
  }
    return (
      <div>
        <ToastContainer />
      </div>
    );
  }

export default Toast