import './Pagination.css'
import {APIServise} from "../servises";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "react-bootstrap";
import {useEffect} from "react";

export function Paginations ({paginate, thisPage, category_id, setFilter})
{


    const filterFlag = useSelector(state => state.product.filterFlag);


    // useEffect(() => {
    //     setActivePage(0)
    // }, [])

    const dispatch = useDispatch();
    const pageCount = Math.ceil(paginate.total / paginate.limit);
    const pages = []


    for (let number = 0; number < pageCount; number++) {
        pages.push(number + 1)
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
            {


                <Pagination>{
                    pages.map((page, index) =>
                        <Pagination.Item
                            key={page}
                             // active={}
                            onClick={()=> {
                                        !filterFlag &&
                                         thisPage(page)
                                        filterFlag &&
                                        dispatch(APIServise.categoriesFilter(category_id, page, 2)).then(response => {
                                            thisPage(page)
                                            setFilter(response.data.docs)

                                        })
                            }
                            }
                        >{page}</Pagination.Item>
                    )
                }</Pagination>

                // pages.map((page,index )=>
                //
                //
                //     <div className={'page'} key={index}   onClick={() =>
                //     {
                //         !filterFlag &&
                //          thisPage(page)
                //         filterFlag &&
                //         dispatch(APIServise.categoriesFilter(category_id, page, 2)).then(response => {
                //             thisPage(page)
                //             setFilter(response.data.docs)
                //         })
                //     }}>{page}</div>
                // )
            }
        </div>
    );


}
