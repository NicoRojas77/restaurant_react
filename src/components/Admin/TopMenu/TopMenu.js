import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { useAuth} from "../../../hooks";
import "./TopMenu.scss";

export function TopMenu() {
  const { auth, logout } = useAuth();

  const renderName = () => {
    if (auth.me?.username) {
      return `${auth.me.username}`;
    }
    return auth.me?.email;
  };

  return (
    <Menu fixed="top" className="top-menu-admin">
      <Menu.Item className="top-menu-admin__logo">
        <p>S.XXI ADMIN</p>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Hola {renderName()}</Menu.Item>
        <Menu.Item onClick={logout}>
          <Icon name="sign-out" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
