import './HomeModern.css';
import {ScrollReelTestimonials} from "./ScrollReelTestimonials";
import Foto1 from "../../images/foto-1.webp";
import Foto2 from "../../images/foto-7.webp";
import Foto3 from "../../images/foto-5.webp";
import Foto4 from "../../images/foto-4.webp";

const COMMENTS = [
    {
        quote: 'Дякую за чудову стрижку та хорошу бесіду під час неї. Всім задоволений.',
        author: 'Вільям Август, 15.09.2022',
        image: Foto1,
        alt: 'Портрет: Вільям Август'
    },
    {
        quote: 'Мені сподобалось, як Ви уклали моє волосся. Укладка протрималася досить довго. Дякую.',
        author: 'Лариса Володимирівна, 17.09.2022',
        image: Foto2,
        alt: 'Портрет: Лариса Володимирівна'
    },
    {
        quote: 'Від моєї зачіски всі були в захваті. Обов\'язково прийду ще.',
        author: 'Аліна Шатенко, 03.12.2022',
        image: Foto3,
        alt: 'Портрет: Аліна Шатенко'
    },
    {
        quote: 'Дякую! Мені дуже сподобалося, наступного разу прийду з сином.',
        author: 'Алік Вінтер, 12.01.2023',
        image: Foto4,
        alt: 'Портрет: Алік Вінтер'
    }
];

export function Comments() {

    return (
        <div className={'hm-reveal'}>
            <ScrollReelTestimonials testimonials={COMMENTS}/>
        </div>
    );
}
