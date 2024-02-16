import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = (props) => {
    const [timerWidth, setTimerWidth] = useState('100%');
    const [hideModal, setHideModal] = useState(false);

    useEffect(() => {
        if (props.show && props.autoCloseTime) {
            const endTime = Date.now() + props.autoCloseTime;
            updateTimer(endTime);

            const timerInterval = setInterval(() => {
                updateTimer(endTime);
            }, 10);

            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [props.show, props.autoCloseTime]);

    const updateTimer = (endTime) => {
        const currentTime = Date.now();
        const remainingTime = Math.max(0, endTime - currentTime);
        const percentage = (remainingTime / props.autoCloseTime) * 100;
        setTimerWidth(`${percentage}%`);

        if (remainingTime === 0) {
            closeModal();
        }
    };

    const closeModal = () => {
        setHideModal(true);
        modalClasses = `modal hiding`;
        setTimeout(() => {
            setHideModal(false);
            props.onClose(); // Appeler la fonction onClose fournie par les props
        }, 1000);
    };

    var modalClasses = `modal ${props.position || 'center'} ${hideModal ? 'hide' : ''}`;
    var contentClasses = `modal-content ${props.position || 'center'}`;

    return (
        <>
            {props.show ? (
                <div className={modalClasses}>
                    <div className={contentClasses}>
                        <p className='title'>{props.title}</p>
                        {props.commentary ? <p className='commentary'>{props.commentary}</p> : null}
                        {props.showCloseButton ? (
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                        ) : null}
                        {props.autoCloseTime && props.showLoadingBar ? (
                            <div className='timer-bar'>
                                <div className='timer-bar-fill' style={{ width: timerWidth, background: props.backgroundColor || null }}></div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Modal;
