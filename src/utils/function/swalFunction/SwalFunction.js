import './Swal.css';

const Swal = require('sweetalert2');

// Галочка в кружечку для плашки (SVG замість стандартної анімації SweetAlert)
const CHECK_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
    'stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

/*
 * Єдине місце, звідки показуються всі спливаючі повідомлення сайту (SweetAlert2).
 * Вигляд задається класами sw-* у Swal.css, тому змінюється одразу для всіх повідомлень.
 *
 * Два режими:
 *  - короткі повідомлення про успіх, що самі зникають (без кнопки), напр. "Товар доданий" —
 *    невелика темна плашка вгорі праворуч (під шапкою), без затемнення сторінки;
 *  - решта (помилки, повідомлення з кнопкою) — звичайна модалка по центру.
 */
export function SwalFunction(title, text, icon, confirmButtonText, showConfirmButton, timer) {
    const isToast = icon === 'success' && showConfirmButton === false;

    if (isToast) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            title: title,
            text: text || undefined,
            iconHtml: CHECK_ICON,
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: !!timer,
            customClass: {
                container: 'sw-toast-container',
                popup: 'sw-toast',
                title: 'sw-toast__title',
                htmlContainer: 'sw-toast__text',
                icon: 'sw-toast__icon',
                timerProgressBar: 'sw-toast__timer'
            },
            // поки на плашку наведено курсор — таймер стоїть, щоб встигнути прочитати
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
        return;
    }

    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        showConfirmButton: showConfirmButton,
        confirmButtonColor: 'var(--hm-purple)',
        timer: timer,
        timerProgressBar: !!timer,
        backdrop: 'rgba(23, 10, 2, 0.5)',
        customClass: {
            popup: 'sw-popup',
            title: 'sw-title',
            htmlContainer: 'sw-text',
            confirmButton: 'sw-confirm',
            timerProgressBar: 'sw-timer'
        }
    });
}
