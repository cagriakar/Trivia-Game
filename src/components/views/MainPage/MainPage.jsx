import React, { useContext, useState, useRef } from 'react';
import Lottie from 'react-lottie';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import covidLottie from '../../../assets/lottieFiles/covidLottie.json';
import nextQuestionLottie from '../../../assets/lottieFiles/nextQuestionLottie.json';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import QuestionaireForm from './QuestionaireForm/QuestionaireForm';
import StateBar from '../../StateBar';
import Question from './Question/Question';
import CustomButton from '../../CustomButton';
import ResultPage from './ResultPage/ResultPage';
import { GlobalContext } from '../../../context/GlobalState';
import TimeOutPage from './TimeOutPage/TimeOutPage';

const useStyles = makeStyles({
	buttonText: {
		width: '100%',
		padding: '6px 16px'
	},
	lottieMargin: { margin: 'auto', marginBottom: '1rem', marginTop: '1rem', maxWidth: '800px' }
});

const MainPage = () => {
	const classes = useStyles();
	const {
		userAnswer,
		gameStarted,
		questionIndex,
		hasJoker,
		loading,
		errorMessage,
		isTimeOut,
		timeIsOut,
		handleJoker
	} = useContext(GlobalContext);

	const defaultOptions1 = {
		loop: true,
		autoplay: true,
		animationData: nextQuestionLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: covidLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const countRef = useRef(null);
	//part of 'react-countdown-circle-timer' package
	const renderTime = ({ remainingTime }) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const currentTime = useRef(remainingTime);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const prevTime = useRef(null);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const isNewTimeFirstTick = useRef(false);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [, setOneLastRerender] = useState(0);

		if (currentTime.current !== remainingTime) {
			isNewTimeFirstTick.current = true;
			prevTime.current = currentTime.current;
			currentTime.current = remainingTime;
		} else {
			isNewTimeFirstTick.current = false;
		}

		// force one last re-render when the time is over to tirgger the last animation
		if (remainingTime === 0) {
			setTimeout(() => {
				setOneLastRerender((val) => val + 1);
			}, 20);
		}

		const isTimeUp = isNewTimeFirstTick.current;

		return (
			<div className="time-wrapper">
				<div
					key={remainingTime}
					className={`time ${isTimeUp ? 'up' : ''}`}
					ref={countRef}
					id={remainingTime}>
					{remainingTime}
				</div>
				{prevTime.current !== null && (
					<div key={prevTime.current} className={`time ${!isTimeUp ? 'down' : ''}`}>
						{prevTime.current}
					</div>
				)}
			</div>
		);
	};

	const handleClick = (event) => {
		// handle joker usage
		handleJoker();
	};

	return (
		<Grid style={{ textAlign: 'center' }}>
			{(loading || !gameStarted || errorMessage) && (
				<Grid container justify="center" className={classes.lottieMargin}>
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
							<StateBar
								component="nav"
								countdown={
									<CountdownCircleTimer
										onComplete={() => {
											timeIsOut();
										}}
										strokeWidth={6}
										key={questionIndex}
										size={60}
										isPlaying={!userAnswer}
										duration={15}
										value={renderTime}
										colors={[['#00FF00', 0.5], ['#F7B801', 0.4], ['#FF0000']]}>
										{renderTime}
									</CountdownCircleTimer>
								}></StateBar>
							<Grid
								component="section"
								container
								justify={hasJoker && !userAnswer ? 'space-around' : 'center'}
								alignItems="center"
								className={classes.lottieMargin}>
								<Grid item>
									<Lottie options={defaultOptions2} height={40} width={80} />
								</Grid>
								<Grid item>
									{/* check some condition to show Joker Button */}
									{!loading && !errorMessage && !userAnswer && hasJoker && (
										<Button
											onClick={handleClick}
											variant="contained"
											color="primary"
											style={{ width: '50%' }}>
											<Typography
												variant="button"
												className={classes.buttonText}>
												50:50
											</Typography>
										</Button>
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
						<ResultPage
							component="section"
							timesRemaining={countRef.current?.id}></ResultPage>
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
								<Typography variant="button" className={classes.buttonText}>
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
	);
};

export default MainPage;
