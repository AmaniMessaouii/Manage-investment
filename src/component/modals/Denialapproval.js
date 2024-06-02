import React, { useMemo, useState } from 'react';
import { Badge, Button, Checkbox, Input, Modal, Table } from 'antd';
import NotifModel from './NotifModel';

const { TextArea } = Input;

function Denialapproval({ isModalOpen, handleOk, handleCancel }) {
    const [checkedValues, setCheckedValues] = useState([]);
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);
    const [inputValue, setInputValue] = useState({
        date: "",
        current: "",
        input1: "",
        input2: ""
    });
    const onChangeInput = (e) => {
        const { value, name } = e.target;
        setInputValue(prevInputValue => ({
            ...prevInputValue,
            [name]: value
        }));
    };
    const dataOptions = [
        { value: '서류 식별 불가', label: '서류 식별 불가' },
        { value: '필수 서류 누락', label: '필수 서류 누락' },
        { value: '서류의 내용이 등록된 회원정보와 다름', label: '서류의 내용이 등록된 회원정보와 다름' },
        { value: '서류에 누락된 내용이 있음 (필수정보, 회사직인, 본인날인, 본인서명 등)', label: '서류에 누락된 내용이 있음 (필수정보, 회사직인, 본인날인, 본인서명 등)' },
        { value: '서류의 유효기간이 초과됨', label: '서류의 유효기간이 초과됨' },
        { value: '직접 입력', label: '직접 입력' },
    ];

    const handleCheckboxChange = (values) => {
        setCheckedValues(values);
    };

    const handleTextAreaChange = (e) => {
        setTextAreaValue(e.target.value);
    };

    const showModal = () => {
        setOpen(true);
    };

    const validateForm = () => {
        if (checkedValues.length === 0 || textAreaValue.trim() === '') {
            setErrorMessage('필수입력항목을 입력해주세요.');
            return false;
        }

        return true;
    };

    const handleSave = () => {
        if (validateForm()) {
            setIsFormValid(true);

        } else {
            setOpen(true);

        }
    };
    const handleOkWithNotification = () => {
        handleOk();
        setOpen(true);
        setErrorMessage('저장되었습니다.');
        setSave(true);
        setCheckedValues([])
        setTextAreaValue('')
        setIsFormValid(false)
        setInputValue({
            date: "",
            current: "",
            input1: "",
            input2: ""

        })
    };
    const handlecancelWithNotification = () => {
        handleCancel()
        setCheckedValues([])
        setTextAreaValue('')
        setIsFormValid(false)
        setInputValue({
            date: "",
            current: "",
            input1: "",
            input2: ""

        })
    };

    const columns = [
        { title: '', dataIndex: 'first' },
        { title: '', dataIndex: 'second' },
    ];

    const data = [
        {
            key: '1',
            first: <span className="modal-row-list-title">회원번호</span>,
            second: <div> <Input placeholder="abc111, abc222"
                variant="borderless"
                name="input1"
                value={inputValue.input1}
                onChange={onChangeInput}
            /> </div>,
        },
        {
            key: '2',
            first: <span className="modal-row-list-title">회원명/법인명</span>,
            second: <div> <Input placeholder="김길동, ㈜가나다라투자"
                variant="borderless"
                name="input2"
                value={inputValue.input2}
                onChange={onChangeInput} /> </div>,
        },
        {
            key: '3',
            first: <Badge dot offset={[6, 0]}><span className="modal-row-list-title">블랙리스트 사유</span></Badge>,
            second: (
                <div>
                    <Checkbox.Group options={dataOptions} value={checkedValues} onChange={handleCheckboxChange} />
                    <TextArea
                        onChange={handleTextAreaChange}
                        placeholder="사유 입력"
                        defaultValue={textAreaValue}
                        style={{
                            height: 120,
                            resize: 'none',
                            backgroundColor: "#DDE0E5",
                            borderRadius: 8,
                            marginTop: "0.5em"
                        }} 
                        />

                </div>
            ),
        },
    ];

    return (
        <>
            <Modal
                title="승인거부 사유 입력"
                className='Modal-investment-container'
                centered
                open={isModalOpen}
                onOk={handleSave}
                onCancel={handlecancelWithNotification}
                width="100vh"
                footer={[
                    <div>
                        {isFormValid ?
                            <div className='footer-modal-container'>
                                <Button key="ok" type="primary" onClick={handleOkWithNotification} style={{ width: "160px", height: '44px' }}>
                                    저장
                                </Button>,
                            </div>
                            :
                            <div className='footer-modal-container'>
                                <Button key="ok" type="primary" onClick={handleSave} style={{ width: "160px", height: '44px' }}>
                                    저장
                                </Button>,
                                <Button key="cancel" onClick={handlecancelWithNotification} style={{ width: "160px", height: '44px' }}>
                                    취소
                                </Button>
                            </div>
                        }
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
                    {isFormValid && (
                        <div className='groupe-inputs'>
                            <Input addonBefore="최근저장일시"
                                placeholder="2022-01-01 09:00:00"
                                name="date"
                                value={inputValue.date}
                                onChange={onChangeInput} />
                            <Input addonBefore="관리자"
                                placeholder="김관리자"
                                name="current"
                                value={inputValue.current}
                                onChange={onChangeInput} />
                        </div>
                    )}
                </div>
            </Modal>
            <NotifModel
                save={save}
                showModal={showModal}
                open={open}
                setOpen={setOpen}
                message={errorMessage}
            />
        </>
    );
}

export default Denialapproval;