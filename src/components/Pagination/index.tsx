import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrPage } from '../../redux/filter/filterSlice';
import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
    const currPage = useSelector((state: any) => state.filter.currPage);
    const dispatch = useDispatch();
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => dispatch(setCurrPage(e.selected + 1))}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currPage - 1}
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
