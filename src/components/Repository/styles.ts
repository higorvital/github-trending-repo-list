import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    background: #f5f5f5;
    border-radius: 4px;
    padding: 15px;
    /* border: 1px solid #f5f5f5; */
    shadow-color: #000;
    shadow-opacity: 0.5;
    shadow-radius: 4px;
    elevation: 3;
    /* shadow-offset: {width: 10; height: 2}; */
    margin-bottom: 10px;
    margin: 0 10px 10px 10px;

`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Avatar = styled.Image`
  margin-right: 20px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

export const Name = styled.Text`
    font-weight: bold;
    color: #000;
`;

export const Description = styled.Text.attrs({
    numberOfLines: 2
})`
    margin-top: 10px;
    color: #aaa;
`;

export const Footer = styled.View`
  
    flex-direction: row;
    margin-top: 15px;

`;

export const FooterItem = styled.View`
  
    /* display: flex; */
    margin-right: 20px;
    flex-direction: row;
    align-items: center;


`;

export const FooterItemText = styled.Text`
  
    margin-left: 4px;
    color: #000;

`;

export const FavoriteButton = styled.TouchableOpacity`

    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
    z-index:9999;
`