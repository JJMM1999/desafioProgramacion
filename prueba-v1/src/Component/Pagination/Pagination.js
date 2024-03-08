import React from 'react'
import ReactPaginate from 'react-paginate';
const Pagination = ({info,setPageNumber, pageNumber}) => {
    
    return (        
        <ReactPaginate
            className='pagination justify-content-center gap-4 my-4'
            forcePage={pageNumber ===1?0: pageNumber -1}
            nextLabel = "Siguiente"
            previousLabel = "Anterior"
            nextClassName='btn btn-primary'
            previousClassName='btn btn-primary'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            onPageChange={(data) => {
                setPageNumber(data.selected+1);
            }}
            pageCount={info?.pages} />
)
}

export default Pagination
