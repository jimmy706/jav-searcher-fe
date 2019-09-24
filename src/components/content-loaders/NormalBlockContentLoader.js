import React from 'react'
import ContentLoader from "react-content-loader";

export default function NormalBlockContentLoader() {
    return (
        <ContentLoader
            height={400}
            width={400}
            speed={2}
            primaryColor="#c0c0c0"
            secondaryColor="#ecebeb"
        >
            <rect x="0" y="0" rx="4" ry="4" width="200%" height="200%" />
        </ContentLoader>
    )
}
