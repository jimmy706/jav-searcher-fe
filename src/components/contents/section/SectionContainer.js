import React from 'react';
import { Link } from "react-router-dom";

export default function SectionContainer({ sectionType, content }) {

    return (
        <div className="section-container">
            <div className="title-wrapper">
                <span className="section-title" title={sectionType.title}>{sectionType.title + ":"}</span>
                <Link to={sectionType.url} title="More">More...</Link>
            </div>
            <div className="section-content">
                {content}
            </div>
        </div>
    )
}
