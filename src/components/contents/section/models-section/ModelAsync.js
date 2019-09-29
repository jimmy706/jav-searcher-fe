import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CardMedia, makeStyles } from "@material-ui/core";
import prefixUrl from "../../../../constant/prefix-url";
import { Link } from "react-router-dom";
import axios from "axios";
import NormalBlockContentLoader from "../../../content-loaders/NormalBlockContentLoader";

const useStyles = makeStyles({
    card: {
        background: "#040E17",
    }
});

export default function ModelAsync({ modelName }) {
    let [modelInfo, setModelInfo] = useState({});

    useEffect(() => {
        let isFetched = true;  // TODO: handle cancel promise if this component unmouted
        axios.get(prefixUrl + "/models/get-model-by-name?name=" + modelName)
            .then(res => {
                if (isFetched)
                    setModelInfo(res.data);
            })
            .catch(console.log);
        return () => { isFetched = false }
    }, [modelInfo.id]); // TODO: will not recall until modelInfo.id changed

    const classes = useStyles();

    return (
        <Link to={"/models/detail/" + modelInfo.id} className="model">
            <Card className={classes.card}>
                {
                    (modelInfo.avatar) ? (<CardMedia
                        component="img"
                        alt={modelInfo.name}
                        image={prefixUrl + modelInfo.avatar}
                        title={modelInfo.name}
                    />) : <NormalBlockContentLoader />
                }
                <CardContent>
                    <Typography component="p">
                        {modelName}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}
