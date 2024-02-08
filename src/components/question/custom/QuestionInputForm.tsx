import { useState } from "react";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Question } from "../../../data/questions";
import useCustomQuestionsStore from "../../../stores/customQuestionsStore";
import { MAX_CATEGORY_STRING_LENGTH } from "../../../constants/settings";
import useGameStateStore from "../../../stores/gameStateStore";

type QuestionKeyTypes = keyof Question;
type QuestionValueTypes = Question[QuestionKeyTypes];

interface QuestionInputFormProps {
  name: QuestionKeyTypes;
  control: Control<Question, any>;
  register: UseFormRegister<Question>;
  useAutocomplete?: boolean;
  label: string;
  placeholder: string;
  maxLength?: number;
  minRows?: number;
  options?: readonly string[];
}

const QuestionInputForm = ({
  name,
  label,
  placeholder,
  control,
  register,
  maxLength,
  minRows,
  useAutocomplete,
  options,
}: QuestionInputFormProps) => {
  const customQuestions = useCustomQuestionsStore((s) => s.customQuestions);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const [value, setValue] = useState<QuestionValueTypes>(
    customQuestions[questionNumber][name]
  );

  const TextFieldInterior = (
    <TextField
      multiline
      minRows={minRows}
      fullWidth
      label={label}
      placeholder={placeholder}
      InputProps={{ sx: { borderRadius: 3 } }}
      inputProps={{
        maxLength: maxLength && MAX_CATEGORY_STRING_LENGTH,
      }}
      {...register(name, {
        setValueAs: () => value,
      })}
    />
  );

  const AutoCompleteInterior = (
    <Autocomplete
      options={options || []}
      fullWidth
      freeSolo
      renderInput={TextFieldInterior}
    />
  );

  return (
    <Controller
      control={control}
      name={name}
      render={() =>
        useAutocomplete ? AutoCompleteInterior : TextFieldInterior
      }
    ></Controller>
  );
};

export default QuestionInputForm;
