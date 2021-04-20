import { toast } from 'react-toastify'

export const notifySuccess = (message) => {
    toast.success(message)
}

export const notifyFailure = (message) => {
    toast.error(message);
}

export const notifyAlert = (message) => {
    toast.warning(message);
}