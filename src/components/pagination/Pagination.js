import React from 'react';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from "prop-types";

export default function Pagination(props) {

    // TODO: make sure currentPage and size vaiables is integer
    const currentPage = parseInt(props.currentPage);
    const size = parseInt(props.size);
    const numberOfPage = Math.ceil(size / 20);

    function changePage(page) {
        props.onChangePage(page);
    }

    function renderPagination() {

        let paginations = [];
        for (let i = 1; i <= numberOfPage; i++) {
            paginations.push(
                <li className={"page-item " + (i === currentPage ? "active" : "")} key={i}
                    onClick={() => changePage(i)}>
                    {i}
                </li>)
        }
        return paginations;
    }

    return (
        <ul className="pagination">
            <li
                className={"page-item " + (currentPage === 1 ? "disable" : "")}
                onClick={() => changePage(currentPage - 1)}>
                <KeyboardArrowLeftIcon />
            </li>
            {renderPagination()}
            <li
                className={"page-item " + (currentPage === numberOfPage ? "disable" : "")}
                onClick={() => changePage(currentPage + 1)}>
                <KeyboardArrowRightIcon />
            </li>
        </ul>
    )
}

Pagination.propTypes = {
    size: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func
}