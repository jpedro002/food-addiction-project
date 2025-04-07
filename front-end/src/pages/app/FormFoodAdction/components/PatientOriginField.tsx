import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useFormContext } from 'react-hook-form'

type PatientOriginFieldProps = {
	onChange: (value: string) => void
	error?: string
}

export function PatientOriginField({ onChange }: PatientOriginFieldProps) {
	const { register } = useFormContext()

	return (
		<div className="mb-6">
			<div className="grid gap-2">
				<Label htmlFor="patientOrigin" className="font-medium">
					Origem do Paciente
				</Label>
				<RadioGroup
					id="patientOrigin"
					className="flex flex-col gap-2"
					{...register('patientOrigin', {
						onChange: (e) => onChange(e.target.value),
					})}
					defaultValue="Rede Pública"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="Rede Pública" id="public" />
						<Label htmlFor="public">Rede Pública</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="Rede Privada" id="private" />
						<Label htmlFor="private">Rede Privada</Label>
					</div>
				</RadioGroup>
				{/* {errors && <p className="text-sm text-red-500">{'error'}</p>} */}
			</div>
		</div>
	)
}
