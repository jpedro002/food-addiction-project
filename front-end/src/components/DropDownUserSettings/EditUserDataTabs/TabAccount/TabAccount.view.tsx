import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button/button'
import { ITabAccountProps } from './TabAccount.type'

export const TabAccount = (props: ITabAccountProps) => {
	const { errors, handleSubmit, register, onSubmit } = props

	return (
		<Card>
			<CardHeader>
				<CardTitle>Conta</CardTitle>
				<CardDescription>
					Edite sua conta aqui. Clique em salvar quando terminar.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
					<div className="space-y-1">
						<Label htmlFor="name">Nome</Label>
						<Input
							id="name"
							placeholder="exemplo de nome"
							{...register('name')}
						/>
						{errors.name && (
							<p className="text-red-500">{errors.name.message?.toString()}</p>
						)}
					</div>
					<div className="space-y-1">
						<Label htmlFor="email">E-mail</Label>
						<Input
							id="email"
							placeholder="exemplo@gmail.com"
							{...register('email')}
						/>
						{errors.email && (
							<p className="text-red-500">{errors.email.message?.toString()}</p>
						)}
					</div>
					<Button type="submit">Salvar alterações</Button>
				</form>
			</CardContent>
		</Card>
	)
}
