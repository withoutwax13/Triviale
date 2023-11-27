import { Button, Paper, Stack, Typography } from "@mui/material";
import { MAX_CHALLENGES } from "../../constants/settings";
import {
  NEXT_QUESTIONS_TEXT,
  NUMBER_CORRECT_TEXT,
  SKIP_BUTTON_TEXT,
  SKIP_LETTER,
  WIN_MESSAGES,
} from "../../constants/strings";
import useDailyIndex, { getPositiveIndex } from "../../hooks/useDailyIndex";
import useQuestionByID from "../../hooks/useQuestionByID";
import useCurrGuessStore from "../../stores/currGuessStore";
import useGameStateStore from "../../stores/gameStateStore";
import useDialogStore from "../../stores/dialogStore";
import useOnscreenKeyboardOnlyStore from "../../stores/onscreenKeyboardOnlyStore";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  if (!children) return null;
  const { gameState, moveToNextQuestion, questionNumber } = useGameStateStore();
  const guessNumber =
    useGameStateStore((s) => s.guessNumber[questionNumber]) + 1;
  const length = children.length / MAX_CHALLENGES; // TODO: Split questions more intelligently.
  const makeGuess = useGameStateStore((s) => s.makeGuess);
  const resetGuess = useCurrGuessStore((s) => s.resetGuess);
  const questionState = useGameStateStore((s) => s.questionState);
  const setStatsOpen = useDialogStore((s) => s.setStatsOpen);
  const onscreenKeyboardOnly = useOnscreenKeyboardOnlyStore(
    (s) => s.onscreenKeyboardOnly
  );
  const summary =
    guessNumber < MAX_CHALLENGES &&
    questionState[questionNumber] === "inProgress"
      ? children.substring(0, guessNumber * length) + "..."
      : children;
  const randomIndex = Math.floor(Math.random() * WIN_MESSAGES.length);
  const dailyIndex = useDailyIndex();
  const safeIndex = getPositiveIndex(dailyIndex + questionNumber);
  const answer = useQuestionByID(safeIndex)?.answer!.replace(/\s+/g, "")!;
  const numWon = questionState.reduce(
    (acc, guess) => acc + (guess === "won" ? 1 : 0),
    0
  );
  const customWidth = "calc(100% - 48px)";

  return (
    <Stack alignItems={"center"}>
      <Paper elevation={2} sx={{ mb: 2, mx: 3, width: customWidth }}>
        <Typography fontSize="large" m={2}>
          {summary}
        </Typography>
      </Paper>
      {(guessNumber < MAX_CHALLENGES ||
        questionState[questionNumber] !== "inProgress") && (
        <Button
          id="ExpandableButton"
          disableFocusRipple={!onscreenKeyboardOnly}
          onClick={() => {
            if (
              questionState[questionNumber] !== "inProgress" &&
              gameState === "inProgress"
            ) {
              resetGuess();
              moveToNextQuestion();
            }
            if (questionState[questionNumber] === "inProgress") {
              makeGuess(Array(answer.length).fill(SKIP_LETTER));
              resetGuess();
            }
            if (gameState !== "inProgress") {
              setStatsOpen(true);
            }
          }}
          color="secondary"
          variant={
            questionState[questionNumber] === "inProgress"
              ? "text"
              : "contained"
          }
          sx={{
            mb: 1,
            width:
              questionState[questionNumber] === "inProgress"
                ? `calc(min(100vw - 16px, ${answer.length * 52}px + ${
                    (answer.length - 1) * 5
                  }px))`
                : customWidth,
          }}
        >
          {gameState === "inProgress"
            ? questionState[questionNumber] === "inProgress"
              ? SKIP_BUTTON_TEXT
              : questionState[questionNumber] === "won"
              ? WIN_MESSAGES[randomIndex] + " " + NEXT_QUESTIONS_TEXT
              : NEXT_QUESTIONS_TEXT
            : gameState === "lost"
            ? NUMBER_CORRECT_TEXT(numWon)
            : WIN_MESSAGES[randomIndex] + " " + NUMBER_CORRECT_TEXT(numWon)}
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
