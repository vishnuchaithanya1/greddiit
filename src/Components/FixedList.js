import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import PersonIcon from '@mui/icons-material/Person';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { blue } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem disableGutters>
      <ListItemButton >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"email"} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
