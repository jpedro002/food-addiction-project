import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { ICreateUserSchema } from '../CreateAccountModal.types'
interface PasswordFieldProps {
	id: string
	label: string
	passwordField: 'password' | 'retypePassword'
	passwordVisibility: { password: boolean; retypePassword: boolean }
	togglePasswordVisibility: (
		passwordField: 'password' | 'retypePassword',
	) => void
}
export const PasswordField = ({
	id,
	label,
	passwordField,
	passwordVisibility,
	togglePasswordVisibility,
}: PasswordFieldProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext<ICreateUserSchema>()

	return (
		<div className="relative space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				type={passwordVisibility[passwordField] ? 'text' : 'password'}
				{...register(passwordField as keyof ICreateUserSchema)}
			/>
			{errors[id as keyof typeof errors] && (
				<span className="text-red-500">
					{errors[id as keyof typeof errors]?.message?.toString()}
				</span>
			)}
			<div className="absolute right-0 top-6">
				<Button
					type="button"
					size="icon"
					variant="ghost"
					onClick={() => togglePasswordVisibility(passwordField)}
					className="hover:bg-transparent"
				>
					{passwordVisibility[passwordField] ? <EyeOff /> : <Eye />}
					<span className="sr-only">
						{passwordVisibility[passwordField]
							? 'Ocultar senha'
							: 'Mostrar senha'}
					</span>
				</Button>
			</div>
		</div>
	)
}
