import React, { useState, useEffect } from "react";
import { Button, Icon, Checkbox } from "semantic-ui-react";
import "./TablesListAdmin.scss";
import { map, size } from "lodash";
import { TableAdmin } from "../TableAdmin";

export function TablesListAdmin(props) {
  const { tables } = props;
  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    if (autoReload) {
      const autoReloadAction = () => {
        onReload();
        setTimeout(() => {
          autoReloadAction();
        }, 5000);
      };
      autoReloadAction();
    }
  }, [autoReload]);

  const onCheckAutoReload = (check) => {
    if (check) {
      setAutoReload(check);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="tables-list-admin">
      <Button
        primary
        icon
        className="tables-list-admin__reload"
        onClick={onReload}
      >
        <Icon name="refresh" />
        <span>Reload Manual</span>
      </Button>
      <div className="tables-list-admin__reload-toggle">
        <Checkbox
          toggle
          checked={autoReload}
          onChange={(_, data) => onCheckAutoReload(data.checked)}
        />
        <span>Reload automatico</span>
      </div>

      {map(tables, (table) => (
        <TableAdmin key={table.numero} table={table} reload={reload} />
      ))}
    </div>
  );
}
