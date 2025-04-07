import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button/button'

import { Trash } from 'lucide-react'

import { IDeleteAccountAlertProps } from './DeleteAccountAlert.types'

export const DeleteAccountAlertView = (props: IDeleteAccountAlertProps) => {
	const { handleDeleteUser } = props

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					className="flex w-full justify-between p-2 transition-colors duration-300
							hover:text-destructive
							"
				>
					<span>Excluir</span>
					<Trash size={18} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Tem certeza que deseja excluir o usuário?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
						conta e removerá seus dados dos nossos servidores.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteUser}
						className="bg-red-600 text-white hover:bg-red-700"
					>
						Confirmar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
