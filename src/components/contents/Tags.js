import React, { Component } from 'react';
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import Tag from './section/tags-section/Tag';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import TagsContentLoader from "../content-loaders/TagsContentLoader";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Dialog, DialogActions, Button, DialogContent, TextField, Fab, DialogTitle } from "@material-ui/core";


export default class Tags extends Component {
    state = {
        tagTypes: [],
        openModal: false,
        tagTypeId: null,
        tagName: '',
        type: ''
    }

    handleCloseModal = () => {
        this.setState({
            openModal: false
        })
    }

    handleOpenModal = (tagTypeId) => {
        this.setState({ tagTypeId, openModal: true })
    }

    componentDidMount() {
        axios.get(prefixUrl + "/tags/all-tag-type")
            .then(res => {
                this.setState({ tagTypes: res.data })
            })
            .catch(err => console.error(err));
    }

    handleSubmit = () => {
        const { tagTypeId, tagName, type } = this.state;
        if (tagTypeId) {
            axios({
                url: prefixUrl + "/tags/add-tag/" + tagTypeId,
                method: "post",
                params: { tagName: tagName }
            })
                .then(res => {
                    this.setState((state) => {
                        return {
                            tagTypes: state.tagTypes.map(tagType => {
                                if (tagType.id === tagTypeId) {
                                    tagType.tags = [...res.data]
                                }
                                return tagType;
                            })
                        }
                    }, () => {
                        this.handleCloseModal();
                    })
                })
                .catch(err => console.log(err))
        }
        else {
            axios({
                url: prefixUrl + "/tags/add-tag-type",
                method: 'post',
                params: { type: type }
            })
                .then(res => {
                    this.setState((state) => {
                        return {
                            tagTypes: state.tagTypes.concat(res.data)
                        }
                    }, () => {
                        this.handleCloseModal();
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    handleChangeValueInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
                            <button className="transparent-btn" onClick={() => this.handleOpenModal(tagType.id)}>
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

    renderTextField = () => {
        const { tagTypeId } = this.state;
        if (tagTypeId) {
            return (
                <TextField
                    autoFocus
                    margin="normal"
                    id="tagName"
                    name="tagName"
                    label="Tag name"
                    type="text"
                    fullWidth
                    onChange={this.handleChangeValueInput}
                    autoComplete="off"
                />
            )
        }
        else {
            return (
                <TextField
                    autoFocus
                    margin="normal"
                    id="tagType"
                    name="type"
                    label="Tag type"
                    type="text"
                    fullWidth
                    onChange={this.handleChangeValueInput}
                    autoComplete="off"
                />
            )
        }
    }


    render() {
        const { openModal, tagTypeId } = this.state;
        return (
            <div>
                <div className="page-header">
                    <Link to="/" className="back-btn" title="Back to landing page">
                        <ArrowBackIcon />
                    </Link>
                    <span className="page-title">Tags:</span>
                    <div className="interact-area">
                        <Fab color="primary" size="small" title="Add tag type" onClick={() => this.handleOpenModal(null)}>
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
                {this.renderTagType()}

                <Dialog open={openModal} onClose={this.handleCloseModal} >
                    <DialogTitle>{(tagTypeId) ? "Add new tag:" : "Add tag type"}</DialogTitle>
                    <DialogContent>
                        {this.renderTextField()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseModal} color="default">
                            Cancel
                     </Button>
                        <Fab variant="extended" onClick={this.handleSubmit} color="primary" size="medium">
                            Add new
                    </Fab>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
