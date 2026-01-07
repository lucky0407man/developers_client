import React from "react";
import SidebarItem from "./SidebarItem";
import "../../css/Sidebar.module.css";
import type { SidebarProps } from "../../types";


const Sidebar: React.FC<SidebarProps> = ({ items, onSelect, selectedItem }) => {
  return (
    <aside
      style={{
        width: '180px',
        height: '100%',
        overflowY: "auto",
        borderRight: '1px solid var(--border-color)',
        backgroundColor: 'var(--sidebar-bg)',
        flexShrink: 0,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
      >
      {items.map((item) => (
        <SidebarItem
          key={item}
          item={item}
          isSelected={item === selectedItem}
          onClick={() => onSelect(item)}
        />
      ))}
    </aside>
  );
};

export default Sidebar;