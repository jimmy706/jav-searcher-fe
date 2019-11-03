import React, { useState, useEffect } from 'react';
import prefixUrl from "../../constant/prefix-url";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieIcon from '@material-ui/icons/Movie';
import { updateStudioFilterAct } from "../../actions/filterMovies.action";
import { connect } from "react-redux";

function StudiosList(props) {
    let [studios, setStudios] = useState(["Tokyo Hot", "Caribbean"]);
    let [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (!isLoaded) {
            axios.get(prefixUrl + "/studios/all")
                .then((studioData) => {
                    setIsLoaded(true);
                    setStudios(studioData.data.map(studio => studio.studioName).slice(0, 5));
                })
                .catch(err => console.log(err));
        }
    }, [isLoaded])

    const renderList = () => {
        return studios.map((studio, index) => (
            <li key={"studio-" + index}>
                <Link onClick={() => props.updateStudioFilter(studio)} to={`/movies/all?studio=${studio}`} title={studio}>{studio}</Link>
            </li>
        ))

    }




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

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudioFilter: (studio) => dispatch(updateStudioFilterAct(studio))
    }
}

export default connect(null, mapDispatchToProps)(StudiosList);