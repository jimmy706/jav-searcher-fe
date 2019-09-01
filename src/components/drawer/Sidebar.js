import React, { Component } from 'react'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            isOpen: nextProps.open
        }
    }

    render() {
        return (
            <div className={"sidebar " + (this.state.isOpen ? "open" : "")}>
                sidebar
            </div>
        )
    }
}
