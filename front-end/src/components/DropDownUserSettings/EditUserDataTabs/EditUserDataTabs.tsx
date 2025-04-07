import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { usersService } from '@/services/appUsers'
import { IEditUserDataTabsProps } from './EditUserDataTabs.types'
import { useTabAccount } from './TabAccount/TabAccount.model'
import { TabAccount } from './TabAccount/TabAccount.view'
import { useTabPassword } from './TabPassword/TabPassword.model'
import { TabPassword } from './TabPassword/TabPassword.view'

export function EditUserDataTabs({ handleCloseModal }: IEditUserDataTabsProps) {
	const propsTabAccount = useTabAccount({ handleCloseModal, usersService })
	const propsTabPassWord = useTabPassword({ handleCloseModal, usersService })

	return (
		<Tabs defaultValue="account" className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="account">Conta</TabsTrigger>
				<TabsTrigger value="password">Senha</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				<TabAccount {...propsTabAccount} />
			</TabsContent>
			<TabsContent value="password">
				<TabPassword {...propsTabPassWord} />
			</TabsContent>
		</Tabs>
	)
}
