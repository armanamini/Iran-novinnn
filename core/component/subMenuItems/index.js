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
    getItem("بدون دیتا", "sub1-1"),
    getItem("زیر 2", "sub1-2"),
    getItem("زیر 3", "sub1-3"),
    getItem("زیر 4", "sub1-4"),
  ]),
  getItem("کمپین", "sub2", <AppstoreOutlined />, [
    getItem("کمپین", "sub2-1", "", "", "", "/campaign"),
    getItem("لیست کمپین ها", "sub2-6", "", "", "", "/campaign/campaignList"),
    getItem("Submenu", "sub2-3", null, [
      getItem("Option 7", "sub2-7"),
      getItem("Option 8", "sub2-8"),
    ]),
  ]),
  getItem("سطوح دسترسی", "sub4", <SettingOutlined />, [
    getItem("Option 9", "sub4-9"),
    getItem("Option 10", "sub4-10"),
    getItem("Option 11", "sub4-11"),
    getItem("Option 12", "sub4-12"),
  ]),
  getItem("کمپین تایپ ها", "sub5", <SettingOutlined />, [
    getItem("Option 13", "sub5-13"), // Changed the keys to be unique
    getItem("Option 14", "sub5-14"),
    getItem("Option 15", "sub5-15"),
    getItem("Option 16", "sub5-16"),
  ]),
  getItem("کمپین آیتم ها", "sub6", <SettingOutlined />, [
    getItem("Option 17", "sub6-17"), // Changed the keys to be unique
    getItem("Option 18", "sub6-18"),
    getItem("Option 19", "sub6-19"),
    getItem("Option 20", "sub6-20"),
  ]),
  getItem("کمپین کاستوم فیلدها", "sub7", <SettingOutlined />, [
    getItem("Option 21", "sub7-21"), // Changed the keys to be unique
    getItem("Option 22", "sub7-22"),
    getItem("Option 23", "sub7-23"),
    getItem("Option 24", "sub7-24"),
  ]),
  getItem("فاکتورها", "sub8", <SettingOutlined />, [
    getItem("Option 25", "sub8-25"), // Changed the keys to be unique
    getItem("Option 26", "sub8-26"),
    getItem("Option 27", "sub8-27"),
    getItem("Option 28", "sub8-28"),
  ]),
  getItem("پشتیبانی", "sub9", "", "", "", "/support"),
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
