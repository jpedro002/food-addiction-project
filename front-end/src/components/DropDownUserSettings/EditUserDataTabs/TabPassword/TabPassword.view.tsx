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
import { ITabPasswordProps } from './TabPassword.types'

export const TabPassword = (props: ITabPasswordProps) => {
	const { register, handleSubmit, errors, onSubmit } = props

	return (
		<Card>
			<CardHeader>
				<CardTitle>Senha</CardTitle>
				<CardDescription>
					Altere sua senha aqui. Após salvar, você será desconectado.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
					<div className="space-y-1">
						<Label htmlFor="currentPassword">Senha atual</Label>
						<Input
							id="currentPassword"
							type="password"
							{...register('currentPassword')}
						/>
						{errors.currentPassword && (
							<p className="text-red-500">
								{errors.currentPassword.message?.toString()}
							</p>
						)}
					</div>
					<div className="space-y-1">
						<Label htmlFor="newPassword">Nova senha</Label>
						<Input
							id="newPassword"
							type="password"
							{...register('newPassword')}
						/>
						{errors.newPassword && (
							<p className="text-red-500">
								{errors.newPassword.message?.toString()}
							</p>
						)}
					</div>
					<Button type="submit">Salvar senha</Button>
				</form>
			</CardContent>
		</Card>
	)
}
