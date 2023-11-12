import { toast } from 'react-toastify';

const showToastInfoMessage = (title) => {
    toast.info(title, {
        position: "top-right",
        autoClose: 1000,
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
        autoClose: 1000,
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
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
    });
};


export default {
    showToastInfoMessage,
    showToastWarnMessage,
    showToastSuccessMessage
}
