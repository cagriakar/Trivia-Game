import React, { useContext } from 'react'
import Lottie from 'react-lottie'
import covidLottie from '../../../assets/lottieFiles/covidLottie.json'
import nextQuestionLottie from '../../../assets/lottieFiles/nextQuestionLottie.json'
import { Grid, Typography } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import ReplyAllIcon from '@material-ui/icons/ReplyAll'
import QuestionaireForm from './QuestionaireForm/QuestionaireForm'
import StateBar from '../../StateBar'
import Question from './Question/Question'
import CustomButton from '../../CustomButton'
import ResultPage from './ResultPage/ResultPage'
import { GlobalContext } from '../../../context/GlobalState'
import TimeOutPage from './TimeOutPage/TimeOutPage'

const MainPage = () => {
	const {
		userAnswer,
		gameStarted,
		questionIndex,
		hasJoker,
		loading,
		errorMessage,
		isTimeOut
	} = useContext(GlobalContext)

	const defaultOptions1 = {
		loop: true,
		autoplay: true,
		animationData: nextQuestionLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: covidLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	return (
		<Grid style={{ textAlign: 'center' }}>
			{(loading || !gameStarted || errorMessage) && (
				<Grid
					container
					justify="center"
					style={{ marginBottom: '1rem', marginTop: '1rem' }}>
					<Lottie options={defaultOptions2} height={50} width={100} />
				</Grid>
			)}

			{/* check if game has started or not */}
			{!gameStarted ? (
				/* render below Form if game has not started (state: creating the URL based on user's selection) */
				<QuestionaireForm />
			) : (
				/* render below components if game has started (state: just before to send a get request to API) */
				<>
					{/* bar to respresent some game statistics and time-left */}
					{!loading && !errorMessage && (
						<>
							<StateBar component="nav"></StateBar>
							<Grid
								component="section"
								container
								justify={hasJoker && !userAnswer ? 'space-around' : 'center'}
								alignItems="center"
								style={{
									maxWidth: '800px',
									margin: 'auto',
									marginTop: '1rem',
									marginBottom: '1rem'
								}}>
								<Grid item>
									<Lottie options={defaultOptions2} height={40} width={80} />
								</Grid>
								<Grid item>
									{/* check some condition to show Joker Button */}
									{!loading && !errorMessage && !userAnswer && hasJoker && (
										<CustomButton
											style={{ width: '50%' }}
											buttontext={
												<Typography
													variant="button"
													id="joker-button"
													style={{
														width: '100%',
														padding: '6px 16px'
													}}>
													50:50
												</Typography>
											}></CustomButton>
									)}
								</Grid>
							</Grid>
						</>
					)}

					{/* check if time is out or not */}
					{isTimeOut ? (
						<TimeOutPage component="section" />
					) : !userAnswer ? (
						/* sending a get request to API handled through this component*/
						<Question component="section"></Question>
					) : (
						/* render one of the result pages based on user's answer true or not*/
						<ResultPage component="section"></ResultPage>
					)}

					{/* check if any error coming from API or user declared his answer */}
					{(errorMessage || userAnswer || isTimeOut) && (
						<CustomButton
							style={{ maxWidth: 480, opacity: 0.8 }}
							startIcon={
								questionIndex === 9 ? (
									<ReplayIcon />
								) : errorMessage ? (
									<ReplyAllIcon />
								) : (
									<Lottie options={defaultOptions1} height={40} width={45} />
								)
							}
							buttontext={
								<Typography
									variant="button"
									style={{ width: '100%', padding: '6px 16px' }}>
									{/* check if any error coming from API or is it last question */}
									{questionIndex === 9
										? 'Play Again'
										: errorMessage
										? 'Turn back Selection Menu'
										: 'Next Question'}
								</Typography>
							}></CustomButton>
					)}
				</>
			)}
		</Grid>
	)
}

export default MainPage
