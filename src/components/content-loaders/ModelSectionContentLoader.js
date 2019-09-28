import React from 'react';
import ContentLoader from "react-content-loader";

export default function ModelSectionContentLoader() {
    return (
        <ContentLoader
            height={200}
            width={800}
            speed={2}
            primaryColor="#c0c0c0"
            secondaryColor="#ecebeb">
            <rect x="0" y="0" rx="4" ry="4" width="100" height="150" />
            <rect x="120" y="0" rx="4" ry="4" width="100" height="150" />
            <rect x="240" y="0" rx="4" ry="4" width="100" height="150" />
            <rect x="360" y="0" rx="4" ry="4" width="100" height="150" />
            <rect x="480" y="0" rx="4" ry="4" width="100" height="150" />
            <rect x="600" y="0" rx="4" ry="4" width="100" height="150" />
        </ContentLoader>
    )
}
