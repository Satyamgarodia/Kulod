import React from "react";
import { Row, Col, Button, Typography } from "antd";
import {
  ArrowRightOutlined,
  ThunderboltOutlined,
  CalculatorOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Bike, Battery, Gauge, Award, Sparkles } from "lucide-react";
import "./hero.css";

const { Title, Text } = Typography;

export default function CyberHero() {
  return (
    <section id="home" className="cp-hero mt-10">
      {/* Background layers */}
      <div className="cp-hero-grid" />
      <div className="cp-orb orb-yellow" />
      <div className="cp-orb orb-purple" />
      <div className="cp-orb orb-cyan" />
      <div className="scanlines" />

      <div className="cp-hero-content">
        {/* Badge */}
        <div className="cp-pill fade-up">
          <Sparkles size={16} />
          <span>NEXT GENERATION MOBILITY</span>
        </div>

        {/* Title */}
        <Title
          level={1}
          className="cp-hero-title glitch"
          data-text="FUTURE IS ELECTRIC"
        >
          <span>FUTURE IS</span>
          <span className="electric">ELECTRIC</span>
        </Title>

        {/* Subtitle */}
        <Text className="cp-hero-subtitle fade-up">
          Experience the revolution of electric mobility with cutting-edge
          technology, sustainable power, and unmatched performance.
        </Text>

        {/* CTA */}
        <div className="cp-hero-actions fade-up">
          <Button className="cp-btn-primary" href="#models">
            EXPLORE MODELS <ArrowRightOutlined />
          </Button>

          <Button className="cp-btn-secondary" href="#calculator">
            <CalculatorOutlined /> CALCULATE EMI
          </Button>
        </div>

        {/* Stats */}
        <Row gutter={[24, 24]} className="cp-stats">
          {[
            { icon: Bike, label: "5+ MODELS", value: "Premium Range" },
            { icon: Battery, label: "150 KM", value: "Max Range" },
            { icon: Gauge, label: "75 KM/H", value: "Top Speed" },
            { icon: Award, label: "100%", value: "Electric" },
          ].map((stat, i) => (
            <Col xs={12} md={6} key={i}>
              <div className="cp-stat-card hologram card-tilt">
                <stat.icon className="cp-stat-icon" />
                <div className="cp-stat-label">{stat.label}</div>
                <div className="cp-stat-value">{stat.value}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="cp-scroll m-5">
        <span>SCROLL</span>
        <DownOutlined />
      </div> */}
    </section>
  );
}
