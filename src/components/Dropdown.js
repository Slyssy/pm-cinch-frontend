import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { selectDropdown } from '../redux/actions';

export default function Dropdown(props) {
  // console.log(props);
  const [orgs, setOrgs] = useState([]);
  // eslint-disable-next-line
  const [selection, setSelection] = useState('');

  const handleChange = (event) => {
    setSelection(event.target.value);
    const payload = selection;
    console.log(payload);
    props.selectDropdown(event.target.value);
  };

  useEffect(() => {
    axios
      .get('https://pm-cinch-backend.vercel.app/organizations')
      .then((response) => {
        // console.log(response.data);
        setOrgs(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    props.getOrgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ m: 1, minWidth: 180 }}>
      <FormControl variant='standard' fullWidth>
        <InputLabel>Select Company</InputLabel>
        <Select
          value={selection}
          label='Select Company'
          onChange={handleChange}
        >
          {orgs.map((org) => {
            // console.log(org);
            return (
              <MenuItem key={`${org.id}__option`} value={org.company_name}>
                {org.company_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
