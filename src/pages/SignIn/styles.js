import styled from 'styled-components/native';

export const Container = styled.View`
	align-items: center;
	justify-content: center;
	flex: 1;
	padding: 0 30px;	  
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #F4EDE8;
  /*font-weight: bold;*/
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const FortgotPassword = styled.TouchableOpacity`
	margin-top: 24px;
`;

export const FortgotPasswordText = styled.Text`
	color: #f4efe8;
	font-size: 18px;	
`;

export const CreateAccountButton = styled.TouchableOpacity`
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	background: #312e38;
	border-top-width: 1px;
	border-color: #232129;
	padding: 16px 0;

	align-items: center;
	justify-content: center;
	flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
	color: #ff9000;
	font-size: 18px;
  	font-family: 'RobotoSlab-Regular';
	/*font-weight: bold;*/
	margin-left: 16px;
`;
