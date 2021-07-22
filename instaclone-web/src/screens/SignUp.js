
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

function SignUp() {
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
                <form>
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Name" />
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit" value="Sign Up" />
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