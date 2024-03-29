import ReactPaginate from 'react-paginate';
import {useDispatch, useSelector} from "react-redux";

import './Pagination.css';
import './Pagination@media.css';
import {categoriesFilter} from "../../servises";

export function PaginationProductCategory({paginate, category_id, setFilter, thisPage}) {

    const filterFlag = useSelector(state => state.product.filterFlag);

    const dispatch = useDispatch();

    const pageCount = Math.ceil(paginate.total / paginate.limit);

    function handlePageClick(e) {
        const selectedPage = e.selected;

        !filterFlag &&
        thisPage(selectedPage + 1);
        filterFlag &&
        dispatch(categoriesFilter(category_id, selectedPage + 1, 10)).then(response => {
            thisPage(selectedPage + 1);
            setFilter(response.data.docs);
        });
    }

    return (
        <div className={'paginate'}>
            {
                !isNaN(pageCount) && <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    selectedPageRel={"canonical"}
                />
            }
        </div>
    );
}
