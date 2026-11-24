import './Swal.css';

const Swal = require('sweetalert2');

// Кошик для іконки підтвердження видалення
const TRASH_ICON = '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/>' +
    '<path d="M10 11v5"/><path d="M14 11v5"/></svg>';

/*
 * Вікно підтвердження в дизайні сайту замість стандартного window.confirm.
 * Повертає Promise<boolean>: true — користувач підтвердив, false — скасував (кнопка, Esc чи клік повз вікно).
 *
 *   confirmDialog({title: 'Видалити категорію?', text: '«Маска»'}).then(ok => {...});
 */
export function confirmDialog({
                                  title = 'Ви впевнені?',
                                  text = '',
                                  confirmText = 'Видалити',
                                  cancelText = 'Скасувати',
                                  danger = true
                              } = {}) {
    return Swal.fire({
        title,
        text: text || undefined,
        iconHtml: danger ? TRASH_ICON : undefined,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        reverseButtons: true,
        focusCancel: danger,         // для видалення фокус на "Скасувати": Enter не знищить дані випадково
        buttonsStyling: false,
        backdrop: 'rgba(23, 10, 2, 0.5)',
        customClass: {
            popup: 'sw-popup sw-confirm-popup',
            title: 'sw-title',
            htmlContainer: 'sw-text',
            icon: 'sw-confirm-icon',
            actions: 'sw-confirm-actions',
            confirmButton: 'sw-btn ' + (danger ? 'sw-btn--danger' : 'sw-btn--primary'),
            cancelButton: 'sw-btn sw-btn--ghost'
        }
    }).then(result => result.isConfirmed);
}
