import React from "react";
import { Checkbox } from "@material-ui/core";
import { Row } from "simple-flexbox";

export default function GameMedia(props) {
  let { style, image, selected } = props;
  return (
    <div className={"cardImage"} style={style} image={image}>
      <Row>
        <div style={{ flex: 1 }} />
        <Checkbox className={"selectCheckbox"} checked={selected} />
      </Row>
    </div>
  );
}
