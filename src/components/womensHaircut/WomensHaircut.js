import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {auth} from "../../servises";
import Banner from '../../images/big-foto/Group 8.png';
import {ServicePage} from "../servicePage";
import woman1 from '../../images/servises/womenHears/Group21.png';
import woman2 from '../../images/servises/womenHears/Group17.png';
import woman3 from '../../images/servises/womenHears/Group20.png';
import smallFoto from '../../images/servises/womenHears/1.png';
import {WORD_TOKEN} from "../../config/wordsConstants";

const PARAGRAPHS = [
    'Стрижка — це ні тільки творчий, а й складний технологічний процес. Кожна жінка хоче бути унікальною, завдяки правильній консультації та правильно підібраній формі можна змінити весь образ в цілому. Команда «Olena Studio» вже довела свою досвідченість та талановитість – наші майстри користуються популярністю серед киян.',
    '«Olena Studio» салон краси, в якому ви можете зробити абсолютного любої форми жіночу стрижку, та за різними технологіями. Ми враховуємо побажання наших відвідувачів, але також особливості кожного клієнта, вміємо розкривати вашу унікальність і приховувати недоліки. Ми стежимо за сучасними тенденціями та пропонуємо актуальні та цікаві креативні стрижки.'
];

// Кожен файл — смужка з 4 портретів (1200×302), тож плитка має співвідношення ~4:1
const GALLERY = [
    {src: woman1, alt: 'Жіночі стрижки: приклади'},
    {src: woman2, alt: 'Жіночі стрижки: приклади'},
    {src: woman3, alt: 'Жіночі стрижки: приклади'}
];
const GALLERY_ASPECT = 1200 / 302;

const HAIRCUTS = [
    'Каре', 'Каскад', 'Лісенка',
    'Рапсодія', 'Сесон', 'Шег',
    'Аврора', 'Шапочка', 'Асиметрія'
];

export function WomensHaircut() {

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
            title={'Жіноча стрижка'}
            lead={'Кожна жінка хоче бути унікальною — правильно підібрана форма здатна змінити весь образ.'}
            banner={Banner}
            photo={smallFoto}
            photoAlt={'Жіноча стрижка в Olena Studio'}
            paragraphs={PARAGRAPHS}
            gallery={GALLERY}
            galleryAspect={GALLERY_ASPECT}
            listTitle={'Види стрижок'}
            items={HAIRCUTS}
        />
    );
}
