import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  padding: 20px;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
`;

export const Owner = styled.View`
  align-items: center;
  flex-direction: row;
`

export const OwnerAvatar = styled.Image`
  border-radius: 40px;
  width: 80px;
  height: 80px;
  margin-right: 10px;
`

export const OwnerName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`
export const Description = styled.Text`
  margin-top: 5px;
  color: #aaa;
`

export const Info = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 40px;
`

export const InfoItem = styled.View`
  /* flex-direction: row; */
  align-items: center;
`

export const InfoItemTop = styled.View`
  /* flex-direction: row; */
  align-items: center;
`

export const InfoItemBottom = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
`

export const InfoItemText = styled.Text`
  /* margin-left: 5px; */
`

export const Loading = styled.Text`
  align-items: center;
  justify-content: center;
`

export const FavoriteButton = styled.TouchableOpacity`

    position: absolute;
    top: 30px;
    right: 20px;
    z-index: 9999;
    
`

export const Url = styled.Text`
  margin-top: 10px;
`