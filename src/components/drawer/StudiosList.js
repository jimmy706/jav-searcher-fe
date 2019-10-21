import React, { useState } from 'react';
import prefixUrl from "../../constant/prefix-url";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieIcon from '@material-ui/icons/Movie';


export default function StudiosList() {
    let [studios, setStudios] = useState(["Tokyo Hot", "Caribbean"]);

    const renderList = () => {
        return studios.map((studio, index) => (
            <li key={"studio-" + index}>
                <Link to={`/movies/all?studio=${studio}`} title={studio}>{studio}</Link>
            </li>
        ))

    }


    axios.get(prefixUrl + "/studios/all")
        .then((studioData) => {
            setStudios(studioData.data.map(studio => studio.studioName).slice(0, 5));
        })
        .catch(err => console.log(err));

    return (
        <ul className="sub-list">
            <li>
                <Link className="section-guide" to="/studios/all" title="Studios">
                    <MovieIcon /> Studios:
                </Link>
            </li>
            {renderList()}
            <li>
                <Link to="/studios/all" title="More...">
                    More...
                </Link>
            </li>
        </ul>
    )
}
