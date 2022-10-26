export function StyleIconOk(diag_nap_uchr, diag_osn, icon) {
    if (diag_nap_uchr.value !== diag_osn.value) {
        icon.style.visibility = 'hidden';
    }
    if (diag_nap_uchr.value === diag_osn.value && diag_nap_uchr.value !== '') {
        icon.style.visibility = 'visible';
    }
}
