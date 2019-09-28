import React from 'react';
import ContentLoader from "react-content-loader";

export default function MovieSectionContentLoader() {
    return (
        <ContentLoader
            height={200}
            width={800}
            speed={2}
            primaryColor="#c0c0c0"
            secondaryColor="#ecebeb">
            <rect x="0" y="0" rx="4" ry="4" width="120" height="120" />
            <rect x="140" y="0" rx="4" ry="4" width="120" height="120" />
            <rect x="180" y="0" rx="4" ry="4" width="120" height="120" />
            <rect x="320" y="0" rx="4" ry="4" width="120" height="120" />
            <rect x="460" y="0" rx="4" ry="4" width="120" height="120" />
            <rect x="600" y="0" rx="4" ry="4" width="120" height="120" />
        </ContentLoader>
    )
}
