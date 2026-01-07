import React from "react";
import styles from "../../css/Sidebar.module.css";
import type { SidebarItemProps } from "../../types";


const SidebarItem: React.FC<SidebarItemProps> = ({ item, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.sidebarItem} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {item}
    </div>
  );
};

export default SidebarItem;