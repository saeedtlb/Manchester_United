import React from 'react';

import { Link } from 'react-router-dom';

import man_utd from '../../Resources/pic/Manchester-Logo.png';

export const Logo = (props) => {
  const template = (
    <div
      style={{
        background: `url(${man_utd}) no-repeat`,
        backgroundSize: 'cover',
        width: props.width,
        height: props.height,
      }}
    ></div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};
