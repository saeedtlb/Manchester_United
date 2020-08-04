import React from 'react';

const PlayerCard = ({ bck, name, lastname, number }) => {
  return (
    <div className="player_card_wrapper">
      <div
        className="player_card_thmb"
        style={{ background: `#1a1a1a url(${bck})` }}
      ></div>
      <div className="player_card_nfo">
        <div className="player_card_number">{number}</div>
        <div className="player_card_name">
          <span>{name}</span>
          <span>{lastname}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
