import { Stack, Typography } from "@mui/material";
import { LOCALE } from "../../constants/strings";

const LandingDateInfo = () => {
  const options: { month: "long" } = { month: "long" };
  const today = new Date();
  const date = today.getDate();
  const month = new Intl.DateTimeFormat(LOCALE, options).format(today);
  const year = today.getFullYear();

  return (
    <Stack direction={"column"}>
      <Typography fontWeight={"bold"}>
        {month} {date}, {year}
      </Typography>
      <Typography>Edited by Jet Lee</Typography>
    </Stack>
  );
};

export default LandingDateInfo;
