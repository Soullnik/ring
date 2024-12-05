import { Tabbar } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Tabbar>
      <Tabbar.Item
        selected={location.pathname === "/"}
        onClick={() => navigate("/")}
        text="Home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 20V12.5L12 4.5L4 12.5V20H9V14H15V20H20Z" />
        </svg>
      </Tabbar.Item>
      <Tabbar.Item
        selected={location.pathname === "/gallery"}
        onClick={() => navigate("/gallery")}
        text="Gallery"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4H20V16H4V4ZM2 4C2 2.9 2.9 2 4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V4ZM8 20H16V22H8V20Z" />
        </svg>
      </Tabbar.Item>
      <Tabbar.Item
        selected={location.pathname === "/ring-editor"}
        onClick={() => navigate("/ring-editor")}
        text="Create"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
      </Tabbar.Item>
      <Tabbar.Item
        selected={location.pathname === "/my-rings"}
        onClick={() => navigate("/my-rings")}
        text="My Rings"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17V7L12 12L2 7V17Z" />
        </svg>
      </Tabbar.Item>
      <Tabbar.Item
        selected={location.pathname === "/profile"}
        onClick={() => navigate("/profile")}
        text="Profile"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
      </Tabbar.Item>
    </Tabbar>
  );
};
