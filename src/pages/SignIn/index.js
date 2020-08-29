import React, { useCallback, useRef } from 'react'
import { 
	View, 
	Image, 
	KeyboardAvoidingView, 
	Platform,
	ScrollView,
	Alert
} from 'react-native'

import { 
	Container, 
	Title, 
	FortgotPassword, 
	FortgotPasswordText,
	CreateAccountButton,
	CreateAccountButtonText
} from './styles'
import { Form } from '@unform/mobile'
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/Feather'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../context/auth'

import Logo from '../../assets/Logo.png'
import getValidationErrors from '../../utils/getValidation'
import * as Yup from 'yup'

const SignIn = () => {
	const navigation = useNavigation()
	const formRef = useRef(null)
	const passwordInputRef = useRef(null)
	const { signIn, user } = useAuth()

	const handleSubmit = useCallback( async (data) => {
		try {
			formRef.current?.setErrors({})

			const schema = Yup.object().shape({
				email: Yup.string().required('Campo Obrigatório').email('Email inválido'),
				password: Yup.string().required('Campo Obrigatório')
			})

			await schema.validate(data, {
				abortEarly: false
			})

			await signIn({
				email: data.email,
				password: data.password
			})

		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errors = getValidationErrors(error)
				formRef.current?.setErrors(errors)
				return
			}

			Alert.alert(
				'Erro na autenticação',
				'Ocorreu um erro ao fazer login, cheque as credenciais'
				)
		}
	}, [signIn])

	return (
		<>
			<KeyboardAvoidingView 
				style={{flex:1}}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				>
				{/* keyboardShouldPersistTaps -> Tiver no campo e tocar na tele, ele esconde o teclado, muito bom!! */}
				<ScrollView
					contentContainerStyle={{flex:1}}
					keyboardShouldPersistTaps="handled"
				>
					<Container>
						<Image source={Logo} />

						<View>
							<Title>Faça seu Login</Title>
						</View>
						<Form onSubmit={handleSubmit} ref={formRef}>
							<Input 
								name="email" 
								icon="mail" 
								placeholder="Email"
								autoCapitalize="none"
								keyboardType="email-address"
								autoCorrect={false} 
								returnKeyType="next"
								onSubmitEditing={() => {
									passwordInputRef.current.focus()
								}}
							/>
							<Input 
								ref={passwordInputRef}
								name="password" 
								icon="lock" 
								placeholder="Senha" 
								secureTextEntry
								returnKeyType="send"
								onSubmitEditing={() => {
									formRef.current.submitForm()
								}}
							/>

							<Button onPress={() => formRef.current.submitForm()}>Entrar</Button>
						</Form>
						<FortgotPassword onPress={() => console.log("Esqueci")}>
							<FortgotPasswordText>
								Esqueci minha senha
							</FortgotPasswordText>
						</FortgotPassword>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
			<CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
				<Icon name="log-in" size={20} color="#ff9000" />
				<CreateAccountButtonText>Crie uma conta</CreateAccountButtonText>
			</CreateAccountButton>
		</>
	)
}

export default SignIn