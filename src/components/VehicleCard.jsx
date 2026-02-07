import React, { useState } from "react";
import { Row, Col, Card, Select, Button, Tag } from "antd";
import {
  ThunderboltOutlined,
  DashboardOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./cyber-models.css";
import { vehicles } from "./../vehicles";

export default function CyberModels({ setCalculatorData }) {
  return (
    <section id="models" className="cp-models">
      <div className="cp-models-grid" />
      <div className="scanlines" />

      <div className="cp-models-container">
        {/* Header */}
        <div className="cp-models-header">
          <Tag className="cp-pill purple">OUR FLEET</Tag>
          <h2 className="cp-title glitch" data-text="ELECTRIC MODELS">
            ELECTRIC MODELS
          </h2>
          <p className="cp-subtitle">
            Configure your ride. Choose power, range, and future-ready tech.
          </p>
        </div>

        <Row gutter={[32, 32]}>
          {vehicles.map((vehicle) => (
            <Col xs={24} lg={12} xl={8} key={vehicle.id}>
              <VehicleCard
                vehicle={vehicle}
                setCalculatorData={setCalculatorData}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

function VehicleCard({ vehicle, setCalculatorData }) {
  const [config, setConfig] = useState(vehicle.configurations[0]);

  return (
    <Card className="cp-vehicle-card hologram">
      {/* Image */}
      <div className="cp-vehicle-image">
        <span>{vehicle.baseImage}</span>
        <Tag color="gold">NEW</Tag>
      </div>

      {/* Title */}
      <h3 className="cp-vehicle-title">
        {vehicle.brand} {vehicle.name}
      </h3>

      <div className="cp-vehicle-meta">
        <span>Tyre: {vehicle.tyreSize}</span>
        <span>Load: {vehicle.loadCapacity}kg</span>
      </div>

      {/* Config Selector */}
      <Select
        className="cp-select"
        value={config.id}
        onChange={(id) =>
          setConfig(vehicle.configurations.find((c) => c.id === id))
        }
        options={vehicle.configurations.map((c) => ({
          value: c.id,
          label: `${c.voltage}V ${c.capacityAh}AH ${c.batteryType}`,
        }))}
      />

      {/* Specs */}
      <div className="cp-specs">
        <Spec
          icon={<DashboardOutlined />}
          label="Range"
          value={`${config.rangeKm} KM`}
        />
        <Spec
          icon={<ThunderboltOutlined />}
          label="Charging"
          value={config.chargingTime}
        />
        <Spec
          icon={<ThunderboltOutlined />}
          label="Battery Life"
          value={config.batteryLife}
        />
      </div>

      {/* Price */}
      <div className="cp-price">₹{(config.price / 1000).toFixed(0)}K</div>

      {/* CTA */}
      <Button
        block
        className="cp-btn-primary"
        onClick={() => {
          setCalculatorData({
            model: vehicle.name,
            config: config.id,
            price: config.price,
          });
          document
            .getElementById("calculator")
            .scrollIntoView({ behavior: "smooth" });
        }}
      >
        CALCULATE EMI <RightOutlined />
      </Button>
    </Card>
  );
}

function Spec({ icon, label, value }) {
  return (
    <div className="cp-spec">
      {icon}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
