// import React, { useState } from 'react';
// import dayjs, { Dayjs } from 'dayjs';
// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import MomentUtils from '@date-io/moment';

// export default function BasicDatePicker(props) {
//   console.log('DatePicker props:', props);
//   const [value, setValue] = useState(dayjs());
//   const [esd, setEsd] = useState(null);
//   const [ecd, setEcd] = useState(null);

//   const handleDateChange = (newValue) => {
//     setValue(newValue);
//     if (props.label === 'Est. Start Date') {
//       setEsd(newValue.$d);
//       let payload = esd;
//       props.addESD(payload);
//     } else if (props.label === 'Est. Complete Date') {
//       setEcd(newValue.$d);
//       let payload = ecd;
//       props.addECD(payload);
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         label={props.label}
//         value={value}
//         onChange={handleDateChange}
//         renderInput={(params) => <TextField {...params} />}
//       />
//     </LocalizationProvider>
//   );
// }
