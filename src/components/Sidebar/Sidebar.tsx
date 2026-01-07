import React from "react";
import SidebarItem from "./SidebarItem";
import "../../css/Sidebar.module.css";

interface SidebarProps {
  items: string[];
  onSelect: (item: string) => void;
  selectedItem: string;
}

const Sidebar: React.FC<SidebarProps> = ({ items, onSelect, selectedItem }) => {
  return (
    <aside
      style={{
        width: '180px',
        height: '100%',
        overflowY: "auto",
        borderRight: '1px solid #ddd',
        backgroundColor: '#f5f5f5',
        flexShrink: 0,
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