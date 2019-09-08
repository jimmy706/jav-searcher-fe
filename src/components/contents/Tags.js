import React, { Component } from 'react';
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import Tag from './section/tags-section/Tag';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TagsContentLoader from "../content-loaders/TagsContentLoader";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default class Tags extends Component {
    state = {
        tagTypes: []
    }

    componentDidMount() {
        axios.get(prefixUrl + "/tags/all-tag-type")
            .then(res => {
                this.setState({ tagTypes: res.data })
            })
            .catch(err => console.error(err));
    }

    renderTagType = () => {
        const { tagTypes } = this.state;
        if (tagTypes.length === 0) {
            return (<>
                <TagsContentLoader /> <TagsContentLoader />
            </>)
        }
        else {
            return tagTypes.map(tagType => {
                return (
                    <div className="section-container" key={tagType.id}>
                        <div className="title-wrapper">
                            <span className="section-title" title={tagType.type}>
                                {tagType.type}
                            </span>
                            <button className="transparent-btn">
                                <AddBoxIcon />
                            </button>
                        </div>
                        <div className="section-content">
                            {this.renderTags(tagType.tags)}
                        </div>
                    </div>
                )
            })
        }
    }

    renderTags = (tags) => {
        return tags.map(tag => <Tag key={tag.id} tag={tag.tag} />)
    }


    render() {
        return (
            <div>
                <div className="page-header">
                    <Link to="/" className="back-btn" title="Back to landing page">
                        <ArrowBackIcon />
                    </Link>
                    <span className="page-title">Tags:</span>
                </div>
                {this.renderTagType()}
            </div>
        )
    }
}
