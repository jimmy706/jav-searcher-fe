import React, { Component } from 'react';
import HistoryIcon from '@material-ui/icons/History';
import StarIcon from '@material-ui/icons/Star';
import MovieIcon from '@material-ui/icons/Movie';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import CategoryIcon from '@material-ui/icons/Category';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
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
                    studios: studioData.data.map(studio => studio.studioName).slice(0, 5)
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
                                    <GroupAddIcon /> New model
                                </button>
                            </li>
                            <li>
                                <Link to="/tags/all" title="tags">
                                    <CategoryIcon /> Tags
                                </Link>
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
                                <Link className="section-guide" to="/studios/all" title="Studios">
                                    <MovieIcon /> Studios:
                                </Link>
                            </li>
                            {this.renderLinkList("studios")}
                            <li>
                                <Link to="/studios/all" title="More...">
                                    More...
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="line" />
                        <ul className="sub-list">
                            <li>
                                <Link className="section-guide" to="/" title="Stars">
                                    <StarIcon />Starts:
                                </Link>
                            </li>
                            {this.renderLinkList("starts")}
                            <li>
                                <Link to="/">More...</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}
