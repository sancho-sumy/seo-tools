import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import { useState } from 'react';
import BasicTabs from '../TabPanel/TabPanel';

const CompareTool = () => {
	const [primaryInput, setPrimaryInput] = useState(null);
	const [secondaryInput, setSecondaryInput] = useState(null);
	const [result, setResult] = useState(null);

	const formatInput = () => {
		const fullMatch = [];
		const partialMatch = [];
		const noMatch = [];

		if (!primaryInput && !secondaryInput) {
			return;
		}

		const primaryArray = primaryInput.toLowerCase().split(/\r?\n/).filter(Boolean);
		const secondaryArray = secondaryInput.toLowerCase().split(/\r?\n/).filter(Boolean);
		const primarySet = new Set(primaryArray);
		const secondarySet = new Set(secondaryArray);

		primarySet.forEach((element1) => {
			let secondElementResult = [];
			let secondElementResultTest = [];
			let isUnique = true;
			secondarySet.forEach((element2) => {
				let splittedElementResultTest = [];
				const splittedElementResult = [];
				const splittedElements = element2.split(/\s/).filter(Boolean);
				splittedElements.forEach((splittedEl) => {
					let i = splittedEl.length;
					const compare = () => {
						const elForCompare = splittedEl.slice(0, i);
						if (i <= 3) {
							splittedElementResult.push(false);
							return;
						}
						const regex = new RegExp('^' + elForCompare + '|\\s' + elForCompare, 'g');
						if (regex.test(element1)) {
							splittedElementResult.push(true);
							splittedElementResultTest.push(elForCompare);
							return;
						} else {
							splittedElementResult.push(false);
							splittedElementResultTest.push(elForCompare);
							i--;
							compare();
						}
					};
					compare();
				});
				if (splittedElementResult.includes(true) && !splittedElementResult.includes(false)) {
					fullMatch.push([element1, element2, secondElementResult, secondElementResultTest]);
					isUnique = false;
				}
				if (splittedElementResult.includes(true) && splittedElementResult.includes(false)) {
					partialMatch.push([element1, element2, secondElementResult, secondElementResultTest]);
					isUnique = false;
				}
			});

			if (isUnique) {
				noMatch.push([element1]);
			}
		});
		console.log('full match', fullMatch);
		console.log('partial match', partialMatch);
		console.log('unique', noMatch);
		setResult({ fullMatch: fullMatch, partialMatch: partialMatch, noMatch: noMatch });
	};

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						id="primaryList"
						label="Що порівнюємо?"
						color="primary"
						minRows={5}
						maxRows={25}
						helperText="Кожне значення з нової строки"
						margin="normal"
						multiline
						fullWidth
						onChange={(t) => setPrimaryInput(t.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="primaryList"
						label="З чим порівнюємо?"
						color="primary"
						minRows={5}
						maxRows={25}
						helperText="Кожне значення з нової строки"
						margin="normal"
						multiline
						fullWidth
						onChange={(t) => setSecondaryInput(t.target.value)}
					/>
				</Grid>
			</Grid>
			<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
				<Button variant="contained" color="primary" onClick={formatInput} disabled={!primaryInput || !secondaryInput}>
					Порівняти
				</Button>
			</Stack>
			{result && <BasicTabs content={result}></BasicTabs>}
		</>
	);
};

export default CompareTool;
