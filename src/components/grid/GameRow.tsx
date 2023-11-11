import { Box, PaletteColor, Stack, useTheme } from "@mui/material";
import useQuestionByID from "../../hooks/useQuestionByID";
import useGameStateStore from "../../stores/gameStateStore";
import Cell from "./Cell";
import useDailyIndex, { getPositiveIndex } from "../../hooks/useDailyIndex";

interface GameRowProps {
  guess: string[];
  statuses?: PaletteColor[];
}

const GameRow = ({ guess, statuses = [] }: GameRowProps) => {
  const dailyIndex = useDailyIndex();
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const safeIndex = getPositiveIndex(dailyIndex + questionNumber);
  const question = useQuestionByID(safeIndex);
  const answerWithSpaces = question?.answer.toLocaleUpperCase()!;
  const answer = answerWithSpaces.replace(/\s+/g, "")!;
  const emptyCells = Array.from(Array(answer.length - guess.length));
  const theme = useTheme();
  let numSpacesForward = 1;

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      {guess.map((letter, i) => {
        let shouldSkip = false;
        if (answerWithSpaces[i + numSpacesForward] === " ") {
          shouldSkip = true;
          numSpacesForward += 1;
        }
        return (
          <>
            <Cell
              key={i}
              nthLetter={i + 1}
              value={letter}
              status={statuses[i]}
            />
            {i < answer.length - 1 && (
              <Box
                key={`after ${i}`}
                sx={{
                  width: shouldSkip ? "10px" : "5px",
                  borderBottom: shouldSkip ? 0 : 2,
                  borderColor:
                    statuses[i] === theme.palette.success &&
                    statuses[i + 1] === theme.palette.success
                      ? statuses[i].main
                      : statuses[i] === theme.palette.error ||
                        statuses[i + 1] === theme.palette.error ||
                        statuses[i] === theme.palette.warning ||
                        statuses[i + 1] === theme.palette.warning
                      ? "primary.dark"
                      : "primary.light",
                }}
              />
            )}
          </>
        );
      })}
      {emptyCells.map((_, i) => {
        let shouldSkipEmpty = false;
        if (answerWithSpaces[i + guess.length + numSpacesForward] === " ") {
          shouldSkipEmpty = true;
          numSpacesForward += 1;
        }
        return (
          <>
            <Cell key={i + guess.length} nthLetter={guess.length + i + 1} />
            {i < answer.length - guess.length - 1 && (
              <Box
                key={`after ${i + guess.length}`}
                sx={{
                  width: shouldSkipEmpty ? "10px" : "5px",
                  borderBottom: shouldSkipEmpty ? 0 : 2,
                  borderColor: "primary.dark",
                }}
              />
            )}
          </>
        );
      })}
    </Stack>
  );
};

export default GameRow;
