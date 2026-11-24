import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {MdCheck} from "react-icons/md";

import './ModalModern.css';

/*
 * Власний випадаючий список замість стандартного <select>: список, який малює система, не стилізується
 * (синє підсвічування, шрифт ОС). Тут це кнопка + випадаюча картка.
 *
 * props:
 *  - id, label  — для зв'язку з <label htmlFor>
 *  - options    — [{value, label}]
 *  - value      — вибране значення ('' = нічого не вибрано)
 *  - onChange   — (value) => void
 *  - placeholder
 *
 * Клавіатура (патерн ARIA combobox): стрілки вгору/вниз, Home/End, Enter або пробіл — вибір, Esc — закрити,
 * Tab — закрити й піти далі. Клік поза списком теж закриває.
 */
export function CustomSelect({id, options, value, onChange, placeholder = 'Оберіть', emptyText = 'Немає варіантів'}) {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const rootRef = useRef(null);
    const listRef = useRef(null);

    const selectedIndex = options.findIndex(option => option.value === value);
    const selected = selectedIndex >= 0 ? options[selectedIndex] : null;

    // клік поза списком закриває його
    useEffect(() => {
        if (!open) return undefined;

        const onPointerDown = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
        };

        document.addEventListener('mousedown', onPointerDown);
        return () => document.removeEventListener('mousedown', onPointerDown);
    }, [open]);

    // при відкритті підсвічуємо вибраний пункт (або перший), а під час навігації — прокручуємо до нього
    useEffect(() => {
        if (open) {
            setActive(selectedIndex >= 0 ? selectedIndex : 0);
        }
    }, [open, selectedIndex]);

    useEffect(() => {
        if (!open || active < 0 || !listRef.current) return;

        const item = listRef.current.children[active];
        if (item && item.scrollIntoView) item.scrollIntoView({block: 'nearest'});
    }, [open, active]);

    const choose = (index) => {
        const option = options[index];
        if (option) onChange(option.value);
        setOpen(false);
    };

    const onKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!open) setOpen(true);
                else setActive(index => Math.min(options.length - 1, index + 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!open) setOpen(true);
                else setActive(index => Math.max(0, index - 1));
                break;
            case 'Home':
                if (open) {
                    e.preventDefault();
                    setActive(0);
                }
                break;
            case 'End':
                if (open) {
                    e.preventDefault();
                    setActive(options.length - 1);
                }
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (open) choose(active);
                else setOpen(true);
                break;
            case 'Escape':
                // Esc закриває лише список, а не все вікно, в якому він стоїть
                if (open) {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(false);
                }
                break;
            case 'Tab':
                setOpen(false);
                break;
            default:
        }
    };

    return (
        <div className={`mm-select${open ? ' is-open' : ''}`} ref={rootRef}>
            <button type={'button'} id={id} className={'mm-input mm-select__btn'}
                    role={'combobox'} aria-haspopup={'listbox'} aria-expanded={open}
                    aria-controls={`${id}-list`}
                    aria-activedescendant={open && active >= 0 ? `${id}-opt-${active}` : undefined}
                    onClick={() => setOpen(isOpen => !isOpen)} onKeyDown={onKeyDown}>
                <span className={selected ? '' : 'mm-select__placeholder'}>
                    {selected ? selected.label : placeholder}
                </span>
            </button>

            <ul id={`${id}-list`} className={'mm-select__list'} role={'listbox'} ref={listRef}
                tabIndex={-1}>
                {options.length === 0 && <li className={'mm-select__empty'}>{emptyText}</li>}
                {options.map((option, index) => (
                    <li key={option.value} id={`${id}-opt-${index}`} role={'option'}
                        aria-selected={option.value === value}
                        className={'mm-select__opt'
                            + (index === active ? ' is-active' : '')
                            + (option.value === value ? ' is-selected' : '')}
                        onMouseEnter={() => setActive(index)}
                        // mousedown, а не click: щоб поле не втрачало фокус до вибору
                        onMouseDown={e => {
                            e.preventDefault();
                            choose(index);
                        }}>
                        <span>{option.label}</span>
                        {option.value === value && <MdCheck aria-hidden={'true'}/>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
