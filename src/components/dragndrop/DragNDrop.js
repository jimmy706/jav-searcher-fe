import React, { Component, createRef } from 'react';

const canDragAndDrop = function () {
    let div = document.createElement('div');
    return (('dragable') in div || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();



export default class DnDArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            dragging: false
        }
    }


    dropRef = createRef();

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();

        /*  TODO:
            child elements inside our drag and drop div, the drag events will be fired on those nested elements as well. We want to keep track of the how many elements deep our cursor is, and only set call this.setState({dragging: false}) once our cursor is all the way out
        */
        this.dragCounter++;

        // allow drag        
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ dragging: true })
        }
    }

    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.dragCounter--;
        if (this.dragCounter > 0) return;

        // discard allow drag
        this.setState({ dragging: false })
    }

    //TODO: we need to prevent the default browser behavior on this event, which is to open the dropped file.
    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragging: false });
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.setState({ file: e.dataTransfer.files[0] }, () => {
                this.props.handleUploadFile(this.state.file);
            })
            e.dataTransfer.clearData();
            this.dragCounter = 0
        }
    }

    componentDidMount() {
        this.dragCounter = 0;
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    handleChange = (e) => {
        this.setState({ file: e.target.files[0] }, () => {
            this.props.handleUploadFile(this.state.file);
        });
    }


    render() {
        const { name, requried } = this.props;
        const { dragging, file } = this.state;
        const dragOverStyle = {
            backgroundColor: "#e0edf1"
        }
        return (
            <div className="dropbox" ref={this.dropRef} style={dragging ? dragOverStyle : {}}>
                <svg className="dropbox__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43"
                    viewBox="0 0 50 43">
                    <path
                        d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z">
                    </path>
                </svg>
                <input type="file" className="dropbox__file" id="file-uploader" name={name} requried={requried} onChange={this.handleChange} />
                <label htmlFor="file-uploader">
                    {
                        (file) ? (file.name) : (
                            <span>
                                <strong>Choose a file</strong> <span className="dropbox__dragndrop"
                                    style={{ display: canDragAndDrop ? "inline" : "none" }}> or drag it here</span>
                            </span>
                        )
                    }
                </label>
                <button className="dropbox__submit" type="submit">Upload</button>
            </div>
        )
    }
}
