import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CardMedia, makeStyles } from "@material-ui/core";
import prefixUrl from "../../../../constant/prefix-url";
import { Link } from "react-router-dom";
import axios from "axios";
import DynamicBlockContentLoader from "../../../content-loaders/DynamicBlockContentLoader";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    card: {
        background: "#2C2C2C",
    }
});

export default function ModelAsync({ modelId }) {
    let [modelInfo, setModelInfo] = useState({});

    useEffect(() => {
        let isFetched = true;  // TODO: handle cancel promise if this component unmouted
        axios.get(prefixUrl + "/models/get-model-avatar?modelId=" + modelId)
            .then(res => {
                if (isFetched)
                    setModelInfo(res.data);
            })
            .catch(console.log);
        return () => { isFetched = false }
        // eslint-disable-next-line 
    }, [modelInfo.id]); // TODO: will not recall until modelInfo.id changed

    const classes = useStyles();

    return (
        <Link to={"/models/detail/" + modelInfo.id} className="model">
            <Card className={classes.card}>
                {
                    (modelInfo.avatar) ? (<CardMedia
                        component="img"
                        alt={modelInfo.name}
                        image={modelInfo.avatar}
                        title={modelInfo.name}
                    />) : <DynamicBlockContentLoader width={250} height={120} />
                }
                <CardContent>
                    <Typography component="p">
                        {modelInfo.name ? modelInfo.name : null}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

ModelAsync.propTypes = {
    modelId: PropTypes.string.isRequired
}
