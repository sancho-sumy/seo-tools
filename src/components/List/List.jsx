import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: 'grey',
		color: theme.palette.common.white
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0
	}
}));

function createData(id, primaryItem, secondaryItemn) {
  return { id, primaryItem, secondaryItemn };
}

CustomizedTables.propTypes = {
	data: PropTypes.array,
};

export default function CustomizedTables({ data }) {
	const rows = data ? data?.map((row, i) => createData(i + 1, row[0], row[1])) : [];
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">#</StyledTableCell>
						<StyledTableCell align="center">Що порівнювали</StyledTableCell>
						<StyledTableCell align="center">З чим порівнювали</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.id}>
							<StyledTableCell align="center">{row.id}</StyledTableCell>
							<StyledTableCell align="center">{row.primaryItem}</StyledTableCell>
							<StyledTableCell align="center">{row.secondaryItemn}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
