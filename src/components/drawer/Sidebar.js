import React, { Component } from 'react';
import MovieIcon from '@material-ui/icons/Movie';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import CategoryIcon from '@material-ui/icons/Category';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from "react-router-dom";
import StudiosList from './StudiosList';
import StarsList from './StarsList';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
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
                                <Link to="/movies/all" title="Movies"><MovieIcon /> Movies</Link>
                            </li>
                            <li>
                                <Link to="/models/all" title="Models"><PeopleIcon /> Models</Link>
                            </li>
                            <li>
                                <Link to="/tags/all" title="tags">
                                    <CategoryIcon /> Tags
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="line" />
                        <StudiosList />
                    </li>
                    <li>
                        <div className="line" />
                        <StarsList />
                    </li>
                </ul>
            </div>
        )
    }
}
