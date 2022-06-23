import './qq.css'
import {APIServise} from "../servises";
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from 'react-paginate';
import {delCategory} from "../reducers/actionCreators";
import {useEffect} from "react";


export function PaginationProductCategory ({paginate, category_id, setFilter, setOffset, offset, thisPage})
{


     // console.log(offset);
     const filterFlag = useSelector(state => state.product.filterFlag);
    const categoryFlag = useSelector(state => state.product.categoryFlag);
// console.log(categoryFlag);
    const dispatch = useDispatch();

//     useEffect((e) => {
// handlePageClick(e)
//     }, [])

    const pageCount = Math.ceil(paginate.total / paginate.limit);
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }



    function handlePageClick (e) {
        // console.log(e);
        const selectedPage = e.selected;
          // console.log(selectedPage+1);
        !filterFlag &&
        thisPage(selectedPage+1)
        filterFlag &&

            dispatch(APIServise.categoriesFilter(category_id, selectedPage+1, 2)).then(response => {

                thisPage(selectedPage+1)
                setFilter(response.data.docs)
            })

             // setOffset(selectedPage + 1)

            dispatch(delCategory())

    }
    function qq (e) {

         const sel = e.selected;
        //console.log(sel+1);

    }


    return(
            <div className={'paginate'}>

                <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={">"}
                        forcePage={offset}
                        pageCount={pageCount}
                         onClick={qq}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        selectedPageRel={"canonical"}
                />

                {/*{*/}
                {/*    !categoryFlag && <ReactPaginate*/}
                {/*        previousLabel={'<'}*/}
                {/*        nextLabel={">"}*/}
                {/*        // breakLabel=""*/}
                {/*        // breakClassName={"break-me"}*/}
                {/*        pageCount={pageCount}*/}
                {/*        // marginPagesDisplayed={2}*/}
                {/*        // pageRangeDisplayed={4}*/}
                {/*        onPageChange={handlePageClick2}*/}
                {/*        containerClassName={"pagination"}*/}
                {/*        subContainerClassName={"pages pagination"}*/}
                {/*        activeClassName={"active"}/>*/}
                {/*}*/}




                {/*{*/}
                {/*    pages.map((page,index )=>*/}
                {/*        <div className={'page'} key={index}  onClick={() =>*/}
                {/*        {*/}
                {/*            dispatch(APIServise.categoriesFilter(category_id, page, 2)).then(response => {*/}
                {/*                setFilter(response.data.docs)*/}
                {/*            })*/}
                {/*        }}>{page}</div>*/}
                {/*    )*/}
                {/*}*/}
            </div>
    );
}
