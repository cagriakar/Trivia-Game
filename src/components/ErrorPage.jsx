import React from 'react';
import { Grid, Box, Paper, Slide } from '@material-ui/core';
import oopsLottie from '../assets/lottieFiles/oopsLottie.json';
import Lottie from 'react-lottie';

const ErrorPage = () => {
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: oopsLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<Grid container justify="center">
			<Grid item xs={1} />
			<Slide direction="up" in={true} timeout={500}>
				<Grid item container xs={10} style={{ maxWidth: '500px', opacity: 0.8 }}>
					<Grid item container justify="center" style={{ marginBottom: '1rem' }}>
						<Paper component={Box} p={2} style={{ flexGrow: '1' }}>
							<Lottie options={defaultOptions} height={230} width={280} speed={0.5} />
						</Paper>
					</Grid>
				</Grid>
			</Slide>
			<Grid item xs={1} />
		</Grid>
	);
};

export default ErrorPage;
