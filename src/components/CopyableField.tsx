import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


interface CopyableFieldProps extends Omit<TextFieldProps, 'onCopy'> {
    onCopy?: () => void;
}

const CopyableField: React.FC<CopyableFieldProps> = ({ onCopy, ...props }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [showSnackbar, setShowSnackbar] = React.useState(false);

    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }

    const handleCopy = () => {
        if (inputRef.current) {
            inputRef.current.select();
            copyTextToClipboard(inputRef.current.value)
                .then(() => {
                    if (onCopy) {
                        onCopy();
                    }
                    setShowSnackbar(true);
                })
                .catch((error) => {
                    console.error('Failed to copy to clipboard:', error);
                });
        }
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };


    return (
        <>
            <TextField
                {...props}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleCopy}>
                                <FileCopyOutlinedIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                inputRef={inputRef}
            />
            <Snackbar open={showSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <MuiAlert severity="success" onClose={handleSnackbarClose}>
                    Copied to clipboard!
                </MuiAlert>
            </Snackbar>

        </>
    );
};

export default CopyableField;