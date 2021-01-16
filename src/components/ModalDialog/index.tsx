import React from 'react';
import Model from '../Modal';

const ModalDialog = ({ show = false, title = '', confirmCallBack, closeModelDialogCallback, content = '' } :
                    {
                        show: boolean,
                        title: string,
                        confirmCallBack: any,
                        closeModelDialogCallback: any,
                        content: string}) => {
    if (!show) { 
        return null;
    }
    return (
        <Model
            show={show}
            title={title}
            closeModel={closeModelDialogCallback}>
                <p className='f4'>{content}</p>
            <div className='tr'>
                <button className='o-70 dim pointer bg-white pa2 black ma2' onClick={closeModelDialogCallback}>Cancel</button>
                <button className='bg-blue dim pointer pa2 white ma2 w-20' onClick={confirmCallBack}>Ok</button>
            </div>
        </Model>
    )
}

export default ModalDialog;
