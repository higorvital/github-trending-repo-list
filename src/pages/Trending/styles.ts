import styled from 'styled-components/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated } from 'react-native';


export const Container = styled.View`
    padding: 20px;
    /* background: #24292e; */
    height: 100%;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
`;


export const Loading = styled.View`

    height: 100%;
    align-items: center;
    justify-content: center;


`

export const LoadingIcon = styled(Animated.View)`

    


`