import {useEffect, useState} from "react";
import {MdClose} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";

import './Modal.css';
import './ModalModern.css';
import {deleteCategory, getCategories} from "../../servises";
import {confirmDialog} from "../../utils/function";

/*
 * Вікно видалення категорії: список усіх категорій, біля кожної кнопка "кошик".
 * Сервер не дозволяє видалити категорію, у якій ще є товари, і повертає зрозуміле повідомлення.
 * Після видалення список оновлюється, а при закритті вікна батько перезавантажує дані (setActive(false)).
 */
export function ModalDeleteCategory({active, setActive}) {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // щоразу, коли вікно відкривається, підтягуємо актуальний список
    useEffect(() => {
        if (!active) return undefined;

        let isMounted = true;
        setLoading(true);
        getCategories().then(res => {
            if (isMounted) {
                setCategories(res && res.data ? res.data : []);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [active]);

    // Esc закриває вікно, поки воно відкрите
    useEffect(() => {
        if (!active) return undefined;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') setActive(false);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active, setActive]);

    const remove = (category) => {
        confirmDialog({title: 'Видалити категорію?', text: `«${category.category_name}»`}).then(ok => {
            if (!ok) return;

            deleteCategory(category._id).then(res => {
                // при помилці (наприклад, у категорії є товари) deleteCategory повертає undefined
                if (res !== undefined) {
                    setCategories(list => list.filter(item => item._id !== category._id));
                }
            });
        });
    };

    return (
        <div className={`mm${active ? ' is-open' : ''}`} onClick={() => setActive(false)} aria-hidden={!active}>
            <div className={'mm-dialog'} role={'dialog'} aria-modal={'true'} aria-label={'Видалення категорії'}
                 onClick={e => e.stopPropagation()}>
                <button type={'button'} className={'mm-close'} onClick={() => setActive(false)}
                        aria-label={'Закрити'}>
                    <MdClose/>
                </button>
                <h2 className={'mm-title'}>Видалити категорію</h2>

                {categories.length !== 0 ?
                    <ul className={'mm-catlist'}>
                        {categories.map(category => (
                            <li key={category._id} className={'mm-catlist__item'}>
                                <span className={'mm-catlist__name'}>{category.category_name}</span>
                                <button type={'button'} className={'mm-catlist__del'} title={'Видалити'}
                                        aria-label={`Видалити категорію: ${category.category_name}`}
                                        onClick={() => remove(category)}>
                                    <FaRegTrashAlt aria-hidden={'true'}/>
                                </button>
                            </li>
                        ))}
                    </ul> :
                    <p className={'mm-catlist__empty'}>{loading ? 'Завантаження…' : 'Категорій поки немає.'}</p>
                }
                <p className={'mm-catlist__hint'}>Категорію з товарами видалити не можна: спочатку видаліть її товари.</p>
            </div>
        </div>
    );
}
