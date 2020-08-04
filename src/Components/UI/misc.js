import React from 'react';

import { Link } from 'react-router-dom';

export const Tag = (props) => {
  const template = (
    <div className="tag" style={props.style}>
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const firebaseLooper = (snapshot) => {
  let data = [];

  snapshot.forEach((child) => {
    data.push({
      ...child.val(),
      id: child.key,
    });
  });
  return data;
};

export const reversedArray = (orginalArray) => {
  let reverseArr = [];

  for (let i = orginalArray.length - 1; i >= 0; i--) {
    reverseArr.push(orginalArray[i]);
  }
  return reverseArr;
};

export const validate = (element) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${valid ? '' : 'Must be a valid email'}`;
    error = valid ? error : [false, message];
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${valid ? '' : 'This field is required'}`;
    error = valid ? error : [false, message];
  }

  return error;
};
