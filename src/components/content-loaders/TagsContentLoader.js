import React from 'react';
import ContentLoader from "react-content-loader";

export default function TagsContentLoader() {
    return (
        <ContentLoader
            height={150}
            width={800}
            speed={2}
            primaryColor="#c0c0c0"
            secondaryColor="#ecebeb">
            <rect x="0" y="10" rx="4" ry="4" width="100" height="20" />
            <rect x="0" y="35" rx="0" ry="0" width="100%" height="1" />
            <rect x="780" y="14" rx="0" ry="0" width="12" height="12" />
            <rect x="0" y="50" rx="4" ry="4" width="100" height="38" />
            <rect x="115" y="50" rx="4" ry="4" width="100" height="38" />
            <rect x="115" y="50" rx="4" ry="4" width="100" height="38" />
            <rect x="230" y="50" rx="4" ry="4" width="100" height="38" />
            <rect x="345" y="50" rx="4" ry="4" width="100" height="38" />
            <rect x="460" y="50" rx="4" ry="4" width="100" height="38" />
            <rect x="575" y="50" rx="4" ry="4" width="100" height="38" />
            <rect x="690" y="50" rx="4" ry="4" width="100" height="38" />
        </ContentLoader>
    )
}
