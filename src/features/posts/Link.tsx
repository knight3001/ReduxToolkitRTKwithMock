// Link.react.js
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

const STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal",
};

const Link = ({
  page,
  children,
}: {
  page: string;
  children: RouteComponentProps;
}) => {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={page || "#"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

export default Link;
