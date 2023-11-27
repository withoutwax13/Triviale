import { Dialog, DialogProps, DialogTitle, IconButton } from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
  ariaDescribedBy: string;
  ariaLabeledBy: string;
  children: ReactNode;
  dialogTitle?: string;
  fullScreen?: boolean;
  centerTitle?: boolean;
}

const CustomDialog = ({
  open,
  onClose,
  TransitionComponent,
  ariaDescribedBy,
  children,
  ariaLabeledBy,
  dialogTitle = "",
  fullScreen = false,
  centerTitle = false,
}: CustomDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabeledBy}
      keepMounted
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      sx={{ zIndex: "modal", mx: 0, mb: 2 }}
    >
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: "28px", pb: dialogTitle ? 0 : 1 }}
        justifyContent={centerTitle ? "center" : undefined}
        display={"flex"}
      >
        {dialogTitle}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 10,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default CustomDialog;
