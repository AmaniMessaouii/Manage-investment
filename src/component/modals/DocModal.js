import React, { useEffect, useState } from 'react';
import { Badge, Button, Modal, Table, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import NotifModel from './NotifModel';

function DocModal({ isModalOpen, handleOk, handleCancel }) {
    const [fileList, setFileList] = useState([]);
    const [isUploadValid, setIsUploadValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setIsUploadValid(newFileList.length > 0);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const handleFileDownloadClick = () => {
        if (!isUploadValid) {
            setErrorMessage('필수입력항목을 입력해주세요.');
            setOpen(true);
            setSave(false);
        } else {
            handleOk();
            setOpen(true);
            setErrorMessage('저장되었습니다.');
            setSave(true);
        }
    };

    const cancelModal = () => {
        handleCancel();
        setFileList([]);
    };

    useEffect(() => {
        if (!isModalOpen) {
            setFileList([]);
            setIsUploadValid(false);
        }
    }, [isModalOpen]);

    const showModal = () => {
        setOpen(true);
    };

    const columns = [
        {
            title: '',
            dataIndex: 'first',
            key: 'first',
        },
        {
            title: '',
            dataIndex: 'second',
            key: 'second',
        },
    ];

    const data = [
        {
            key: '1',
            first: (
                <Badge dot offset={[6, 0]}>
                    <span className="modal-row-list-title">서류</span>
                </Badge>
            ),
            second: (
                <div className="img-crop-container">
                    <ImgCrop rotationSlider>
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 1 && 'img'}
                        </Upload>
                    </ImgCrop>
                </div>
            ),
        },
    ];

    return (
        <div className='docModal-Container'>
            <Modal
                title="승인거부 사유 입력"
                className="Modal-investment-container img-crop-container"
                centered
                open={isModalOpen}
                onOk={handleFileDownloadClick}
                onCancel={cancelModal}
                width="100vh"
                footer={
                    <div className="footer-modal-container">
                        <Button
                            key="ok"
                            type="primary"
                            onClick={handleFileDownloadClick}
                            style={{ width: '160px', height: '44px' }}
                        >
                            파일 다운로드
                        </Button>
                        <Button
                            key="cancel"
                            onClick={cancelModal}
                            style={{ width: '160px', height: '44px' }}
                        >
                            확인
                        </Button>
                    </div>
                }
            >
                <div className="body-modal-container img-crop-container">
                    <Table
                        columns={columns}
                        showHeader={false}
                        footer={false}
                        pagination={false}
                        bordered
                        dataSource={data}
                        scroll={{ x: '100%' }}
                        className="linear-table"
                        size="middle"
                    />
                </div>
            </Modal>
            <div className='notifModal-container'>
                <NotifModel
                    save={save}
                    showModal={showModal}
                    open={open}
                    setOpen={setOpen}
                    message={errorMessage}
                />
            </div>
        </div>
    );
}

export default DocModal;
