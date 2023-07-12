import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

function getItem(label, key, icon, children, type, link) {
  return {
    key,
    icon,
    children,
    label,
    type,
    link // New property for the link
  };
}

const items = [
  getItem('پیشخوان', 'sub1', <MailOutlined />, [
    getItem('کمپین', '1',"","","","/campaign"),
    getItem('زیر 2', '2'),
    getItem('زیر 3', '3'),
    getItem('زیر 4', '4'),
  ],),
  getItem('تبلیغ', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('گزارش ها', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
  getItem(' صورت حساب', 'sub5', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4', 'sub5'];

const SubMenuItems = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const renderMenuItem = (item) => {
    if (item.link) {
      return (
        <Menu.Item key={item.key} icon={item.icon} type={item.type}>
          <Link href={item.link}>{item.label}</Link>
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item key={item.key} icon={item.icon} type={item.type}>
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

      <div className='!bg-[#DC3545] w-full mt-10 p-5'>
        <p className='text-center text-white'>ساخت کمپین</p>
      </div>
    </Menu>
  );
};

export default SubMenuItems;
