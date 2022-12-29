import {b_letters, digits, s_letters} from "../../../../config/functionConstants";

export function StyleForPassword(number, block_check) {

    let is_s = false;
    let is_b = false;
    let is_d = false;

    for (let i = 0; i < number.length; i++) {
        if (!is_s && s_letters.indexOf(number[i]) !== -1) {
            is_s = true
        } else if (!is_b && b_letters.indexOf(number[i]) !== -1) {
            is_b = true
        } else if (!is_d && digits.indexOf(number[i]) !== -1) {
            is_d = true
        }
    }

    let rating = 0;

    if (is_s) rating++;
    if (is_b) rating++;
    if (is_d) rating++;

    if (number.length < 1) {
        block_check.style.width = "0";
    }
    if (number.length < 6 && rating < 3) {
        block_check.style.width = "10%";
        block_check.style.backgroundColor = '#ff89f7';
    } else if (number.length < 6 && rating >= 3) {
        block_check.style.width = "50%";
        block_check.style.backgroundColor = '#b266ff';
    } else if (number.length >= 8 && rating < 3) {
        block_check.style.width = "50%";
        block_check.style.backgroundColor = '#b266ff';
    } else if (number.length >= 8 && rating >= 3) {
        block_check.style.width = "93%";
        block_check.style.backgroundColor = '#79cbb8';
    } else if (number.length >= 6 && rating === 1) {
        block_check.style.width = "10%";
        block_check.style.backgroundColor = '#ff89f7';
    } else if (number.length >= 6 && rating > 1 && rating < 4) {
        block_check.style.width = "50%";
        block_check.style.backgroundColor = '#b266ff';
    } else if (number.length >= 6 && rating === 4) {
        block_check.style.width = "93%";
        block_check.style.backgroundColor = '#79cbb8';
    }
}
