import { darkModeVar, isLoggedInVar } from "../apollo";
import styled, { css } from "styled-components";
import { useState } from "react";

const Title = styled.h1`
    color : ${(props) => props.theme.fontColor};
`
const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
`


function Login() {
    return (
        <Container>
            <Title>Login</Title>
            <button onClick={() => darkModeVar(true)}>To dark</button>
            <button onClick={() => darkModeVar(false)}>To Light</button>
        </Container>
    )
}
export default Login;