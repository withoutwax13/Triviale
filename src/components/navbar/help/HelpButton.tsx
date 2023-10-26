import { IconButton } from "@mui/material";
import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import HelpDialog from "./HelpDialog";
import { HELP_BUTTON_ARIA } from "../../../constants/strings";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HelpButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label={HELP_BUTTON_ARIA}
        onClick={handleClickOpen}
      >
        <HelpOutlineIcon fontSize="large" />
      </IconButton>
      <HelpDialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      />
    </>
  );
};

export default HelpButton;
