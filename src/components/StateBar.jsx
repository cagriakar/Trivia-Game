import React, { useContext, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Box, LinearProgress } from '@material-ui/core'
import { GlobalContext } from '../context/GlobalState'

const StateBar = ({ timeleft }) => {
	const { questionIndex, totalPoints, timesLeft, handleTime, timeIsOut, userAnswer } = useContext(
		GlobalContext
	)

	useEffect(() => {
		timesLeft === 0
			? timeIsOut()
			: !userAnswer &&
			  setTimeout(() => {
					handleTime()
			  }, 1000)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timesLeft])

	return (
		<AppBar position="static">
			<Toolbar
				component={Box}
				mx={1}
				style={{ justifyContent: 'space-between', opacity: 0.8 }}>
				{/* question index */}
				<Typography
					variant="body2"
					style={{
						textAlign: 'center',
						paddingRight: '0.5rem',
						paddingLeft: '0.5rem',
						marginRight: '1rem'
					}}>
					Question {questionIndex + 1}/10
				</Typography>
				{/* total points */}
				<Typography
					variant="h6"
					style={{
						textAlign: 'center',
						paddingRight: '0.5rem',
						paddingLeft: '0.5rem',
						marginRight: '1rem'
					}}>
					{totalPoints} Points
				</Typography>
				{/* times left */}
				<Typography
					variant="body2"
					style={{ textAlign: 'center', paddingRight: '0.5rem', paddingLeft: '0.5rem' }}>
					Remaining Time: {timesLeft}
				</Typography>
			</Toolbar>
			<LinearProgress
				variant="determinate"
				value={(timesLeft * 100) / 15}
				color="secondary"
			/>
		</AppBar>
	)
}

export default StateBar
