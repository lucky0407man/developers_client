import React from "react";
import styles from "../../css/Sidebar.module.css";

interface SidebarItemProps {
  item: string;
  isSelected: boolean;
  onClick: () => void;
}

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