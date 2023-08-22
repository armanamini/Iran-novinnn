import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function getItem(label, key, icon, children, type, link) {
  return {
    label,
    key,
    icon,
    children,
    type,
    link,
  };
}

const items = [
  getItem(
    "کمپین",
    "sub2",
    <AppstoreOutlined />,
    [
      getItem("کمپین", "sub2-1", "", "", "", "/campaign"),
      getItem(
        "لیست کمپین ها",
        "sub2-6",
        "",
        "",
        "",
        "/campaign/campaignList?page=1"
      ),
    ],
    "",
    "",
    "/campaign"
  ),

  // getItem("پشتیبانی", "sub9", <SettingOutlined />, "", "", "/support"),
  getItem(<Link href="/support">پشتیبانی</Link>, "link", <SettingOutlined />),

  getItem(
    <Link href="/mediaSubmition">ثبت رسانه</Link>,
    "mediaSubmition",
    <SettingOutlined />
  ),

  getItem(
    <Link href="/mediaList">لیست رسانه ها</Link>,
    "mediaList",
    <SettingOutlined />
  ),
];

const rootSubmenuKeys = [
  "sub1",
  "sub2",
  "sub4",
  "sub5",
  "sub6",
  "sub7",
  "sub8",
  "sub9",
];

const SubMenuItems = () => {
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState([]);
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    // Get the current active route
    const currentRoute = router.pathname;

    // Find the matching item for the current active route
    const matchingItem = items.find(
      (item) =>
        item.link === currentRoute ||
        (item.children &&
          item.children.some((child) => child.link === currentRoute))
    );

    // If a matching item is found, set it as active
    if (matchingItem && matchingItem.key) {
      const submenuKey = matchingItem.key.split("-")[0]; // Extract submenu key
      setActiveKeys([submenuKey, matchingItem.key]);
      setOpenKeys([submenuKey]);
    } else {
      setActiveKeys([]);
      setOpenKeys([]);
    }
  }, [router.pathname]);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const renderMenuItem = (item) => {
    // Check if the item is active and add "active" class if true
    const isActive = activeKeys.includes(item.key);

    const className = isActive ? "ant-menu-item-selected" : "";

    if (item.link) {
      return (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          type={item.type}
          className={"!pr-14"}
        >
          <Link className="!w-full block" href={item.link}>
            {item.label}
          </Link>
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          type={item.type}
          className={className}
        >
          {item.label}
        </Menu.Item>
      );
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={activeKeys}
      onOpenChange={onOpenChange}
      style={{
        width: "100%",
        border: "none",
      }}
    >
      {items.map((item) =>
        item.children ? (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map((child) => renderMenuItem(child))}
          </Menu.SubMenu>
        ) : (
          renderMenuItem(item)
        )
      )}
    </Menu>
  );
};

export default SubMenuItems;
