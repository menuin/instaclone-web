import styled from "styled-components";

const SButton = styled.input`
border : none;
margin-top: 12px;
background-color: ${(props) => props.theme.accent};
color: white;
text-align : center;
padding : 6px 0px;
font-weight : 600;    
width : 100%;
`

function Button(props) {
    return <SButton {...props} />
}

export default Button;