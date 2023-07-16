import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const StyledForm = styled("form")(({ theme }) => ({
  "& .MuiTextField-root": {
    margin: theme.spacing(1)
  }
}));
const StyledTextField = styled(TextField)`
  textarea {
    resize: both;
    centered;
    width: 100%;
  }
`;

export default function MultilineTextFields() {
  return (
    <StyledForm noValidate autoComplete="off">
      <div>
        <StyledTextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
        />
      </div>
    </StyledForm>
  );
}
