import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";


const FacebookLogin = styled.div`
    color : #385285;
    span {
        margin-left : 10px;
        font-weight : 600;
    }
`

function Login() {
    const { register, watch, handleSubmit, formState } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        // console.log(data);
    }

    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <h1>Instagram</h1>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register('username', {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "Username should be longer than 5 characters"
                            },
                        })}
                        name="username"
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.username?.message)}
                    />
                    <FormError message={formState.errors?.username?.message} />
                    <Input
                        {...register('password', {
                            required: "Password is required.",
                        })}
                        name="password"
                        type="password"
                        placeholder="Password"
                        hasError={Boolean(formState.errors?.password?.message)}
                    />
                    <FormError message={formState.errors?.password?.message} />
                    <Button type="submit" value="Log in" disabled={!formState.isValid} />
                </form>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                linkText="Sign Up"
                link={routes.signUp}
            />
        </AuthLayout>
    )
}
export default Login;