import {WORD_HIDDEN_ONLY, WORD_VISIBLE} from "../../../../config/wordsConstants";

export function StyleIconOk(diag_nap_uchr, diag_osn, icon) {

    if (diag_nap_uchr.value !== diag_osn.value) {
        icon.style.visibility = WORD_HIDDEN_ONLY;
    }
    if (diag_nap_uchr.value === diag_osn.value && diag_nap_uchr.value !== '') {
        icon.style.visibility = WORD_VISIBLE;
    }
}
