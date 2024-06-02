import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function ComingSoon() {
    return (
        <div className="coming-soon-container">
            <Card className="coming-soon-card">
                <Row justify="center" align="middle">
                    <Col>
                        <ClockCircleOutlined className="coming-soon-icon" />
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{ marginTop: '16px' }}>
                    <Col>
                        <Title level={2} className="coming-soon-title">곧 출시 예정</Title>
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{ marginTop: '8px' }}>
                    <Col>
                        <Text className="coming-soon-description">
                        이 기능을 제공하기 위해 열심히 노력하고 있습니다. 계속 지켜봐 주세요!
                        </Text>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ComingSoon;