import { Button } from '@/components/ui/button/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { FrequencyOption, Question } from '../types'

type QuestionCardProps = {
	question: Question
	frequencyOptions: FrequencyOption[]
	selectedValue?: number
	onAnswerChange: (questionId: number, value: string) => void
	onPrevious?: () => void
	onNext?: () => void
	isFirst?: boolean
	isLast?: boolean
	error?: string
	showNavigation?: boolean
}

export function QuestionCard({
	question,
	frequencyOptions,
	selectedValue,
	onAnswerChange,
	onPrevious,
	onNext,
	isFirst = false,
	isLast = false,
	error,
	showNavigation = true,
}: QuestionCardProps) {
	return (
		<Card
			className={`w-full ${
				selectedValue !== undefined ? 'ring-1 ring-primary/30' : ''
			} ${error ? 'border-red-300' : ''}`}
		>
			<CardHeader>
				<CardTitle className="text-lg">Questão {question.id + 1}</CardTitle>
				{showNavigation && (
					<CardDescription className="text-base">
						{question.text}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				{!showNavigation && <p className="mb-4">{question.text}</p>}
				<RadioGroup
					value={selectedValue?.toString() || ''}
					onValueChange={(value) => onAnswerChange(question.id, value)}
					className="space-y-2"
				>
					{frequencyOptions.map((option) => (
						<div
							key={option.value}
							className={`flex items-center space-x-2 border p-2 rounded-md cursor-pointer ${
								selectedValue?.toString() === option.value.toString()
									? 'border-primary border-2 bg-primary/5 hover:bg-primary/10'
									: 'hover:bg-background/80'
							}`}
							onClick={() =>
								onAnswerChange(question.id, option.value.toString())
							}
						>
							<RadioGroupItem
								value={option.value.toString()}
								id={`q${question.id}-option-${option.value}`}
								onClick={(e) => e.stopPropagation()}
							/>
							<Label
								htmlFor={`q${question.id}-option-${option.value}`}
								className="flex justify-start w-full text-sm cursor-pointer"
							>
								<span>{option.label}</span>
							</Label>
						</div>
					))}
				</RadioGroup>
				{error && <p className="text-sm text-red-500 mt-2">{error}</p>}
			</CardContent>
			{showNavigation && (
				<CardFooter className="flex justify-between">
					<Button
						type="button"
						variant="outline"
						onClick={onPrevious}
						disabled={isFirst}
						className="flex items-center gap-1"
					>
						<ArrowLeft className="h-4 w-4" />
						Anterior
					</Button>
					<Button
						type="button"
						onClick={onNext}
						disabled={isLast || selectedValue === undefined}
						className="flex items-center gap-1"
					>
						Próxima
						<ArrowRight className="h-4 w-4" />
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}
