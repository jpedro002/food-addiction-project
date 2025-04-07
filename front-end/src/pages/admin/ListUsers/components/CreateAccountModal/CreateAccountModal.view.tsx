import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { Controller, FormProvider } from 'react-hook-form'

import { SpinnerLoading } from '@/components/SpinnerLoading'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { ICreateAccountModalProps } from './CreateAccountModal.types'
import { PasswordField } from './components/PasswordField'

export function CreateAccountModalView(props: ICreateAccountModalProps) {
	const {
		isOpen,
		setIsOpen,
		loading,
		passwordVisibility,
		togglePasswordVisibility,
		register,
		control,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
		ROLES,
		methods,
	} = props
	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				<Button className="w-full sm:max-w-[16rem]">Criar Usuário</Button>
			</DialogTrigger>
			<DialogContent
				aria-describedby={undefined}
				className="flex flex-col max-h-[100vh] overflow-auto rounded-lg scrollbar-hide"
			>
				<DialogHeader>
					<DialogTitle>Criar Conta</DialogTitle>
				</DialogHeader>
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col justify-between flex-1 space-y-4"
					>
						<div>
							<div className="space-y-2">
								<Label htmlFor="name">Nome</Label>
								<Input
									id="name"
									type="text"
									placeholder="Digite seu nome"
									{...register('name')}
								/>
								{errors.name && (
									<span className="text-red-500">{errors.name.message}</span>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">E-mail</Label>
								<Input
									id="email"
									type="email"
									placeholder="Digite seu e-mail"
									{...register('email')}
								/>
								{errors.email && (
									<span className="text-red-500">{errors.email?.message}</span>
								)}
							</div>

							<PasswordField
								id="password"
								label="senha"
								passwordField="password"
								passwordVisibility={passwordVisibility}
								togglePasswordVisibility={togglePasswordVisibility}
							/>
							<PasswordField
								id="retypePassword"
								label="Repita a senha"
								passwordField="retypePassword"
								passwordVisibility={passwordVisibility}
								togglePasswordVisibility={togglePasswordVisibility}
							/>

							<div className="flex flex-col gap-4 mt-4">
								<Controller
									name={'role'}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="h-10 w-[180px] capitalize">
												<SelectValue placeholder="Cargos" />
											</SelectTrigger>
											<SelectContent>
												{ROLES.map((item) => (
													<SelectItem
														key={item}
														value={item}
														className="capitalize"
													>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
							</div>

							<div className="w-full flex flex-col items-center gap-1 justify-center mt-4">
								{errors.role && (
									<span className="text-red-500">{errors.role.message}</span>
								)}
							</div>
						</div>

						<Button
							className="w-full mt-5"
							disabled={isSubmitting || loading}
							type="submit"
						>
							{loading && <SpinnerLoading />}
							Finalizar Registro
						</Button>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}
