import React from 'react';
import sectionTypes from "../../constant/sections";
import SectionContainer from './section/SectionContainer';
import ModelsSectionContainer from './section/models-section/ModelsSectionContainer';

export default function Landing() {
    return (
        <div>
            <SectionContainer sectionType={sectionTypes.MODEL}
                content={<ModelsSectionContainer
                    numberOfModels={14} page={1} />} />
        </div>
    )
}
