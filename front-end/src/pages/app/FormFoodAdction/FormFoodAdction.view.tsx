import { Button } from '@/components/ui/button/button'
import { Progress } from '@/components/ui/progress'
import { FormProvider } from 'react-hook-form'
import { PatientIdField } from './components/PatientIdField'
import { PatientOriginField } from './components/PatientOriginField'
import { QuestionCard } from './components/QuestionCard'
import { ViewModeToggle } from './components/ViewModeToggle'
import { FormFoodAdctionViewProps } from './types'

export const FormFoodAdctionView = ({
	questions,
	frequencyOptions,
	currentQuestion,
	viewMode,
	isSubmitting,
	patientIdError,
	answersErrors,
	progress,
	handlePatientIdChange,
	handlePatientOriginChange,
	handleAnswerChange,
	handleViewModeChange,
	goToNextQuestion,
	goToPreviousQuestion,
	handleSubmit,
	answers,
	methods,
	onSubmit,
}: FormFoodAdctionViewProps) => {
	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="container mx-auto py-10 px-4">
					<div className="max-w-4xl mx-auto">
						<div className="mb-8">
							<div className="flex justify-between items-center mb-4">
								<h1 className="text-2xl font-bold">
									Questionário de Comportamento Alimentar
								</h1>
								<ViewModeToggle
									viewMode={viewMode}
									onChange={handleViewModeChange}
								/>
							</div>

							<PatientIdField
								onChange={handlePatientIdChange}
								error={patientIdError}
							/>
							<PatientOriginField
								onChange={handlePatientOriginChange}
								error={patientIdError}
							/>

							{viewMode === 'steps' && (
								<div className="mb-4">
									<Progress value={progress} className="h-2" />
									<p className="text-sm text-muted-foreground mt-2">
										Questão {currentQuestion + 1} de {questions.length}
									</p>
								</div>
							)}
						</div>

						{viewMode === 'steps' ? (
							<QuestionCard
								question={questions[currentQuestion]}
								frequencyOptions={frequencyOptions}
								selectedValue={answers[currentQuestion]}
								onAnswerChange={handleAnswerChange}
								onPrevious={goToPreviousQuestion}
								onNext={goToNextQuestion}
								isFirst={currentQuestion === 0}
								isLast={currentQuestion === questions.length - 1}
								error={answersErrors[currentQuestion]}
								showNavigation={true}
							/>
						) : (
							<div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{questions.map((question) => (
										<QuestionCard
											key={question.id}
											question={question}
											frequencyOptions={frequencyOptions}
											selectedValue={answers[question.id]}
											onAnswerChange={handleAnswerChange}
											error={answersErrors[question.id]}
											showNavigation={false}
										/>
									))}
								</div>
							</div>
						)}

						<div className="mt-8 text-center">
							<Button size="lg" type="submit" disabled={isSubmitting}>
								{isSubmitting ? 'Enviando...' : 'Finalizar Questionário'}
							</Button>
						</div>
					</div>
				</div>
			</form>
		</FormProvider>
	)
}
