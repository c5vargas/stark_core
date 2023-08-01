import Swal from 'sweetalert2'

export const swalClose = () => {
    Swal.close()
}

export const swalToast = (title = "", icon = "success", timer = 2000, text = "") => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end', // Can be 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mousedown', Swal.close)
        }
    })

    Toast.fire({
        icon,
        title,
        text
    })
}

export const swalQuestion = async(title, text) => {
    const { isConfirmed } = await Swal.fire({
        title,
        text,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar!',
        cancelButtonText: 'Cancelar'
    })

    return isConfirmed
}
