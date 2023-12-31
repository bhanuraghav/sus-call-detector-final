import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography } from '@mui/material';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

import { fetchData } from './finalData.js';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-55px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px'
  }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light
  }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }) => {
  const theme = useTheme();

  const [showOverlay, setShowOverlay] = useState(false);
  const [rowData, setRowData] = useState([]);

  const handleOnClick = () => {
    //   fetch('http://localhost:9001/sus/body')
    //     .then((res) => res.json())
    //     .then((data) => setRowData(data));
    const rowDataTemp = [];
    for (const key in fetchData) {
      const data = {
        callId: key,
        ...fetchData[key]
      };
      rowDataTemp.push(data);
    }
    setRowData(rowDataTemp);
    setShowOverlay(true);
  };

  // Each Column Definition results in one Column.
  const columnDefs = [
    { field: 'callId', filter: true },
    { field: 'tokens', filter: true },
    { field: 'users', width: 300 }
  ];

  const handleClose = () => {
    setShowOverlay(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <div>
      <OutlineInputStyle
        id="input-search-header"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <ButtonBase sx={{ borderRadius: '12px' }}>
              <HeaderAvatarStyle variant="rounded">
                <IconSearch stroke={1.5} size="1.3rem" onClick={handleOnClick} />
              </HeaderAvatarStyle>
            </ButtonBase>
            <Box sx={{ ml: 2 }}>
              <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    background: theme.palette.orange.light,
                    color: theme.palette.orange.dark,
                    '&:hover': {
                      background: theme.palette.orange.dark,
                      color: theme.palette.orange.light
                    }
                  }}
                  {...bindToggle(popupState)}
                >
                  <IconX stroke={1.5} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            </Box>
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ 'aria-label': 'weight' }}
      />
      <Modal open={showOverlay} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search Result Grid
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rowData} columns={columnDefs} getRowId={(row) => row.callId} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

MobileSearch.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [rowData, setRowData] = useState([]);

  const handleOnClick = () => {
    // fetch('http://localhost:9001/sus/body')
    //   .then((res) => res.json())
    //   .then((data) => setRowData(data));

    const rowDataTemp = [];
    for (const key in fetchData) {
      const data = {
        callId: key,
        ...fetchData[key]
      };
      rowDataTemp.push(data);
    }
    setRowData(rowDataTemp);
    setShowOverlay(true);
  };

  // Each Column Definition results in one Column.
  const columnDefs = [
    { field: 'callId', filter: true },
    { field: 'tokens', filter: true },
    { field: 'users', width: 300 }
  ];

  const handleClose = () => {
    setShowOverlay(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <ButtonBase sx={{ borderRadius: '12px' }}>
                  <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                    <IconSearch stroke={1.5} size="1.2rem" />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                      <Card
                        sx={{
                          background: '#fff',
                          [theme.breakpoints.down('sm')]: {
                            border: 0,
                            boxShadow: 'none'
                          }
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs>
                              <MobileSearch value={value} setValue={setValue} popupState={popupState} />
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutlineInputStyle
          id="input-search-header"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <ButtonBase sx={{ borderRadius: '12px' }}>
                <HeaderAvatarStyle variant="rounded">
                  <IconSearch stroke={1.5} size="1.3rem" onClick={handleOnClick} />
                </HeaderAvatarStyle>
              </ButtonBase>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'weight' }}
        />
        <Modal open={showOverlay} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Search Result Grid
            </Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={rowData} columns={columnDefs} getRowId={(row) => row.callId} />
            </div>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default SearchSection;
