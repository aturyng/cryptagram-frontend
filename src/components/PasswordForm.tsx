import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import React from 'react';


type FormData = {
    password: string
};

interface Props {
    onPasswordEntered: (arg0: string) => void
}

function PasswordForm(props: Props) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit: SubmitHandler<FormData> = (formData) => {
        props.onPasswordEntered(formData.password)
    }
    return (
        <>
            <Grid item sx={{ mx: 12 }}>
                <Typography variant="h4" align="center" sx={{ mb: 2 }}>
                    Provide Password
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                <FilledInput
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register("password")}
                                    error={errors.password ? true : false}
                                    //>helperText={errors.password?.message}
                                    sx={{ bgcolor: 'white' }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className="line" variant="contained" type='submit'>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </>
    )
}

export default PasswordForm