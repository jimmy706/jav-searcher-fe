import React from 'react';
import ContentLoader from "react-content-loader";
import { primaryColor, secondaryColor } from "./ContentLoaderColors";


export default function SmallBlockContentLoader() {
    return (
        <ContentLoader
            height={80}
            width={200}
            speed={2}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
        >
            <rect x="0" y="0" rx="4" ry="4" width="200" height="60" />
        </ContentLoader>
    )
}