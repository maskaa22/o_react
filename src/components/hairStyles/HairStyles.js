import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {auth} from "../../servises";
import Banner from '../../images/big-foto/Group 5.png';
import {ServicePage} from "../servicePage";
import styles1 from '../../images/servises/stylesHear/Group22.png';
import styles2 from '../../images/servises/stylesHear/Group24.png';
import styles3 from '../../images/servises/stylesHear/Group23.png';
import smallFoto from '../../images/servises/stylesHear/1.png';
import {WORD_TOKEN} from "../../config/wordsConstants";

const PARAGRAPHS = [
    'Хочу виглядати бездоганно, тут і зараз, бажано швидко» – виклик прийнято. Зачіска – найважливіша складова вашого образу. Якщо ви хочете виглядати надзвичайно і привертати увагу оточуючих без красивої укладки не обійтись.',
    'Стилісти салона краси «Olena Studio» застосовують різні методики, які дозволяють на волоссі різної довжини створити справжній витвір мистецтва. Вечірня, весільна або просто охайне укладання волосся по довжині, призначене для невеликої урочистості, займе в нашому салоні краси зовсім небагато часу. Для укладання волосся, стилісти салону «Olena Studio» використовують абсолютно професійну косметику від відомих брендів, ваше волосся буде шовковистим, та неймовірно пахнути.'
];

// Кожен файл — смужка з 4 портретів (1200×302), тож плитка має співвідношення ~4:1
const GALLERY = [
    {src: styles1, alt: 'Зачіски: приклади'},
    {src: styles2, alt: 'Зачіски: приклади'},
    {src: styles3, alt: 'Зачіски: приклади'}
];
const GALLERY_ASPECT = 1200 / 302;

const HAIRSTYLES = [
    'Локони', 'Пучок', 'Бабета',
    'Плетіння', 'Романтичні', 'Укладання',
    'Класична', 'Афро', 'Завивка'
];

export function HairStyles() {

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
            title={'Професійна зачіска'}
            lead={'Зачіска — найважливіша складова вашого образу.'}
            banner={Banner}
            photo={smallFoto}
            photoAlt={'Зачіска в Olena Studio'}
            paragraphs={PARAGRAPHS}
            gallery={GALLERY}
            galleryAspect={GALLERY_ASPECT}
            listTitle={'Види зачісок'}
            items={HAIRSTYLES}
        />
    );
}
