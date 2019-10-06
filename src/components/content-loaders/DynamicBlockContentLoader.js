import React from 'react'
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";
import { primaryColor, secondaryColor } from "./ContentLoaderColors";


function DynamicBlockContentLoader({ width, height }) {
    return (
        <ContentLoader
            height={height}
            width={width}
            speed={2}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
        >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
    )
}

DynamicBlockContentLoader.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
}

export default DynamicBlockContentLoader;