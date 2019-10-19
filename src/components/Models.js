import React, { useState } from 'react';
import PageHeader from './contents/headers/PageHeader';
import queryString from "query-string";
import ModelsSectionContainer from "./contents/section/models-section/ModelsSectionContainer";
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from "react-router-dom";

export default function Models(props) {
    const params = queryString.parse(props.history.search);
    const { page } = params;
    let [size, setSize] = useState(20);
    axios(`${prefixUrl}/models/count-all`)
        .then(res => setSize(res.data))
        .catch(console.log);


    const toPrevPage = () => {
        props.history.push(`/movies/all?page=${page - 1}`);
    }

    const toNextPage = () => {
        props.history.push(`/movies/all?page=${page + 1}`);
    }

    function renderPagination() {
        const numberOfPage = Math.ceil(size / 20);
        const currentPage = page ? page : 1;
        let paginations = [];
        for (let i = 1; i <= numberOfPage; i++) {
            paginations.push(
                <li className={"page-item " + (i === currentPage ? "active" : "")} key={i}>
                    <Link className="page-link" to={"/models/all?page=" + i}>{i}</Link>
                </li>)
        }
        paginations.unshift(<li
            key="prev"
            className={"page-item " + (currentPage === 1 ? "disable" : "")}
            onClick={toPrevPage}>
            <KeyboardArrowLeftIcon />
        </li>);
        paginations.push(<li
            key="next"
            className={"page-item " + (currentPage === numberOfPage ? "disable" : "")}
            onClick={toNextPage}>
            <KeyboardArrowRightIcon />
        </li>)
        return paginations;
    }

    return (
        <div>
            <PageHeader title="Models" history={props.history} ></PageHeader>
            <div className="models-container" style={{ marginTop: "30px" }}>
                <ModelsSectionContainer numberOfModels={20} page={page ? page : 1} />
                <ul className="pagination">
                    {renderPagination()}
                </ul>
            </div>
        </div>
    )
}
