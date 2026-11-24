/*
 * Зберігання кошика в браузері (localStorage), щоб товари, додані в кошик, але ще не оформлені
 * в замовлення, не зникали при оновленні сторінки.
 *
 * Кошик очищається: після оформлення замовлення (delAllProduct), перед переходом на оплату карткою
 * і при виході з акаунта (LOGOUT, див. productReducer).
 */
const KEY = 'olena_basket';

export function loadBasket() {
    try {
        const raw = localStorage.getItem(KEY);
        const data = raw ? JSON.parse(raw) : [];

        return Array.isArray(data) ? data : [];
    } catch (e) {
        // localStorage недоступний або там зіпсовані дані — просто починаємо з порожнього кошика
        return [];
    }
}

export function saveBasket(items) {
    try {
        if (items && items.length) {
            localStorage.setItem(KEY, JSON.stringify(items));
        } else {
            localStorage.removeItem(KEY);
        }
    } catch (e) {
        // переповнений або заблокований localStorage не повинен ламати сайт
    }
}
