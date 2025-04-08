import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './router'
import { ReduxProvider } from './store/ReduxProvider'

export const App = () => {
	return (
		<ReduxProvider>
			<HelmetProvider>
				<Helmet titleTemplate="%s | Food Addiction Yale" />
				<RouterProvider router={router} />
				<Toaster richColors />
			</HelmetProvider>
		</ReduxProvider>
	)
}
