import React, { SyntheticEvent } from 'react';

const Model = (props: any) => {
    const modelContainerStyles: any = {
        'backgroundColor': 'rgba(0, 0, 0, .3)',
        'zIndex': 100000,
    };

    const modelStyles: any = {
        'maxWidth': '30vw',
        'marginTop': '12vh',
        'height': '56vh',
        'WebkitBoxShadow': '0px 10px 15px 2px rgba(0,0,0,0.16)',
        'MozBoxShadow': '0px 10px 15px 2px rgba(0,0,0,0.16)',
        'BoxShadow': '0px 10px 15px 2px rgba(0,0,0,0.16)',
        'overflow': 'hidden',
    }
    const closeModel = (e: SyntheticEvent) => {
        e.preventDefault();
        props.closeModel();
    }
    if (!props.show) {
        return null;
    }
    return (
        <div className='fixed top-0 left-0 w-100 h-100' style={modelContainerStyles}>
            <div className='relative center w-100 bg-white' style={modelStyles}>
            <div className='f3 lh-copy dark-gray bg-orange flex'>
                <span className='flex-auto ml1'>{props.title}</span>
                <span
                className='pointer dim f4 db mr1 mt1'
                onClick={closeModel}>
                    &#10006;</span>
            </div>
            <div className='p3 gray mt2'>{props.children}</div>
        </div>
            
        </div>
    );
}

export default Model;
