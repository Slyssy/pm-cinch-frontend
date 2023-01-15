import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Dropdown(props) {
  const [orgs, setOrgs] = useState([]);
  // eslint-disable-next-line
  const [selection, setSelection] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    const payload = event.target.value;
    props.selectDropdown(payload);
    setSelection(event.target.value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get('https://pm-cinch-backend.vercel.app/organizations')
      .then((response) => {
        console.log(response.data);
        setOrgs(response.data);
      });
    props.getOrgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Button
        id='select-company-button'
        aria-controls={open ? 'select-company-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Select Company
      </Button>
      <Menu
        id='select-company-menu'
        aria-labelledby='select-company-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {orgs.map((org) => {
          // console.log(org);
          return (
            <MenuItem onClick={handleClose} key={`${org.id}__option`}>
              {org.company_name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
