"use client";
import React from "react";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";

import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;

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
  getItem(
    <Link href="/posts">Posts list</Link>,
    "1",
    <UnorderedListOutlined />
  ),
  getItem(<Link href="/create">Create</Link>, "2", <PlusOutlined />),
];

type Props = {
  children: React.ReactNode;
};

const Nav: React.FC<Props> = ({ children }) => {
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
      >
        <div className="pt-4 pb-4">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={200}
            height={37}
            priority
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathnames[pathname]]}
          items={items}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Nav;
