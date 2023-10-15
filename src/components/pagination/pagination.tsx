'use client';
import { Pagination } from "react-bootstrap"

const renderPagination = (currentPage: any, numberPage: any, setCurrentPage: any) => {
    if (numberPage <= 7) {
        let paginate: any = [];
        for (let i = 1; i <= numberPage; i++) {
            paginate = [...paginate, <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>{i}</Pagination.Item>]
        }
        return paginate;
    } else {
        return (
            <>
                <Pagination.Item onClick={() => setCurrentPage(1)} active={1 === currentPage} >{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item active={10 === currentPage} >{10}</Pagination.Item>
                <Pagination.Item active={11 === currentPage} >{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item active={13 === currentPage} >{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => setCurrentPage(numberPage)} active={numberPage === currentPage} >{numberPage}</Pagination.Item>
            </>
        )
    }
}

const PaginationBar = (props: any) => {
    const { currentPage, numberPage, setCurrentPage } = props;
    return (
        <>
            {!(numberPage > 1) ?
                <></> :
                <Pagination className="d-flex align-item-center justify-content-center">
                    <Pagination.First onClick={() => setCurrentPage(1)} />
                    <Pagination.Prev onClick={() => {
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }} />
                    {
                        renderPagination(currentPage, numberPage, setCurrentPage)
                    }
                    <Pagination.Next onClick={() => setCurrentPage(numberPage)} />
                    <Pagination.Last onClick={() => {
                        if (currentPage < numberPage) setCurrentPage(currentPage + 1)
                    }} />
                </Pagination>
            }
        </>
    )
}

export default PaginationBar