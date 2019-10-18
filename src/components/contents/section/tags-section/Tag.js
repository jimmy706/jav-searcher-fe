import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { updateTagsFilterAct } from "../../../../actions/filterMovies.action";

function Tag(props) {
    return (
        <Link className="tag"
            onClick={() => props.updateTagsFilter(props.tag)}
            to={"/movies/all?tags=" + props.tag}>
            {props.tag}
        </Link>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        updateTagsFilter: (tag) => dispatch(updateTagsFilterAct([tag]))
    }
}

export default connect(null, mapDispatchToProps)(Tag);
