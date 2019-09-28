import React from 'react'
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";


function DynamicBlockContentLoader({ width, height }) {
    return (
        <ContentLoader
            height={height}
            width={width}
            speed={2}
            primaryColor="#c0c0c0"
            secondaryColor="#ecebeb"
        >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
    )
}

DynamicBlockContentLoader.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
}

export default DynamicBlockContentLoader;