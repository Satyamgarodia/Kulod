import React, { useEffect, useState } from "react";
import { Layout, Menu, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Zap } from "lucide-react";
import "./navbar.css";

const { Header } = Layout;

const navItems = [
  { key: "home", label: "HOME" },
  { key: "models", label: "MODELS" },
  { key: "calculator", label: "CALCULATOR" },
  { key: "contact", label: "CONTACT" },
];

export default function CyberNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header className={` cp-nav ${scrolled ? "cp-nav-scrolled" : ""}`}>
        {/* Scanline overlay */}
        <div className="cp-nav-scanlines" />

        {/* Logo */}
        <div className="cp-logo">
          <Zap className="cp-zap energy-pulse" fill="#facc15" />
          <span className="cp-logo-text glitch" data-text="KULOD">
            KULOD
          </span>
        </div>

        {/* Desktop Menu */}
        <Menu
          mode="horizontal"
          className="cp-menu"
          items={navItems.map((item) => ({
            key: item.key,
            label: (
              <a href={`#${item.key}`} className="cp-link">
                {item.label}
              </a>
            ),
          }))}
        />

        {/* Mobile Button */}
        <button className="cp-mobile-btn" onClick={() => setOpen(true)}>
          <MenuOutlined />
        </button>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        closeIcon={<CloseOutlined />}
        placement="right"
        className="cp-drawer"
      >
        <Menu
          mode="vertical"
          className="cp-drawer-menu"
          items={navItems.map((item) => ({
            key: item.key,
            label: (
              <a
                href={`#${item.key}`}
                onClick={() => setOpen(false)}
                className="cp-link"
              >
                {item.label}
              </a>
            ),
          }))}
        />
      </Drawer>
    </>
  );
}
