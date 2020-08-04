import React from 'react';

import { Logo } from '../UI/Logo';

const Footer = () => {
  return (
    <footer>
      <div>
        <div className="logo_footer">
          <div className="logo">
            <Logo link={true} linkTo="/" width="70px" height="70px" />
          </div>
        </div>
        <p>Manchester utd. All Rights &copy; reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
