import React from 'react';

import { Tag } from '../../UI/misc';
import Blocks from './Blocks';

const Matches = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag
          style={{
            background: '#1a1a1a',
            fontSize: '50px',
            color: '#fff',
          }}
        >
          Matches
        </Tag>

        <Blocks />

        <Tag
          style={{
            background: '#fff',
            fontSize: '22px',
            color: '#000',
          }}
          link={true}
          linkTo="the_matches"
        >
          See more matches
        </Tag>
      </div>
    </div>
  );
};

export default Matches;
