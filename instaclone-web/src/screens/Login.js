import { isLoggedInVar } from "../apollo";
import styled, { css } from "styled-components";
import { useState } from "react";

const Title = styled.h1`
    color : ${props => props.potato ? "palevioletred" : "beige"};
    font-family: 'Courier New', Courier, monospace;
    ${(props) =>
        props.potato
            ? css`
             font-size : 49px ;
            `
            : css`
            text-decoration: underline;
        `}
`
const Container = styled.div`
    background-color: tomato;
`
const TogglePotato = styled.button`
    color:red;
`

function Login() {
    const [potato, setPotato] = useState(false);
    const togglePotato = () => setPotato((current) => !current)
    return (
        <Container>
            <Title potato={potato}>Login</Title>
            <TogglePotato onClick={togglePotato}>togglePotato</TogglePotato>
            <button onClick={() => isLoggedInVar(true)}>Log in now!</button>
        </Container>
    )
}
export default Login;