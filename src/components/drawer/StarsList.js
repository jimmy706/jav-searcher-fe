import React, { useState, useEffect } from 'react';
import prefixUrl from "../../constant/prefix-url";
import axios from "axios";
import { Link } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';

export default function StarsList() {
    let [stars, setStars] = useState(["MVSD-123", "NHDTB-112", "Tokyo Hot n0686"]);
    let [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (!isLoaded) {
            axios(`${prefixUrl}/stars/get-lasted?type=MOVIE&limit=5`)
                .then(stars => {
                    setIsLoaded(true);
                    setStars(stars.data);
                })
                .catch(console.log)
        }
    }, [isLoaded]);



    function renderList() {
        return stars.map((star, index) => {
            switch (star.type) {
                case "MODEL":
                    return (
                        <li key={"model-star" + index}>
                            <Link to={`/models/detail/${star.itemId}`} title={star.itemId}>{star.itemId}</Link>
                        </li>
                    )
                default: // TODO: type = "MOVIE"
                    return (
                        <li key={"movie-star" + index}>
                            <Link to={`/movies/detail/${star.itemId}`} title={star.itemId}>{star.itemId}</Link>
                        </li>
                    )
            }
        })
    }

    return (
        <ul className="sub-list">
            <li>
                <Link className="section-guide" to="/" title="Stars">
                    <StarIcon />Stars:
                </Link>
            </li>
            {renderList()}
            <li>
                <Link to="/">More...</Link>
            </li>
        </ul>
    )
}
