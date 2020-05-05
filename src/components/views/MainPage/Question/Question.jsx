import React, { useContext, useEffect } from 'react';
//A package HTML entities encoder/decoder with full Unicode support
import he from 'he';
import { Grid, Paper, Typography, Box, Slide } from '@material-ui/core';
import ErrorPage from '../../../ErrorPage';
import LoadingPage from '../../../LoadingPage';
import CustomButton from '../../../CustomButton';
import { GlobalContext } from '../../../../context/GlobalState';

const Question = () => {
	const {
		questions,
		questionIndex,
		getQuestions,
		loading,
		errorMessage,
		disabledKeys
	} = useContext(GlobalContext);

	useEffect(() => {
		// check if questions is null, then handle an API-call with delay of 2 seconds. Otherwise, do nothing just let it go to next question
		!questions &&
			setTimeout(() => {
				// handle to send a get request to API
				getQuestions();
			}, 2000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// handle if response is in loading stage
	if (loading) {
		return <LoadingPage />;
	}
	// handle if response has an error
	else if (errorMessage) {
		return <ErrorPage />;
	}
	// render below if there is no issue
	else {
		// destructuring for easy usage
		const { question, answers } = questions[questionIndex];

		return (
			<Grid container component={Box} mt={2} justify="center">
				{/* for better margin control */}
				<Grid item xs={1} />
				{/* for better margin control */}
				<Slide direction="up" in={true} timeout={500}>
					<Grid item container xs={10} style={{ maxWidth: '800px' }}>
						{/* Question part */}
						<Grid item container justify="center" style={{ marginBottom: '1rem' }}>
							<Paper component={Box} p={2} style={{ flexGrow: '1' }}>
								<Typography variant="subtitle1">{he.decode(question)}</Typography>
							</Paper>
						</Grid>
						{/* Answers part */}

						<Grid item container spacing={2} justify="center">
							{answers.map((answer, index) => (
								<Slide direction="up" in={true} timeout={1000} key={index}>
									<Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
										<CustomButton
											// check if any answers will be disabled or not, due to joker usage
											variant={
												disabledKeys?.has(index) ? 'outlined' : 'contained'
											}
											disabled={disabledKeys?.has(index) ? true : false}
											color="primary"
											fullWidth
											style={{ padding: 0 }}
											buttontext={
												<Typography
													variant="button"
													style={{
														width: '100%',
														padding: '6px 16px'
													}}>
													{he.decode(answer)}
												</Typography>
											}></CustomButton>
									</Grid>
								</Slide>
							))}
						</Grid>
					</Grid>
				</Slide>
				{/* for better margin control */}
				<Grid item xs={1} />
				{/* for better margin control */}
			</Grid>
		);
	}
};

export default Question;
