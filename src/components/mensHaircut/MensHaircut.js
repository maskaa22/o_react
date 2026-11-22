import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {auth} from "../../servises";
import Mens from '../../images/big-foto/Group 7.png';
import {ServicePage} from "../servicePage";
import man1 from '../../images/servises/menHears/Group11.png';
import man2 from '../../images/servises/menHears/Group12.png';
import man3 from '../../images/servises/menHears/Group13.png';
import smallFoto from '../../images/servises/menHears/1.png';
import {WORD_TOKEN} from "../../config/wordsConstants";

const PARAGRAPHS = [
    'Чоловіки не менш за жінок хочуть виглядати привабливо та яскраво. І не важливо де чоловік буде сьогодні : дома, на важливій зустрічі, або на святі – гарна стрижка, це запорука успіху кожного чоловіка. «Olena Studio» працює з професійною косметикою, використовує надійні інструменти для роботи з чоловічими стрижками.',
    'Ми враховуємо як побажання клієнта, так і структурні особливості його особи, завжди знаходимо найкраще стильове рішення. Тому для нас важливим є індивідуальний підхід, який робить кожну чоловічу стрижку унікальною.',
    'Розслаблююча атмосфера та високий рівень послуг від майстрів, дозволяють отримати максимум задоволення від процесу чоловічої стрижки.'
];

// Кожен файл — смужка з 4 портретів (1200×302), тож плитка має співвідношення ~4:1
const GALLERY = [
    {src: man1, alt: 'Чоловічі стрижки: приклади'},
    {src: man2, alt: 'Чоловічі стрижки: приклади'},
    {src: man3, alt: 'Чоловічі стрижки: приклади'}
];
const GALLERY_ASPECT = 1200 / 302;

const HAIRCUTS = [
    'Мілітарі', 'Майданчик', 'Напівбокс',
    'Теніс', 'Бокс', 'Цезар',
    'Прінстон', 'Андеркат', 'Канадка'
];

export function MensHaircut() {

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth()).then(res => {
                if (res === undefined) {
                    localStorage.removeItem(WORD_TOKEN);
                    document.location.reload();
                }
            });
        }
    }, [dispatch]);

    return (
        <ServicePage
            title={'Чоловіча стрижка'}
            lead={'Чоловіки не менш за жінок хочуть виглядати привабливо та яскраво.'}
            banner={Mens}
            photo={smallFoto}
            photoAlt={'Чоловіча стрижка в Olena Studio'}
            paragraphs={PARAGRAPHS}
            gallery={GALLERY}
            galleryAspect={GALLERY_ASPECT}
            listTitle={'Види стрижок'}
            items={HAIRCUTS}
        />
    );
}
