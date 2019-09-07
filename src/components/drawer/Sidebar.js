import React, { Component } from 'react';
import HistoryIcon from '@material-ui/icons/History';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import StarIcon from '@material-ui/icons/Star';
import MovieIcon from '@material-ui/icons/Movie';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from "react-router-dom";
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            studios: ["Tokyo Hot", "Caribbean"],
            starts: ["MVSD-123", "NHDTB-112", "Tokyo Hot n0686"]
        }
    }

    componentDidMount() {
        axios.get(prefixUrl + "/studios/all")
            .then((studioData) => {
                this.setState({
                    studios: studioData.data.map(studio => studio.stdudioName).slice(0, 5)
                })
            })
            .catch(err => console.log(err));
    }

    renderLinkList = (type) => {
        switch (type) {
            case "studios":
                return this.state.studios.map((studio, index) => (
                    <li key={"studio-" + index}>
                        <Link to="/" title={studio}>{studio}</Link>
                    </li>
                ))
            case "starts":
                return this.state.starts.map((start, index) => (
                    <li key={"start-" + index}>
                        <Link to="/" title={start}>{start}</Link>
                    </li>))
            default:
                return [];
        }
    }

    static getDerivedStateFromProps(nextProps, currentState) {
        if (currentState.isOpen !== nextProps.open) {
            return {
                isOpen: nextProps.open
            }
        }
        else {
            return null;
        }
    }

    render() {
        const { toggleModal } = this.props;
        return (
            <div className={"sidebar " + (this.state.isOpen ? "open" : "")}>
                <ul className="sidebar-content">
                    <li>
                        <div className="line" />
                        <ul className="sub-list">
                            <li>
                                <button className="transparent-btn" onClick={() => toggleModal('MOVIE')}>
                                    <AddToQueueIcon /> New movie
                                </button>
                            </li>
                            <li>
                                <button className="transparent-btn" onClick={() => toggleModal('MODEL')}>
                                    <PersonAddIcon /> New model
                                </button>
                            </li>
                            <li>
                                <a href="/" >
                                    <FindInPageIcon /> Advance search
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <HistoryIcon /> History
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="line" />
                        <ul className="sub-list">
                            <li>
                                <a className="section-guide" href="/" title="Studios">
                                    <MovieIcon /> Studios:
                                </a>
                            </li>
                            {this.renderLinkList("studios")}
                            <li>
                                <a href="/">More...</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="line" />
                        <ul className="sub-list">
                            <li>
                                <a className="section-guide" href="/" title="Stars">
                                    <StarIcon />Starts:
                                </a>
                            </li>
                            {this.renderLinkList("starts")}
                            <li>
                                <a href="/">
                                    More...
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}
