import React from 'react';
import './Modal.css';

class Modal extends React.Component {
    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <p>{this.props.message}</p>
                    <span className="close" onClick={this.props.onClose}>
                        &times;
                    </span>
                </div>
            </div>
        );
    }
}

export default Modal;
