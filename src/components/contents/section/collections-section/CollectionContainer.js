import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from "axios";
import prefixUrl from "../../../../constant/prefix-url";
import SmallBlockContentLoader from "../../../content-loaders/SmallBlockContentLoader";
import { connect } from "react-redux";
import { openSnackbarAction } from "../../../../actions/snackbar.action";
const Collection = lazy(() => import("./Collection"));

function CollectionContainer(props) {
    let [collections, setCollections] = useState([]);
    let [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            axios(`${prefixUrl}/collections/all`)
                .then(collections => {
                    setIsLoaded(true);
                    setCollections(collections.data);
                    if (!localStorage.getItem("collections")) {
                        localStorage.setItem("collections", JSON.stringify(collections.data));
                    }
                })
                .catch(console.log);
        }
    }, [isLoaded]);

    function onDeleteCollection(deletedId) {
        setCollections(collections.filter(collection => collection.id !== deletedId));
        axios.delete(`${prefixUrl}/collections/delete/${deletedId}`)
            .then(deleteMessage => {
                localStorage.setItem("collections", JSON.stringify(collections));
                props.openSnackbar(deleteMessage.data, "success");
            })
            .catch(console.log);
    }

    function renderCollections() {
        return collections.map(collection => (
            <Suspense key={collection.id} fallback={<SmallBlockContentLoader />}>
                <Collection collection={collection} onDeleteCollection={onDeleteCollection} />
            </Suspense>
        ))
    }

    return (
        <div className="collections-section section-container">
            <div className="title-wrapper">
                <span className="section-title" title="Collections">Collections:</span>
            </div>
            <div className="section-content">
                {renderCollections()}
            </div>
        </div>
    )
}

const mapDispatchToProp = (dispatch) => {
    return {
        openSnackbar: (message, variant) => dispatch(openSnackbarAction(message, variant))
    }
}

export default connect(null, mapDispatchToProp)(CollectionContainer);