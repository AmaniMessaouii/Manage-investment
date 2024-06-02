import React, { useState } from 'react';
import { Badge, Button, Input, Modal, Select, Table, Upload, message } from 'antd';
import arrowDown from "../../assets/images/Vector.svg";
import closeIcon from "../../assets/images/teenyicons_x-circle-solid.svg";
import NotifModel from './NotifModel';
import Denialapproval from './Denialapproval';

function InvestmentTypeModal({ isModalOpen, handleOk, handleCancel }) {
    const [fileList, setFileList] = useState([]);
    const [selectedValue, setSelectedValue] = useState('일반개인');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpenD, setIsModalOpenD] = useState(false);
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);
    const [inputValue, setInputValue] = useState({
        input1:"",
        input2:""
    });
    const onChangeInput = (e) => {
        const { value, name } = e.target;
        setInputValue(prevInputValue => ({
            ...prevInputValue,
            [name]: value
        }));
    };
    const showModalDenial = () => {
        setIsModalOpenD(true);
        handleCancel(); 
        setInputValue({
            input1:"",
            input2:""
        })
        setFileList([])
    
    };

    const handleOkDenial = () => {
        setIsModalOpenD(false);
    };

    const handleCancelDenial = () => {
        setIsModalOpenD(false);
    };

    const showModal = () => {
        setOpen(true);
    };

    const removeFile = (file) => {
        setFileList((prevFileList) => prevFileList.filter((item) => item.uid !== file.uid));
    };

    const props = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        fileList,
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            setFileList(info.fileList);
        },
        beforeUpload: (file) => {
            if (fileList.length >= 3) {
                message.error('You can only upload up to 3 files.');
                return Upload.LIST_IGNORE;
            }
            return true;
        },
        onRemove: (file) => {
            removeFile(file);
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
        itemRender: (originNode, file) => (
            <div className='upload-items-list'>
                <span className='file-name-upload'>{file.name}</span>
                <img src={closeIcon} alt="close" onClick={() => removeFile(file)} />
            </div>
        ),
    };

    const approvalData = [
        { value: '일반개인', label: '일반개인' },
        { value: '소득적격', label: '소득적격' },
        { value: '개인전문', label: '개인전문' },
        { value: '법인', label: '법인' },
        { value: '여신금융', label: '여신금융' },
        { value: 'P2P온투', label: 'P2P온투' },
    ];

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    const validateForm = () => {
        if (!fileList.length) {
            setErrorMessage('필수입력항목을 입력해주세요.');
            return false;
        }
        return true;
    };

    const handleSave = () => {
        if (validateForm()) {
            handleOk();
            setOpen(true);
            setErrorMessage('저장되었습니다.');
            setSave(true);
            setInputValue({
                input1:"",
                input2:""
            })
            setFileList([])
        } else {
            setOpen(true);
            setErrorMessage('필수입력항목을 입력해주세요.');
            setSave(false);
            setInputValue({
                input1:"",
                input2:""
            })
            setFileList([])
        }
    };
 const cancelModal=()=>{
    handleCancel()
    setInputValue({
        input1:"",
        input2:""
    })
    setFileList([])  
 }
    const columns = [
        { title: '', dataIndex: 'first', key: 'first' },
        { title: '', dataIndex: 'second', key: 'second' },
    ];

    const data = [
        {
            key: '1',
            first: <span className="modal-row-list-title">회원번호</span>,
            second: <div><Input placeholder="abc111" variant="borderless"
            name="input1"
            value={inputValue.input1}
            onChange={onChangeInput} /></div>,
        },
        {
            key: '2',
            first: <span className="modal-row-list-title">회원명/법인명</span>,
            second: <div><Input placeholder="김길동" variant="borderless"
            name="input2"
            value={inputValue.input2}
            onChange={onChangeInput} /></div>,
        },
        {
            key: '3',
            first: <Badge dot offset={[6, 0]}><span className="modal-row-list-title">예치금잔액</span></Badge>,
            second: (
                <div>
                    <Select
                        defaultValue={selectedValue}
                        onChange={handleChange}
                        options={approvalData}
                        suffixIcon={<img src={arrowDown} alt="arrowDown" className="custom-arrow" />}
                        className="custom-select"
                        popupClassName="custom-dropdown"
                    />
                </div>
            ),
        },
        {
            key: '4',
            first: <Badge dot offset={[6, 0]}><span className="modal-row-list-title">투자건수</span></Badge>,
            second: (
                <div>
                    <Upload {...props}>
                        <Button className='btn-upload-file'>파일 선택</Button>
                    </Upload>
                </div>
            ),
        },
    ];
    return (
        <>
            <Modal
                title="투자유형 변경"
                className='Modal-investment-container'
                centered
                open={isModalOpen}
                onOk={handleSave}
                onCancel={cancelModal}
                width="100vh"
                footer={[
                    <div className='footer-modal-container'>
                        <Button key="ok" type="primary" onClick={handleSave} style={{ width: "160px", height: '44px' }}>
                            저장
                        </Button>,
                        <Button key="cancel" onClick={showModalDenial} style={{ width: "160px", height: '44px' }}>
                            취소
                        </Button>,
                    </div>
                ]}
            >
                <div className='body-modal-container'>
                    <Table
                        columns={columns}
                        showHeader={false}
                        footer={false}
                        pagination={false}
                        bordered={true}
                        dataSource={data}
                        scroll={{ x: '100%' }}
                        className="linear-table"
                        size="middle"
                    />
                    <ul>
                        <li>파일 형식은 jpg, jpeg, gif, png, pdf만 가능합니다.</li>
                        <li>최대 10개, 100MB까지 등록이 가능합니다.</li>
                    </ul>
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
            <Denialapproval
                isModalOpen={isModalOpenD}
                handleCancel={handleCancelDenial}
                handleOk={handleOkDenial}
            />
        </>
    );
}

export default InvestmentTypeModal;