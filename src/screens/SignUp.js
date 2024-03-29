
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import styled from "styled-components";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
`
const Subtitle = styled(FatLink)`
    font-size: 16px;
    margin-top : 10px;
    text-align:center;
`
const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName : String!
        $lastName : String
        $username : String!
        $email : String!
        $password : String!
    ) {
    createAccount(
        firstName : $firstName
        lastName : $lastName
        username : $username
        email : $email
        password : $password
    ) {
        ok
        error
    }
    }
`
function SignUp() {
    const history = useHistory();
    const onCompleted = (data) => {
        const { username, password } = getValues();
        const {
            createAccount: { ok, error },
        } = data;

        if (!ok) {
            return;
        }
        history.push({
            pathname: routes.home,
            message: "Account created. Please log in",
            username,
            password,
        });
    }
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const { register, handleSubmit, errors, formState, getValues } = useForm({
        mode: "onChange",
    });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        createAccount({
            variables: {
                ...data,
            },
        });

    }
    return (
        <AuthLayout>
            <PageTitle title="Sign Up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </HeaderContainer>
                <Subtitle>
                    Sign up to see photos and videos from your friends.
                </Subtitle>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input {...register('firstName', {
                        required: "First Name is required",
                    })} name="firstName" type="text" placeholder="First Name" />
                    <Input {...register('lastName', {

                    })} name="lastName" type="text" placeholder="Last Name" />
                    <Input {...register('email', {
                        required: "Email is required",
                    })} name="email" type="text" placeholder="Email" />
                    <Input {...register('username', {
                        required: "Username is required",
                    })} name="username" type="text" placeholder="Username" />
                    <Input {...register('password', {
                        required: "Password is required",
                    })} name="password" type="password" placeholder="Password" />
                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!formState.isValid || loading} />
                </form>
            </FormBox>
            <BottomBox
                cta="Have an account?"
                linkText="Log in"
                link={routes.home}
            />
        </AuthLayout>
    )
}
export default SignUp;