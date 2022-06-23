import './Pagination.css'
import {APIServise} from "../servises";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "react-bootstrap";
import {setDivecePage} from "../reducers/actionCreators";

export function PaginationCategor ({paginate, thisPage, category_id, setFilter})
{


    const pageProduct = useSelector(state => state.product.page);

    const dispatch = useDispatch();
    const pageCount = Math.ceil(paginate.total / paginate.limit);
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    const btns = document.getElementsByClassName("page");


    // li.style.cssText = 'line-height: 2, background-color: red;'

    for (let i = 0; i < btns.length; i++) {

        btns[i].addEventListener("click", function() {

            const current = document.getElementsByClassName("activePage");
             if (current.length > 0) {
                current[0].className = current[0].className.replace(" activePage", "");
             }
            this.className += " activePage";
        });
    }

    return(
        <div className={'paginate'}>
            <Pagination >
                {
                    pages.map((page, index) =>
                    <Pagination.Item key={index}
                                     active={pageProduct===page}
                                     onClick={()=>
                                     {
                                         dispatch(setDivecePage(page));
                                         dispatch(APIServise.categoriesFilter(category_id, page, 2)).then(response => {
                                             thisPage(page)
                                             setFilter(response.data.docs)
                                             })
                                     }}
                    >
                        {page}
                    </Pagination.Item>
                    )
                }
            </Pagination>



            {/*{*/}
            {/*    pages.map((page,index )=>*/}


            {/*        <div className={'page'} key={index}   onClick={() =>*/}
            {/*        {*/}
            {/*            !filterFlag &&*/}
            {/*             thisPage(page)*/}
            {/*            filterFlag &&*/}
            {/*            dispatch(APIServise.categoriesFilter(category_id, page, 2)).then(response => {*/}
            {/*                thisPage(page)*/}
            {/*                setFilter(response.data.docs)*/}
            {/*            })*/}
            {/*        }}>{page}</div>*/}
            {/*    )*/}
            {/*}*/}
        </div>
    );
}
