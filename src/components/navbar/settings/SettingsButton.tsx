import { IconButton } from "@mui/material";
import React from "react";
import SettingsDialog from "./SettingsDialog";
import SettingsRoundedIcon from "@mui/icons-material/Settings";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { SETTINGS_BUTTON_ARIA } from "../../../constants/strings";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SettingsButton = () => {
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
        aria-label={SETTINGS_BUTTON_ARIA}
        onClick={handleClickOpen}
      >
        <SettingsRoundedIcon fontSize="large" />
      </IconButton>
      <SettingsDialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      />
    </>
  );
};

export default SettingsButton;
