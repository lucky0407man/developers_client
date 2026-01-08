// Theme types
import { ReactNode } from "react";
export type Theme = "light" | "dark" | "system";

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Navigation types
export type NavKey = "home" | "profile" | "docs" | "about";

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Component props types
export interface NavbarProps {
  activeKey: string;
  onChange: (key: string) => void;
}

export interface SidebarItemProps {
  icon?: React.ReactNode;
  label?: string;
  active?: boolean;
  onClick: () => void;
}
export interface SidebarProps {
  items: string[];
  onSelect: (item: string) => void;
  selectedItem: string;
}
export interface SidebarItemProps {
  item: string;
  isSelected: boolean;
  onClick: () => void;
}
export interface ThemeProviderProps {
  children: ReactNode;
}
