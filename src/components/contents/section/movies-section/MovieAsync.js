import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardMedia, makeStyles } from "@material-ui/core";
import prefixUrl from "../../../../constant/prefix-url";
import axios from "axios";
import DynamicBlockContentLoader from "../../../content-loaders/DynamicBlockContentLoader";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    card: {
        background: "#2C2C2C",
    }
});

export default function MovieAsync({ movieId }) {
    const classes = useStyles();
    let [movieImage, setMovieImage] = React.useState("");
    let [isFetched, setIsFetched] = React.useState(false);
    React.useEffect(() => {
        if (!isFetched) {
            axios(prefixUrl + "/movies/get-movie-image/" + movieId)
                .then(res => {
                    setMovieImage(res.data.movieImage);
                    setIsFetched(true);
                })
                .catch(console.log)
        }
        // eslint-disable-next-line
    }, [isFetched]);

    function renderMovieImage() {
        if (movieImage) {
            return (
                <CardMedia
                    component="img"
                    alt={movieId}
                    image={movieImage}
                    title={movieId}
                />
            )
        }
        else
            return <DynamicBlockContentLoader width={250} height={120} />;
    }

    return (
        <Link className="movie" to={"/movies/detail/" + movieId}>
            <Card className={classes.card}>
                {renderMovieImage()}
                <CardContent>
                    <Typography component="p">
                        {movieId}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

MovieAsync.propTypes = {
    movieId: PropTypes.string
}
