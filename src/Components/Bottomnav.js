import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Subgreddits from './Subgreddits';
import Mysubgreddits from "./MySubgreddits"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Savedposts from './Savedposts';

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, []);

  return (
    <div className="container my-4">

    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      {
        (value===0)&&(
            <Subgreddits/>)
      }
      { 
        (value==1) &&(
          <Mysubgreddits/>
        )
      }
      {
        (value==2) && (
          <Savedposts/>
        )
      }
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue)
          }}
        >
          <BottomNavigationAction label="SubGreddits" icon={<RestoreIcon />} />
          <BottomNavigationAction label="My SubGreddits" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Saved Posts" icon={<BookmarkIcon />} />
          {/* <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} /> */}
        </BottomNavigation>
      </Paper>
    </Box>
    </div>
  );
}

