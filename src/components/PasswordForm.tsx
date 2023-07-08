import './MessageForm.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


type FormData = {
    password: string
};

interface Props {
    onPasswordEntered: (arg0: string) => void
}

function PasswordForm(props: Props) {

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="pwd">Password:</label>
                <input type="password" id="pwd"
                    {...register("password")}
                    //error={errors.password ? true : false}
                    //helperText={errors.password?.message}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default PasswordForm