import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Notify from './Notify';
  
const Toast = ({message, handleShow}) => {
  if(message.error === true ){
    toast.error(message.msg, {onClose: () => handleShow(), position: "top-center"});
  }
  if(message.error === false){
    toast.success(message.msg, {onClose: () => handleShow(), position: "top-center"})

  }
    return (
      <div>
        <ToastContainer limit={20} pauseOnHover={false} autoClose={3000}/>
      </div>
    );
  }

export default Toast