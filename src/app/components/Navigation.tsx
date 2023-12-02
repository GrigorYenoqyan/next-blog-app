"use client";
import React, { useState } from "react";
import {
  UnorderedListOutlined,
  PlusOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";

import { Layout, Menu, Button, theme, Avatar, Card } from "antd";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const pathnames: Record<string, string> = {
  "/posts": "1",
  "/create": "2",
};

const items: MenuItem[] = [
  //   getItem("Todo list", "1", <UnorderedListOutlined />),
  //   getItem("Create ", "2", <PlusOutlined />),
  getItem(<Link href="/posts">Posts list</Link>, "1", <UnorderedListOutlined />),
  getItem(<Link href="/create">Create</Link>, "2", <PlusOutlined />),
];

type Props = {
  children: React.ReactNode;
};

const Nav: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const pathname = usePathname();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        // className="h-screen"
        collapsed={collapsed}
      >
        <Menu
          // className="mt-16"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathnames[pathname]]}
          items={items}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
          {/* <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />{" "}
            Todo List
          </Header> */}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100vh",
              // background: colorBgContainer,
            }}
            className="h-full"
          >
            {children}
          </Content>
      </Layout>
    </Layout>
  );
};

export default Nav;
