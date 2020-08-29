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
	BackToSignIn,
	BackToSignInText
} from './styles'
import { Form } from '@unform/mobile'

import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

import Icon from 'react-native-vector-icons/Feather'
import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidation'
import api from '../../services/api'
import Logo from '../../assets/Logo.png'

const SignUp = () => {
	const navigation = useNavigation()

	const formRef = useRef(null)
	const emailInputRef = useRef(null)
	const passInputRef = useRef(null)

	const handleSubmit = useCallback( async (data) => {
		try {
			formRef.current?.setErrors({})

			const schema = Yup.object().shape({
				name: Yup.string().required('Campo Obrigatório'),
				email: Yup.string().required('Campo Obrigatório').email('Email inválido'),
				password: Yup.string().min(6, 'No mínimo 6 digitos')
			})

			await schema.validate(data, {
				abortEarly: false
			})

			await api.post('/user', data)
			Alert.alert(
				'Cadastro realizado com sucesso!',
				'Faça seu login!'
			)
			navigation.goBack()


		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errors = getValidationErrors(error)
				console.log(errors)

				formRef.current?.setErrors(errors)
				return
			}

			Alert.alert(
				'Erro na autenticação',
				'Ocorreu um erro ao fazer login, cheque as credenciais'
			)
		}
	}, [navigation])
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
							<Title>Crie sua conta</Title>
						</View>
						<Form onSubmit={handleSubmit} ref={formRef}>
							<Input 
								name="name" 
								autoCapitalize="words" 
								icon="user" 
								placeholder="Nome"
								returnKeyType="next"
								onSubmitEditing={() => {
									emailInputRef.current.focus()
								}}
							/>						
							
							<Input 
								ref={emailInputRef}
								name="email" 
								keyboardType="email-address" 
								autoCapitalize="none" 
								autoCorrect={false} 
								icon="mail" 
								returnKeyType="next"
								placeholder="Email" 
								onSubmitEditing={() => {
									passInputRef.current.focus()
								}}
							/>
							
							<Input 
								ref={passInputRef}
								name="password" 
								secureTextEntry 
								icon="lock" 
								textContentType="newPassword" 
								placeholder="Senha" 
								onSubmitEditing={() => {
									formRef.current.submitForm()
								}}
							/>

							<Button onPress={() => formRef.current.submitForm()}>Cadastrar</Button>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
			<BackToSignIn onPress={() => navigation.goBack()}>
				<Icon name="arrow-left" size={20} color="#ffffff" />
				<BackToSignInText>Voltar ao login</BackToSignInText>
			</BackToSignIn>
		</>
	)
}

export default SignUp