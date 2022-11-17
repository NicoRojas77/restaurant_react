import "./HeadrPage.scss";
import { Button } from "semantic-ui-react";

export function HeadrPage(props) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;
  return (
    <div className="headr-page-admin">
      <h2>{title}</h2>
      <div>
        {btnTitle && (
          <Button positive onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
        {btnTitleTwo && (
          <Button negative onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  );
}
