import { toast } from 'react-toastify';

const showToastInfoMessage = (title) => {
    toast.info(title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};


const showToastWarnMessage = (title) => {
    toast.warn(title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};


const showToastSuccessMessage = (title) => {
    toast.success(title, {
        position: toast.POSITION.TOP_RIGHT
    });
};


export default {
    showToastInfoMessage,
    showToastWarnMessage,
    showToastSuccessMessage
}
