import { Box, Button, Stack, Typography } from "@mui/material";
import logo from "/jacks_its_ac_design.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <Stack
      direction="row"
      padding="10px"
      justifyContent="center"
      bgcolor="#ff5c6d" // TODO: Extract this to a variable
    >
      <Stack direction="row">
        <Box
          component="img"
          sx={{
            width: 60,
            height: 60,
            borderRadius: 2.6,
          }}
          alt="ScheduleTerp's logo"
          src={logo}
        />
        <Button variant="text" aria-label="About" color="info">
          Triviale
        </Button>
      </Stack>
      <Stack direction="row">
        <ColorModeSwitch />
      </Stack>
    </Stack>
  );
};

export default NavBar;
