import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardMedia, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        background: "#2C2C2C",
    }
});

export default function Movie({ movie }) {
    const classes = useStyles();
    return (
        <Link className="movie" to={"/movies/detail/" + movie.movieId}>
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    alt={movie.movieId}
                    image={"data:image/png;base64," + movie.movieImage.data}
                    title={movie.movieId}
                />
                <CardContent>
                    <Typography component="p">
                        {movie.movieId}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}
