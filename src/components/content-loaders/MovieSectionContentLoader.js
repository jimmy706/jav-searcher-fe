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
            <rect x="280" y="0" rx="4" ry="4" width="120" height="120" />
            <rect x="420" y="0" rx="4" ry="4" width="120" height="120" />
            <rect x="560" y="0" rx="4" ry="4" width="120" height="120" />
            <rect x="700" y="0" rx="4" ry="4" width="120" height="120" />
        </ContentLoader>
    )
}
