import iziToast from "izitoast";

export const showSuccessMessage =(message, position = "bottomLeft")=> {
    iziToast.success({
        position: position,
        message: message
    })
}

export const showErrorMessage =(message, position = "bottomLeft")=> {
    iziToast.error({
        position: position,
        message: message
    })
}

