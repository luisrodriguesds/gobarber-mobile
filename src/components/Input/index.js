import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import { useField } from '@unform/core'
import { Container, TextInput, Icon } from './styles'

const Input = ({ name, icon, ...rest }, ref) => {

	const [isFocused, setIsFoused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const inputElementRef = useRef(null)

	const { registerField, defaultValue="", fieldName, error } = useField(name)
	const inputValueRef = useRef({ value: defaultValue})

	const handleInputFocus = useCallback(() => {
		setIsFoused(true)

	}, [])

	const handleInputBlur = useCallback(() => {
		setIsFoused(false)
		setIsFilled(!!inputValueRef.current.value)
	}, [])

	// Recebe a referencia do pai para dar o foco em InputText
	useImperativeHandle(ref, () => ({
		focus() {
			inputElementRef.current.focus()
		}
	}))

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputValueRef.current,
			path: 'value',
			setValue(ref, value) {
				inputValueRef.current.value = value
				inputElementRef.current.setNativeProps({ text: value })
			},
			clearValue(){
				inputValueRef.current.value = ''
				inputElementRef.current.clear()
			}
		})
	}, [registerField, fieldName])
	return (
		<Container isFocused={isFocused} isErrored={!!error}>
			<Icon name={icon} size={20} color={isFocused || isFilled ? `#ff9000` : `#666360`} />
			<TextInput 
				ref={inputElementRef}
				keyboardAppearance="dark"
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				defaultValue={defaultValue}
				onChangeText={(value) => {
					inputValueRef.current.value = value
				}}
				{...rest} 
				placeholderTextColor="#666360" 
			/>
		</Container>
	)
}

// forwardRef serve pro componente saber que vai ser pasado uma ref
export default forwardRef(Input)