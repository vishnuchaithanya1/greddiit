import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { Stack, Chip } from "@mui/material";
import { useContext } from "react";
import sgcontext from "../Context/subgreddits/sgcontext";

const host = "https://redditbackend.onrender.com";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const addgreddits = useContext(sgcontext).addgreddits;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setbannedwords([]);
    settags([]);
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addgreddits(data.get("name"), data.get("description"), tags, bannedwords);
    handleClose();
    settags([]);
    setbannedwords([]);
    sethelpword("");
    sethelptag("");
  };
  const [tags, settags] = useState([]);
  const [bannedwords, setbannedwords] = useState([]);
  const [helptag, sethelptag] = useState("");
  const [helpword, sethelpword] = useState("");
  const onChange = (e) => {
    console.log(e.target.value);
    sethelptag(e.target.value);
  };
  const onChange1 = (e) => {
    console.log(e.target.value);
    sethelpword(e.target.value);
  };
  const addtag = () => {
    console.log(helptag);
    let newtags = [].concat(tags, helptag);
    settags(newtags);
    sethelptag("");
  };
  const addbannedword = () => {
    console.log(helpword);
    let newwords = [].concat(bannedwords, helpword);
    setbannedwords(newwords);
    sethelpword("");
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Add
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Create SubGreddit
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1}>
                    {tags.length != 0 &&
                      tags.map((tag) => {
                        return <Chip label={tag} />;
                      })}
                  </Stack>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    fullWidth
                    id="tags"
                    label="Tags"
                    name="tags"
                    autoComplete="tags"
                    onChange={onChange}
                    value={helptag}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton aria-label="delete" onClick={addtag}>
                    <AddCircleIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1}>
                    {bannedwords.length != 0 &&
                      bannedwords.map((tag) => {
                        return <Chip label={tag} />;
                      })}
                  </Stack>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    fullWidth
                    id="bannedwords"
                    label="Banned Words"
                    name="bannedwords"
                    autoComplete="new-word"
                    onChange={onChange1}
                    value={helpword}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton aria-label="delete" onClick={addbannedword}>
                    <AddCircleIcon />
                  </IconButton>
                </Grid>

                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                create
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 5 }}
                onClick={handleClose}
                color="error"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
