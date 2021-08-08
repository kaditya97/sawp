import React, { Component } from 'react'

class Back extends Component {

    render() {
        const { onClick } = this.props;
        return (
            <button
                className="btn btn-secondary float-right"
                onClick={onClick}
            >
                <i className="fas fa-angle-double-left"></i>&nbsp; <span>Back</span>
            </button>
        )
    }
}

export default Back;
