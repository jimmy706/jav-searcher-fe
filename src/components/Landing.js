import React from 'react';
import sectionTypes from "../constant/sections";
import SectionContainer from './contents/section/SectionContainer';
import ModelsSectionContainer from './contents/section/models-section/ModelsSectionContainer';
import MoviesSectionContainer from './contents/section/movies-section/MoviesSectionContainer';

export default function Landing() {
    return (
        <div>
            <SectionContainer sectionType={sectionTypes.MODEL}
                content={<ModelsSectionContainer
                    numberOfModels={14} page={1} />} />

            <SectionContainer sectionType={sectionTypes.MOVIES}
                content={
                    <MoviesSectionContainer
                        numberOfMovies={10} page={1} />
                } />
        </div>
    )
}
