import React from 'react';
import Lottie from 'react-lottie';
import loadingLottie from '../assets/lottieFiles/loadingLottie.json';
import { Grid, Box, Paper, Typography, Slide } from '@material-ui/core';

const LoadingPage = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: loadingLottie,
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
							<Typography variant="h6" style={{ textAlign: 'center' }}>
								Preparing your Questions...
							</Typography>
							<Lottie options={defaultOptions} height={120} width={120} />
						</Paper>
					</Grid>
				</Grid>
			</Slide>
			<Grid item xs={1} />
		</Grid>
	);
};

export default LoadingPage;
