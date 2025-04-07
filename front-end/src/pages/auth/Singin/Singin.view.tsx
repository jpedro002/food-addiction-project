import { Button } from '@/components/ui/button/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { useSingin } from './singin.model'

type SinginProps = ReturnType<typeof useSingin>
export const SingInView = (props: SinginProps) => {
	const {
		passwordVisibility,
		handleChangePasswordVisibility,
		register,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
	} = props

	return (
		<>
			<Helmet title="Login" />

			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Insira seu e-mail abaixo para acessar sua conta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">E-mail</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									className="data-[haserror]:focus-visible:ring-red-500 data-[haserror]:border-red-500"
									data-haserror={errors.email?.message}
									{...register('email')}
								/>
								{errors.email?.message && (
									<span className="text-red-400">{errors.email?.message}</span>
								)}
							</div>
							<div className="relative space-y-2">
								<Label htmlFor="password">Senha</Label>
								<Input
									id="password"
									type={passwordVisibility ? 'text' : 'password'}
									{...register('password')}
									className="data-[haserror]:focus-visible:ring-red-500 data-[haserror]:border-red-500"
									data-haserror={errors.password?.message}
								/>
								{errors.password && (
									<span className="text-red-500">
										{errors.password?.message}
									</span>
								)}
								<div className="absolute right-0 top-6">
									<Button
										onClick={handleChangePasswordVisibility}
										type="button"
										size="icon"
										variant="ghost"
										className="hover:bg-transparent"
									>
										{passwordVisibility ? <EyeOff /> : <Eye />}
										<span className="sr-only">
											{passwordVisibility ? 'Ocultar senha' : 'Mostrar senha'}
										</span>
									</Button>
								</div>
							</div>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								Enviar
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</>
	)
}
