import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardMedia, makeStyles } from "@material-ui/core";
import prefixUrl from "../../../../constant/prefix-url";


const useStyles = makeStyles({
    card: {
        background: "#040E17",
    }
});
export default function Model({ model }) {
    const classes = useStyles();

    return (
        <Link to="/" className="model">
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    alt={model.name}
                    image={prefixUrl + model.avatar}
                    title={model.name}
                />
                <CardContent>
                    <Typography component="p">
                        {model.name}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}
