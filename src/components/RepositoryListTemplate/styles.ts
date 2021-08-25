import styled from 'styled-components/native';
import { Animated } from 'react-native';


export const Container = styled.View`
    padding: 20px;
    height: 100%;
    background: #24292e;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #fff;
`;


export const Loading = styled.View`

    padding-top: 200px;
    align-items: center;
    justify-content: center;

`

export const LoadingMore = styled.ActivityIndicator.attrs({
    size: "large",
    color: "#fff"
})`

    margin: 15px 0;

`