import React from 'react';
import './Modal.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerWidth: '100%',
        };
    }

    componentDidMount() {
        if (!this.props.title) return console.error('Error : Modal must have a title prop to be displayed.')
        if (this.props.show && this.props.autoCloseTime) {
            const endTime = Date.now() + this.props.autoCloseTime;
            this.updateTimer(endTime);

            this.timerInterval = setInterval(() => {
                this.updateTimer(endTime);
            }, 10); // Intervalle plus court (10 millisecondes)
        }
    }

    componentWillUnmount() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    updateTimer(endTime) {
        const currentTime = Date.now();
        const remainingTime = Math.max(0, endTime - currentTime);
        const percentage = (remainingTime / this.props.autoCloseTime) * 100;
        this.setState({
            timerWidth: `${percentage}%`,
        });

        if (remainingTime === 0) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <>
                {this.props.show && this.props.title ?
                    <div className="modal">
                        <div className="modal-content">
                            <p className='title'>{this.props.title}</p>
                            {(this.props.commentary ? <p className='commentary'>{this.props.commentary}</p> : null)}
                            <span className="close" onClick={this.props.onClose}>
                                &times;
                            </span>
                            {this.props.autoCloseTime && this.props.showLoadingBar ?
                                <div className='timer-bar'>
                                    <div className='timer-bar-fill' style={{ width: this.state.timerWidth }}></div>
                                </div> : null}
                        </div>
                    </div>
                    : null}
            </>
        );
    }
}

export default Modal;
