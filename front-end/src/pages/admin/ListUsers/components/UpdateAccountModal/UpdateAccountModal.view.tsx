import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { IUpdateAccountModalProps } from './UpdateAccountModal.types'

import { Pencil } from 'lucide-react'
import { Controller } from 'react-hook-form'

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

export const UpdateAccountModalView = (props: IUpdateAccountModalProps) => {
	const {
		isOpen,
		setIsOpen,
		loading,
		register,
		control,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
		ROLES,
		onResetPassword,
	} = props

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="flex w-full justify-between p-2">
					<span>Editar</span>
					<Pencil size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent
				className="flex flex-col min-h-screen sm:min-h-fit overflow-y-auto "
				aria-describedby={undefined}
			>
				<DialogHeader>
					<DialogTitle>Editar Conta</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col justify-between flex-1 space-y-4"
				>
					<div>
						<div className="space-y-2">
							<Label htmlFor="name">Nome</Label>
							<Input id="name" type="text" {...register('name')} />
							{errors.name && (
								<span className="text-red-500">{errors.name.message}</span>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">e-mail</Label>
							<Input id="email" type="email" {...register('email')} />
							{errors.email && (
								<span className="text-red-500">{errors.email?.message}</span>
							)}
						</div>

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

					<div className="flex justify-between">
						<Button
							className="w-full mt-5"
							disabled={isSubmitting || loading}
							type="submit"
						>
							{loading ? 'Atualizando...' : 'Atualizar Usuário'}
						</Button>
						<Button
							type="button"
							className="w-fit mt-5 ml-2"
							onClick={onResetPassword}
						>
							Resetar Senha
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
