import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

import { Logo } from '../UI/Logo';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHead: 0,
      Y: 0,
      to: '',
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const to = this.props.user ? '/dashboard' : '/sign_in';
    this.setState({
      to,
    });
  }

  handleScroll = () => {
    this.setState((prev) => {
      let Y = window.scrollY;
      let showHead = 0;
      if (Y > prev.Y && Y > 70) {
        showHead = -150;
      } else {
        showHead = 0;
      }

      return {
        showHead,
        Y,
      };
    });
  };

  render() {
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: '#C70101',
          padding: '15px 0',
          borderBottom: '5px solid #1A1A1A',
          boxShadow: 'none',
          transform: `translateY(${this.state.showHead}px)`,
          transition: 'transform .6s linear',
        }}
      >
        <Toolbar style={{ display: 'flex' }}>
          <div className="logo" style={{ flexGrow: '1' }}>
            <Logo link={true} linkTo="/" width="70px" height="70px" />
          </div>

          <Link to="/the_team" style={{ textDecoration: 'none' }}>
            <Button style={{ color: '#ffffff' }}>The team</Button>
          </Link>

          <Link to="/the_matches" style={{ textDecoration: 'none' }}>
            <Button style={{ color: '#ffffff' }}>Matches</Button>
          </Link>

          <Link to={this.state.to} style={{ textDecoration: 'none' }}>
            <Button style={{ color: '#ffffff' }}>
              {this.props.user ? 'Dashboard' : 'sign in'}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
