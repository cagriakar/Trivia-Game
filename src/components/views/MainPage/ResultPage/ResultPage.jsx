import React, { useContext, useEffect } from 'react'
import WrongAnswer from './Sections/WrongAnswer'
import CorrectAnswer from './Sections/CorrectAnswer'
import FinalResultPage from './Sections/FinalResultPage'
import { GlobalContext } from '../../../../context/GlobalState'

const ResultPage = () => {
	console.log('ResultPage started')
	const { userAnswer, questions, questionIndex, increaseTotalPoints } = useContext(GlobalContext)

	// destructuring for easy usage
	const { correct_answer } = questions[questionIndex]

	// constant stores the result of below condition
	const isAnswerTrue = userAnswer === correct_answer

	useEffect(() => {
		// handle to increase Total Number if anwser is true
		isAnswerTrue && increaseTotalPoints()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{/* check if it was last question*/}
			{questionIndex === 9 ? (
				// render final result
				<FinalResultPage />
			) : isAnswerTrue ? (
				// render correctly answered component
				<CorrectAnswer />
			) : (
				// render wrongly answered component
				<WrongAnswer />
			)}
		</>
	)
}

export default ResultPage
