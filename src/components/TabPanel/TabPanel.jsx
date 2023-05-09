import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EnhancedTable from '../List/List';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	content: PropTypes.string
};

BasicTabs.propTypes = {
	children: PropTypes.node,
	content: PropTypes.object
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

export default function BasicTabs({ content }) {
	const { noMatch, fullMatch, partialMatch } = content;
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label={'Унікальні значення (' + noMatch?.length + ')'} {...a11yProps(0)} disabled={!noMatch.length}/>
					<Tab label={'Повне співпадіння (' + fullMatch?.length + ')'} {...a11yProps(1)} disabled={!fullMatch.length}/>
					<Tab label={'Часткове співпадіння (' + partialMatch?.length + ')'} {...a11yProps(2)} disabled={!partialMatch.length}/>
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<Box>
          <TextField
            id="resultList"
            color="primary"
            minRows={5}
            maxRows={25}
            margin="normal"
            value={noMatch?.join('\n')}
            multiline
            fullWidth
          />
        </Box>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Box>
          <EnhancedTable data={fullMatch} />
        </Box>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Box>
          <EnhancedTable data={partialMatch} />
        </Box>
			</TabPanel>
		</Box>
	);
}
