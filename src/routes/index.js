import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { Container } from './styles'
import { useAuth } from '../context/auth'

const Routes = () => {
	const { user, loading } = useAuth()
	if (loading) {
		return (
			<Container>
				<ActivityIndicator size="large" color="#999" />
			</Container>
		)
	}

	return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes