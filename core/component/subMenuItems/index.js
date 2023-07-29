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
    key,
    icon,
    children,
    label,
    type,
    link,
  };
}

const items = [
  getItem("کاربران", "sub1", <MailOutlined />, [
    getItem("بدون دیتا", "1"),
    getItem("زیر 2", "2"),
    getItem("زیر 3", "3"),
    getItem("زیر 4", "4"),
  ]),
  getItem("کمپین", "sub2", <AppstoreOutlined />, [
    getItem("کمپین", "1", "", "", "", "/campaign"),
    getItem("لیست کمپین ها", "6","","","","/campaign/campaignList"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem(" سطوح دسترسی", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("کمپین تایپ ها", "sub5", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("کمپین آیتم ها", "sub6", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("کمپین کاستوم فیلدها", "sub7", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("فاکتورها", "sub8", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("پشتیبانی", "sub9","","","","/support"),
];

const rootSubmenuKeys = [
  "sub1",
  "sub2",
  "sub4",
  "sub5",
  "sub6",
  "sub7",
  "sub8",
  "sub9"
];

const SubMenuItems = () => {
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    // Get the current active route
    const currentRoute = router.pathname;

    // Find the matching item for the current active route
    const matchingItem = items.find(item =>
      item.link === currentRoute ||
      (item.children && item.children.some(child => child.link === currentRoute))
    );

    // If a matching item is found, set it as active
    if (matchingItem && matchingItem.key) {
      setActiveKey(matchingItem.key);
      setOpenKeys([matchingItem.key]);
    } else {
      setActiveKey(null);
      setOpenKeys([]);
    }
  }, [router.pathname]);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const renderMenuItem = (item) => {
    // Check if the item is actve and add "active" class if true
    const isActive = activeKey == item.key;

    const className = isActive ? "ant-menu-item-selected" : "";

    if (item.link) {
      return (
        <Menu.Item key={item.key} icon={item.icon} type={item.type} className={"!p-0  !pr-3"}>
          <Link className="!w-full text-black block" href={item.link}>{item.label}</Link>
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item key={item.key} icon={item.icon} type={item.type} className={className}>
          {item.label}
        </Menu.Item>
      );
    }
  };
  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: "100%",
        border:'none',
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
