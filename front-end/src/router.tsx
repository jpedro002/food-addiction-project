import { Outlet, createBrowserRouter } from 'react-router-dom'

import { FormFoodAdction, LogOut, NotFound } from '@/pages/app'
import { AdminLayout, AppLayout, AuthLayout, SessionProvider } from './layouts'
import { ListUsers } from './pages/admin/'
import Dashboard from './pages/admin/Dashboard/Dashboard'
import { PrivateRoute, SingIn } from './pages/auth'

const Roles = {
	ADMIN: 'ADMIN',
	HEALTHCARE_AGENT: 'HEALTHCARE_AGENT',
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <SessionProvider />,
		children: [
			{
				element: <AdminLayout />,
				children: [
					{
						path: 'logout',
						element: <LogOut />,
					},
					{
						path: 'admin',
						element: (
							<PrivateRoute allowedRoles={[Roles.ADMIN]}>
								<Outlet />
							</PrivateRoute>
						),
						children: [
							{
								path: '',
								element: <ListUsers />,
							},
							{
								path: 'dashboard',
								element: <Dashboard />,
							},
						],
					},
				],
			},
			{
				path: '',
				element: (
					<PrivateRoute allowedRoles={[Roles.HEALTHCARE_AGENT, Roles.ADMIN]}>
						<AppLayout />
					</PrivateRoute>
				),
				children: [
					{
						path: '/',
						element: <FormFoodAdction />,
					},
				],
			},

			{
				path: 'auth',
				element: <AuthLayout />,
				children: [
					{
						path: '',
						element: <SingIn />,
					},
				],
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
])
