import {
  DialogProps,
  Divider,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  ABOUT_AUTHOR_URL,
  BUG_REPORT_TEXT,
  FEEDBACK_TEXT,
  SETTINGS_DIALOG_ARIA,
  SETTINGS_TITLE,
} from "../../../constants/strings";
import CustomDialog from "../CustomDialog";
import ColorModeSwitch from "./ColorModeSwitch";
import EmailButton from "./EmailButton";
import HardModeSwitch from "./HardModeSwitch";
import HighContrastSwitch from "./HighContrastSwitch";
import OnscreenKeyboardOnlySwitch from "./OnscreenKeyboardOnlySwitch";

export interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
}

const SettingsDialog = ({
  open,
  onClose,
  TransitionComponent,
}: SettingsDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={SETTINGS_DIALOG_ARIA}
      ariaLabeledBy={SETTINGS_TITLE}
    >
      <List>
        <ListItem>
          <HardModeSwitch />
        </ListItem>
        <Divider component="li" sx={{ mx: 2 }} />
        <ListItem>
          <ColorModeSwitch />
        </ListItem>
        <Divider component="li" sx={{ mx: 2 }} />
        <ListItem>
          <HighContrastSwitch />
        </ListItem>
        <Divider component="li" sx={{ mx: 2 }} />
        <ListItem>
          <OnscreenKeyboardOnlySwitch />
        </ListItem>
        <Divider component="li" sx={{ mx: 2 }} />
        <ListItem>
          <EmailButton text={FEEDBACK_TEXT} />
        </ListItem>
        <Divider component="li" sx={{ mx: 2 }} />
        <ListItem>
          <EmailButton text={BUG_REPORT_TEXT} />
        </ListItem>
        <Divider component="li" sx={{ mx: 2 }} />
        <ListItem>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={"100%"}
          >
            <Typography>About the Author</Typography>
            <Link
              href={ABOUT_AUTHOR_URL}
              title={`About the author`}
              color={"inherit"}
              target="_blank"
              rel="noopener"
            >
              URL
            </Link>
          </Stack>
        </ListItem>
      </List>
    </CustomDialog>
  );
};

export default SettingsDialog;
