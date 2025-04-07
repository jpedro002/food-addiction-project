import { Button } from '@/components/ui/button/button'
import { LayoutGrid, StepBackIcon as Steps } from 'lucide-react'
import { ViewMode } from '../types'

type ViewModeToggleProps = {
	viewMode: ViewMode
	onChange: (mode: ViewMode) => void
}

export function ViewModeToggle({ viewMode, onChange }: ViewModeToggleProps) {
	return (
		<div className="flex items-center gap-2 border rounded-lg p-1">
			<Button
				type="button"
				variant={viewMode === 'steps' ? 'default' : 'ghost'}
				size="sm"
				onClick={() => onChange('steps')}
				className="flex items-center gap-1"
			>
				<Steps className="h-4 w-4" />
				<span className="hidden sm:inline">Passo a passo</span>
			</Button>
			<Button
				type="button"
				variant={viewMode === 'all' ? 'default' : 'ghost'}
				size="sm"
				onClick={() => onChange('all')}
				className="flex items-center gap-1"
			>
				<LayoutGrid className="h-4 w-4" />
				<span className="hidden sm:inline">Todas as questões</span>
			</Button>
		</div>
	)
}
