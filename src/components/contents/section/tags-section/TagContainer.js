import React from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tag from "./Tag";
import PropTypes from "prop-types";

export default function TagContainer({ tagType, handleOpenModal }) {
    function renderTags() {
        return tagType.tags.map(tag => <Tag key={tag} tag={tag} />)
    }

    return (
        <div className="section-container" key={tagType.id}>
            <div className="title-wrapper">
                <span className="section-title" title={tagType.type}>
                    {tagType.type}
                </span>
                <button className="transparent-btn" onClick={() => handleOpenModal(tagType.id)}>
                    <AddBoxIcon />
                </button>
            </div>
            <div className="section-content">
                {renderTags()}
            </div>
        </div>
    )
}

TagContainer.propTypes = {
    tagType: PropTypes.object.isRequired
}