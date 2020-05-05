import React, { useContext } from 'react';
import Lottie from 'react-lottie';
import timeIsOverLottie from '../../../../assets/lottieFiles/timeIsOverLottie.json';

import { Grid, Box, Paper, Typography, Fade, Divider } from '@material-ui/core';
import { GlobalContext } from '../../../../context/GlobalState';

const TimeOutPage = () => {
	const { totalPoints } = useContext(GlobalContext);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: timeIsOverLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<Grid container component={Box} mt={2} justify="center">
			<Grid item xs={1} />
			<Fade in={true} timeout={500}>
				<Grid item container xs={10} style={{ maxWidth: '500px', opacity: 0.8 }}>
					<Grid item container justify="center" style={{ marginBottom: '1rem' }}>
						<Paper component={Box} p={2} style={{ flexGrow: '1' }}>
							<Lottie options={defaultOptions} height={200} width={200} speed={0.6} />
							<Typography variant="h6" style={{ marginBottom: '1rem' }}>
								Timeout
							</Typography>
							<Typography variant="subtitle1">
								You've couldn't answer this question within given 15 seconds
							</Typography>
							<Divider style={{ marginBottom: '1rem' }} />
							<Typography variant="h6">{`Total: ${totalPoints} Points`}</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Fade>
			<Grid item xs={1} />
		</Grid>
	);
};

export default TimeOutPage;
