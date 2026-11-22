import {useEffect, useState} from "react";
import {MdClose} from "react-icons/md";

import './Modal.css';
import './ModalModern.css';
import {createCategory} from "../../servises";

/*
 * Вікно створення категорії. Вказує на відкритість проп active, закриває setActive(false).
 * Після успішного створення вікно закривається, а поле очищується (раніше лишалось відкритим).
 */
export function ModalCreateCategory({active, setActive}) {

    const [nameCategory, setNameCategory] = useState('');

    // Esc закриває вікно, поки воно відкрите
    useEffect(() => {
        if (!active) return undefined;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') setActive(false);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active, setActive]);

    const submit = (e) => {
        e.preventDefault();

        createCategory(nameCategory).then(res => {
            // при помилці createCategory повертає undefined — тоді лишаємо вікно як є
            if (res !== undefined) {
                setNameCategory('');
                setActive(false);
            }
        });
    };

    return (
        <div className={`mm${active ? ' is-open' : ''}`} onClick={() => setActive(false)} aria-hidden={!active}>
            <div className={'mm-dialog'} role={'dialog'} aria-modal={'true'} aria-label={'Нова категорія'}
                 onClick={e => e.stopPropagation()}>
                <button type={'button'} className={'mm-close'} onClick={() => setActive(false)}
                        aria-label={'Закрити'}>
                    <MdClose/>
                </button>
                <h2 className={'mm-title'}>Категорія</h2>
                <form className={'mm-form'} onSubmit={submit}>
                    <div className={'mm-field mm-field--full'}>
                        <label htmlFor={'mm-category-name'}>Назва категорії</label>
                        <input id={'mm-category-name'} className={'mm-input'} value={nameCategory}
                               onChange={e => setNameCategory(e.target.value)}
                               // у назві категорії цифри заборонені (як і було)
                               onKeyDown={e => {
                                   if (/^[0-9]$/.test(e.key)) e.preventDefault();
                               }}
                               placeholder={'Назва категорії'} autoComplete={'off'}/>
                    </div>
                    <button type={'submit'} className={'mm-submit'}>Створити</button>
                </form>
            </div>
        </div>
    );
}
