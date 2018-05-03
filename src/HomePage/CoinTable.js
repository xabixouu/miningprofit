import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
});

function CoinTable(props) {
	const { classes, crypto } = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>COIN</TableCell>
						<TableCell numeric>$$$</TableCell>
						<TableCell numeric>NB Coins</TableCell>
						<TableCell numeric>$ / Coin</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{crypto.coins.map((item, i) => {
						return (
							<TableRow key={i}>
								<TableCell>
									<Avatar src={item.icon} size={50} />
									{item.symbol} - {item.coin}
								</TableCell>
								<TableCell numeric>
									$ {item.total_price.toFixed(8).replace(/\.?0+$/, '')}
								</TableCell>
								<TableCell numeric>
									{item.total_coins}
								</TableCell>
								<TableCell numeric>
									$ {item.unit_price}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}

CoinTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CoinTable);