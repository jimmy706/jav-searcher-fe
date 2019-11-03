import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, FormControlLabel, FormControl, Checkbox, Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, TextField } from "@material-ui/core";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import prefixUrl from "../../constant/prefix-url";


export default class AddToCollectionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            collectionName: ''
        }
    }

    async componentDidMount() {
        let collections = JSON.parse(localStorage.getItem("collections"));
        let collectionContainMovie = await axios.get(`${prefixUrl}/collections/collections-contain-movie?movieId=${this.props.movieId}`);
        if (!collections) {
            let collectionData = await axios(`${prefixUrl}/collections/all`);
            collections = collectionData.data
            localStorage.setItem("collections", JSON.stringify(collections));

        }

        this.setState({
            collections: collections.map(collection => ({
                id: collection.id,
                collectionName: collection.collectionName,
                isChecked: collectionContainMovie.data.findIndex(coll => coll.id === collection.id) !== -1
            }))
        })

    }

    handleCheckBoxChange = (collectionId) => {
        this.setState(state => {
            return {
                collections: state.collections.map(coll => {
                    if (coll.id === collectionId) {
                        if (!coll.isChecked) { // TODO: add to collection if not checked
                            axios({
                                url: `${prefixUrl}/collections/add-movie/${collectionId}`,
                                params: {
                                    movieId: this.props.movieId
                                },
                                method: 'put'
                            })
                        }
                        else { // TODO: remove from collection if checked
                            axios({
                                url: `${prefixUrl}/collections/remove-movie/${collectionId}`,
                                params: {
                                    movieId: this.props.movieId
                                },
                                method: 'put'
                            })
                        }
                        return { ...coll, isChecked: !coll.isChecked }
                    }
                    else {

                        return { ...coll }
                    }
                })
            }
        })
    }

    renderCollections = () => {
        return this.state.collections.map(collection => (
            <FormControlLabel key={collection.id}
                control={<Checkbox value={collection.id} onChange={() => this.handleCheckBoxChange(collection.id)} checked={collection.isChecked} />}
                label={collection.collectionName}
            />
        ))
    }

    handleChangeName = (e) => {
        this.setState({ collectionName: e.target.value })
    }

    handleCreateNewCollection = () => {
        const { collectionName } = this.state;
        if (collectionName.trim !== '') {
            axios({
                url: `${prefixUrl}/collections/add`,
                method: 'post',
                params: {
                    collectionName: collectionName
                }
            })
                .then(newCollection => {
                    this.setState(state => {
                        return {
                            collections: [...state.collections, { id: newCollection.id, collectionName: newCollection.collectionName, isChecked: true }]
                        }
                    }, () => {
                        // TODO: Add movie to new collection
                        localStorage.setItem("collections", JSON.stringify(this.state.collections));
                        axios({
                            url: `${prefixUrl}/collections/add-movie/${newCollection.data.id}`,
                            params: {
                                movieId: this.props.movieId
                            },
                            method: 'put'
                        })
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(console.log);
                    })
                })
                .catch(err => console.log(err.response));
        }
    }



    render() {
        return (
            <div>
                <DialogTitle>
                    Add movie to...
                </DialogTitle>
                <DialogContent dividers={true}>
                    <FormControl style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {this.renderCollections()}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <ExpansionPanel style={{ boxShadow: "unset" }}>
                        <ExpansionPanelSummary style={{ display: "flex", justifyContent: "center" }}>
                            <Button className="transparent-btn"><AddIcon style={{ marginRight: "10px" }} /> Create new collection</Button>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ display: "block", padding: "0 10px" }}>
                            <TextField onChange={this.handleChangeName}
                                name="collectionName"
                                fullWidth label="Collection name" margin="normal"
                                autoComplete="off" />
                            <Button onClick={this.handleCreateNewCollection}>Create new</Button>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </DialogActions>
            </div>
        )
    }
}
