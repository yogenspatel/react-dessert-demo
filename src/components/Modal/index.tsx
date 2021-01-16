import { keyBy } from 'lodash';
import React, { SyntheticEvent, useEffect } from 'react';

const Modal = ({ show = false, title = '', children, closeModel} : { show: boolean, title: string, children: any, closeModel: Function }) => {
    const modelContainerStyles: any = {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        zIndex: 100000,
    };

    const modelStyles: any = {
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '30vw',
        WebkitBoxShadow: '0px 10px 15px 2px rgba(0,0,0,0.16)',
        MozBoxShadow: '0px 10px 15px 2px rgba(0,0,0,0.16)',
        BoxShadow: '0px 10px 15px 2px rgba(0,0,0,0.16)',
    }
    const closeCurrentModel = (e: SyntheticEvent) => {
        e.preventDefault();
        closeModel();
    }

    const closeCurrentModelOnEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModel();
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', e => closeCurrentModelOnEscKey(e), false);
    }, []);
    if (!show) {
        return null;
    }
    return (
        <div className='fixed top-0 left-0 w-100 h-100' style={modelContainerStyles}>
            <div className='absolute w-100 bg-white' style={modelStyles}>
                <div className='f3 lh-copy dark-gray bg-orange flex'>
                    <span className='flex-auto ml2 mt1'>{title}</span>
                    <span
                    className='pointer dim f4 db mr1 mt1'
                    onClick={closeCurrentModel}>
                        &#10006;</span>
                </div>
                <div className='p3 gray ma2'>{children}</div>
            </div>
            
        </div>
    );
}

export default Modal;
