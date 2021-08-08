import React, { Component } from 'react'

class More extends Component {

    static defaultProps = {
        btnName: (<><span>More</span>&nbsp; <i className="fas fa-angle-double-right my-auto"></i></>)
    }
    render() {
        const { onClick } = this.props;
        return (
            <button
                className="btn btn-secondary float-right"
                onClick={onClick}
            >
                <span>More</span>&nbsp; <i className="fas fa-angle-double-right my-auto"></i>
            </button>
        )
    }
}

export default More;
