import './Pagination.css'
import {APIServise} from "../servises";
import {useDispatch, useSelector} from "react-redux";

export function Pagination ({paginate, thisPage, category_id, setFilter})
{
    console.log(paginate);
    const filterFlag = useSelector(state => state.product.filterFlag);

    const dispatch = useDispatch();
    const pageCount = Math.ceil(paginate.total / paginate.limit);
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    // const btns = document.getElementsByClassName("page");
    //
    // for (let i = 0; i < btns.length; i++) {
    //
    //     btns[i].addEventListener("click", function() {
    //
    //         const current = document.getElementsByClassName("activePage");
    //          if (current.length > 0) {
    //             current[0].className = current[0].className.replace(" activePage", "");
    //          }
    //         this.className += " activePage";
    //     });
    // }

    return(
        <div className={'paginate'}>
            {
                pages.map((page,index )=>
                    <div className={'page'} key={index}  onClick={() =>
                    {
                        !filterFlag &&
                         thisPage(page)
                        filterFlag &&
                        dispatch(APIServise.categoriesFilter(category_id, page, 2)).then(response => {
                            setFilter(response.data.docs)
                        })
                    }}>{page}</div>
                )
            }
        </div>
    );
}
