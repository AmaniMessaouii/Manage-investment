import { Button, Modal } from 'antd';
import React from 'react';
import warning from "../../assets/images/warringIcon.svg";
import valid from "../../assets/images/validIcon.svg";

function NotifModel({ save, setOpen, open, message }) {
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            title={<img src={save ? valid : warning} alt="" />}
            open={open}
            style={{ maxWidth: "400px" }}
            onCancel={handleCancel}
            className='notifModal-container'
            footer={[
                <div className='footer-modal-container' key="footer">
                    <Button key="ok" type="primary" onClick={handleCancel} style={{ width: "160px", height: '44px' }}>
                        확인
                    </Button>
                </div>
            ]}
        >
            <h4 style={{ margin: "1em 0" }}>{message}</h4>
        </Modal>
    );
}

export default NotifModel;