import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
	height: 60px;
	background-color: #ff9000;
	border-radius: 10px;
	margin-top: 10px;
	justify-content: center;
	align-items: center;
`

export const ButtonText = styled.Text`
  	font-family: 'RobotoSlab-Regular';
	color: #312e38;
	font-size: 18px;
`