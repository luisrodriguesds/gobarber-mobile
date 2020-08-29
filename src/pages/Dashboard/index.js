import React from 'react'

import { View, Text, Button } from 'react-native'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
	const { signOut } = useAuth()
	return (
		<View>
			<Text>Dashboard</Text>
			<Button title="Sair" onPress={signOut}></Button>
		</View>
	)
}

export default Dashboard