import React, { Component, Suspense } from 'react';
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import Tag from './contents/section/tags-section/Tag';
import AddIcon from '@material-ui/icons/Add';
import TagsContentLoader from "./content-loaders/TagsContentLoader";
import { Dialog, DialogActions, Button, DialogContent, TextField, Fab, DialogTitle } from "@material-ui/core";
import TagPageContentLoader from "./content-loaders/TagPageContentLoader";
import PageHeader from "./contents/headers/PageHeader";
const TagContainer = React.lazy(() => import("./contents/section/tags-section/TagContainer"));


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
        if (tagTypes.length) {
            return tagTypes.map(tagType => (
                <Suspense key={tagType.id} fallback={<TagsContentLoader />}>
                    <TagContainer tagType={tagType} handleOpenModal={this.handleOpenModal} />
                </Suspense>
            ))
        }
        return <TagPageContentLoader />;
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
                <PageHeader title="Tags" history={this.props.history}>
                    <Fab color="primary" size="small" title="Add tag type" onClick={() => this.handleOpenModal(null)}>
                        <AddIcon />
                    </Fab>
                </PageHeader>
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
