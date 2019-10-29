import React, { useState, useEffect } from 'react';
import PageHeader from './contents/headers/PageHeader';
import queryString from "query-string";
import ModelsSectionContainer from "./contents/section/models-section/ModelsSectionContainer";
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import Pagination from './pagination/Pagination';

export default function Models(props) {
    const params = queryString.parse(props.history.search);
    let [size, setSize] = useState(20);
    let [isFetched, setIsFetched] = useState(false);
    let [page, setPage] = useState(params.page ? params.page : 1);

    useEffect(() => {
        if (!isFetched) {
            axios(`${prefixUrl}/models/count-all`)
                .then(res => {
                    setSize(res.data);
                    setIsFetched(true);
                })
                .catch(console.log);
        }
    }, [isFetched])


    function handleChangePage(page) {
        setPage(page);
        props.history.push(`/models/all?page=${page - 1}`);
    }

    return (
        <div>
            <PageHeader title="Models" history={props.history} ></PageHeader>
            <div className="models-container" style={{ marginTop: "30px" }}>
                <ModelsSectionContainer numberOfModels={20} page={page ? page : 1} />
                <Pagination size={size} currentPage={page} onChangePage={handleChangePage} />
            </div>
        </div>
    )
}
