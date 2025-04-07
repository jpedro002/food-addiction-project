import { useDropDownUserSettings } from './DropDownUserSettings.model'
import { DropDownUserSettingsView } from './DropDownUserSettings.view'

export const DropDownUserSettings = () => {
	const props = useDropDownUserSettings()

	return <DropDownUserSettingsView {...props} />
}
