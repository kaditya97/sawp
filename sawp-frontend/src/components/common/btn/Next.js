import React, { Component } from 'react';

class Next extends Component {

    render() {
        const { onClick } = this.props;
        return (
            <button
                className="btn btn-primary float-right"
                onClick={onClick}
            >
                Next
            </button>
        )
    }
}

export default Next;
