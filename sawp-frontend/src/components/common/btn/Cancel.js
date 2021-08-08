import React, { Component } from 'react'

class Cancel extends Component {
    render() {
        const { onClick } = this.props;
        return (
            <button
                className="btn btn-danger float-right"
                onClick={onClick}>
                Cancel
            </button>
        )
    }
}

export default Cancel;
