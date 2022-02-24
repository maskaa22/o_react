import './Pagination.css'
import {APIServise} from "../servises";
import {useDispatch, useSelector} from "react-redux";

export function PaginationProductCategory ({paginate, category_id, setFilter})
{
    // console.log(paginate);
    const filterFlag = useSelector(state => state.product.filterFlag);

    const dispatch = useDispatch();
    const pageCount = Math.ceil(paginate.total / paginate.limit);
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return(
            <div className={'paginate'}>
                {
                    pages.map((page,index )=>
                        <div className={'page'} key={index}  onClick={() =>
                        {
                            dispatch(APIServise.categoriesFilter(category_id, page, 2)).then(response => {
                                setFilter(response.data.docs)
                            })
                        }}>{page}</div>
                    )
                }
            </div>
    );
}
