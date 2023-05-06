const Swal = require('sweetalert2');

export function SwalFunction(title, text, icon, confirmButtonText, showConfirmButton, timer) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        showConfirmButton: showConfirmButton,
        confirmButtonColor: '#47008e',
        timer: timer
    });
}
