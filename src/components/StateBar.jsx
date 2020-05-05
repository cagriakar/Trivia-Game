import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, makeStyles } from '@material-ui/core';
import { GlobalContext } from '../context/GlobalState';

const useStyles = makeStyles({
	stateBarText: {
		textAlign: 'center',
		paddingRight: '0.5rem',
		paddingLeft: '0.5rem',
		marginRight: '1rem',
		fontSize: '1rem'
	},
	toolBar: { justifyContent: 'space-between', opacity: 0.8 }
});

const StateBar = ({ countdown }) => {
	const classes = useStyles();
	const { questionIndex, totalPoints } = useContext(GlobalContext);

	return (
		<AppBar position="static">
			<Toolbar component={Box} mx={1} className={classes.toolBar}>
				{/* question index */}
				<Typography
					variant="body2"
					className={classes.stateBarText}
					style={{
						fontSize: '1rem'
					}}>
					Question {questionIndex + 1}/10
				</Typography>
				{/* total points */}
				<Typography variant="h6" className={classes.stateBarText}>
					{totalPoints} Points
				</Typography>
				{/* times left */}
				{countdown}
			</Toolbar>
		</AppBar>
	);
};

export default StateBar;
