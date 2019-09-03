import React from 'react';
import sectionTypes from "../../constant/sections";
import SectionContainer from './section/SectionContainer';

export default function Landing() {
    return (
        <div>
            <SectionContainer sectionType={sectionTypes.MODEL} />
        </div>
    )
}
