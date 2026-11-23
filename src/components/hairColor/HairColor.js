import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {auth} from "../../servises";
import Banner from '../../images/big-foto/Group 6.png';
import {ServicePage} from "../servicePage";
import color1 from '../../images/servises/colorsHears/Group18.png';
import color2 from '../../images/servises/colorsHears/Group19.png';
import color3 from '../../images/servises/colorsHears/Group16.png';
import smallFoto from '../../images/servises/colorsHears/1.png';
import {WORD_TOKEN} from "../../config/wordsConstants";

const PARAGRAPHS = [
    'Чи то темний колір, блонд або знебарвлення, якщо волосся виглядає здоровим і доглянутим, це в тренді, незалежно від кольору. Фарбування для того, щоб підкреслити красу вашого волосся, а не зіпсувати!',
    'Стилісти салону краси «Miraé» стежать за новими тенденціями, особливо за тим, як зберегти здоров’я вашого волосся завдяки професійній косметиці або препаратам, які використовують під час фарбування. Постійно проходять підвищення кваліфікації та запропонують самі актуальні техніки. Салон краси «Miraé» працює виключно з професійними фарбами для волосся, вони щадно впливають на волосся і не шкодять їх структурі, даруючи блиск і яскраві відтінки.'
];

// Кожен файл — смужка з 4 портретів (1200×302), тож плитка має співвідношення ~4:1
const GALLERY = [
    {src: color1, alt: 'Фарбування: приклади'},
    {src: color2, alt: 'Фарбування: приклади'},
    {src: color3, alt: 'Фарбування: приклади'}
];
const GALLERY_ASPECT = 1200 / 302;

const TECHNIQUES = [
    'Мелірування', 'Балаяж', 'Мажимеш',
    'Омбре', 'Брондування', 'Ейртач',
    'Шатуш', 'Тонування', 'Колорування'
];

export function HairColor() {

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
            title={'Професійне фарбування'}
            lead={'Фарбування — щоб підкреслити красу вашого волосся, а не зіпсувати.'}
            banner={Banner}
            photo={smallFoto}
            photoAlt={'Фарбування волосся в Miraé'}
            paragraphs={PARAGRAPHS}
            gallery={GALLERY}
            galleryAspect={GALLERY_ASPECT}
            listTitle={'Методики фарбування'}
            items={TECHNIQUES}
        />
    );
}
