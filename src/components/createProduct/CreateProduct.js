import * as React from "react";
import {useEffect, useState} from "react";
import {FaBoxOpen, FaRegTrashAlt} from "react-icons/fa";

// Старі стилі лишаються підключеними: з них беруть класи модальні вікна додавання продукту й категорії
// (.btn-add, .custom-file-upload, .select-product тощо)
import './CreateProduct.css';
import './CreateProduct@media.css';
import '../admin/AdminPagesModern.css';
import {AUTH_URL} from "../../config/URL";
import {deleteProduct, getCategories, getProducts} from "../../servises";
import {ModalCreateCategory, ModalCreateProduct} from '../modal';
import {PaginationProductCategory} from "../pagination";

export function CreateProduct() {

    const [categories, setCategories] = useState([]);

    const [modalActiveProduct, setModalActiveProduct] = useState(false);
    const [modalActiveCategory, setModalActiveCategory] = useState(false);
    const [page, setPage] = useState([]);
    const [products, setProducts] = useState([]);
    const [paginate, setPaginate] = useState([]);
    // Лічильник для примусового оновлення списку після додавання чи видалення. Раніше ефект залежав
    // від [page, products], а products міняється після кожного завантаження — тож сторінка у вічному
    // циклі безперервно питала сервер про товари.
    const [reload, setReload] = useState(0);

    useEffect(() => {
        getProducts(page, 10).then(respons => {
            // при помилці запиту respons порожній — не даємо сторінці впасти
            if (respons && respons.data) {
                setProducts(respons.data.docs);
                setPaginate(respons.data);
            }
        });
    }, [page, reload]);

    function thisPage(page) {
        setPage(page);
    }

    const refresh = () => setReload(count => count + 1);

    // Модальні вікна самі закривають себе через setActive(false); після створення продукту чи категорії
    // оновлюємо список саме в момент закриття.
    const setProductModal = (value) => {
        setModalActiveProduct(value);
        if (!value) refresh();
    };

    const setCategoryModal = (value) => {
        setModalActiveCategory(value);
        if (!value) refresh();
    };

    const removeProduct = (product) => {
        // список тепер завжди на екрані, тож перед видаленням питаємо підтвердження
        if (!window.confirm(`Видалити «${product.product_name}»?`)) return;

        deleteProduct(product.inventoryNumber).then(refresh);
    };

    return (
        <section className={'adm'}>
            <header className={'adm-head'}>
                <div className={'adm-head__title'}>
                    <h2 className={'adm-title'}>Занесення в базу</h2>
                    {typeof paginate.total === 'number' && paginate.total !== 0 &&
                        <span className={'adm-count'} title={'Усього товарів'}>{paginate.total}</span>}
                </div>
                <div className={'adm-actions'}>
                    <button type={'button'} className={'adm-btn adm-btn--ghost'}
                            onClick={() => setModalActiveCategory(true)}>Додати категорію
                    </button>
                    <button type={'button'} className={'adm-btn adm-btn--primary'}
                            onClick={() => {
                                setModalActiveProduct(true);
                                getCategories().then(respons => {
                                    setCategories(respons.data);
                                });
                            }}>Додати продукт
                    </button>
                </div>
            </header>

            <div className={'adm-card'}>
                {products.length !== 0 ?
                    <div className={'adm-scroll'}>
                        <table className={'adm-table'}>
                            <thead>
                            <tr>
                                <th scope={'col'}>Інвентарник</th>
                                <th scope={'col'}>Назва</th>
                                <th scope={'col'}>Ціна</th>
                                <th scope={'col'}><span className={'sr-only'}>Видалення</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map(product =>
                                <tr key={product._id}>
                                    <td data-label={'Інвентарник'} className={'adm-cell--num adm-cell--muted'}>
                                        {product.inventoryNumber}
                                    </td>
                                    <td data-label={'Назва'} className={'adm-cell--strong'}>
                                        <span className={'adm-product'}>
                                            {product.img &&
                                                <img src={AUTH_URL + '/' + product.img} alt={''} loading={'lazy'}/>}
                                            <span>{product.product_name}</span>
                                        </span>
                                    </td>
                                    <td data-label={'Ціна'} className={'adm-cell--num'}>{product.price} грн.</td>
                                    <td className={'adm-cell--action'}>
                                        <button type={'button'} className={'adm-icon-btn adm-icon-btn--danger'}
                                                title={'Видалити'} aria-label={`Видалити: ${product.product_name}`}
                                                onClick={() => removeProduct(product)}>
                                            <FaRegTrashAlt aria-hidden={'true'}/>
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div> :
                    <div className={'adm-empty'}>
                        <span className={'adm-empty__icon'}><FaBoxOpen aria-hidden={'true'}/></span>
                        <h3>Товарів поки немає</h3>
                        <p>Додайте першу категорію, а потім продукт, і він з'явиться тут.</p>
                    </div>
                }
            </div>

            <PaginationProductCategory paginate={paginate} thisPage={thisPage}/>

            <ModalCreateProduct active={modalActiveProduct} setActive={setProductModal}
                                categories={categories}/>
            <ModalCreateCategory active={modalActiveCategory} setActive={setCategoryModal}/>
        </section>
    );
}
