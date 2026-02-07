import React from "react";
import { Row, Col, Card, Typography, Form, Input, Button, message } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import "./contact-cyberpunk.css";

const { Title, Text } = Typography;

export default function Contact() {
  const onFinish = () => {
    message.success("⚡ Transmission received. We’ll respond shortly.");
  };

  return (
    <section id="contact" className="cp-section">
        <div className="scanlines" />

      <div className="cp-bg-grid" />

      {/* Header */}
      <div className="cp-header">
        <div className="cp-pill">
          <PhoneOutlined />
          <span>CONNECT</span>
        </div>

<Title level={1} className="cp-title glitch" data-text="GET IN TOUCH">
  GET IN TOUCH
</Title>

        <Text className="cp-subtitle">
          Ready to go electric? Let’s jack into the future.
        </Text>
      </div>

      <Row gutter={[32, 32]} className="cp-container">
        {/* Info */}
        <Col xs={24} lg={12}>
          <div className="cp-info-stack">
            <CyberCard
              icon={<EnvironmentOutlined />}
              title="VISIT US"
              content={`Kulod Green Energies\nJagannath Temple Road\nKutra, Sundargarh\nOdisha 770018`}
            />
            <CyberCard
              icon={<PhoneOutlined />}
              title="CALL US"
              content="7849077443"
              link="tel:7849077443"
            />
            <CyberCard
              icon={<MailOutlined />}
              title="EMAIL US"
              content="zeliomivaan@gmail.com"
              link="mailto:zeliomivaan@gmail.com"
            />
            <CyberCard
              icon={<ApartmentOutlined />}
              title="GSTIN"
              content="21DXHPA0963B1Z8"
            />
          </div>
        </Col>

        {/* Form */}
        <Col xs={24} lg={12}>
          <Card className="cp-form-card hologram">
            <Title level={3} className="cp-form-title">
              SEND TRANSMISSION
            </Title>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input placeholder="Your Name" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>

              <Form.Item name="phone" rules={[{ required: true }]}>
                <Input placeholder="Your Phone" />
              </Form.Item>

              <Form.Item name="subject" rules={[{ required: true }]}>
                <Input placeholder="Subject" />
              </Form.Item>

              <Form.Item name="message" rules={[{ required: true }]}>
                <Input.TextArea rows={4} placeholder="Your Message" />
              </Form.Item>

              <Button htmlType="submit" block className="cp-submit-btn">
                SEND MESSAGE
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

function CyberCard({ icon, title, content, link }) {
  return (
<Card className="cp-info-card hologram">
      <div className="cp-info-icon">{icon}</div>
      <div>
        <div className="cp-info-title">{title}</div>
        {link ? (
          <a href={link} className="cp-info-text">
            {content}
          </a>
        ) : (
          <pre className="cp-info-text">{content}</pre>
        )}
      </div>
    </Card>
  );
}
