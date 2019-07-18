import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';
import { TextField } from '@material-ui/core';

const jsonData=[]



export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      columnWidths: [
        { columnName: 'name', width: 180 },
        { columnName: 'sex', width: 180 },
        { columnName: 'city', width: 180 },
        { columnName: 'car', width: 240 },
      ],
      rows: [
          { name:<TextField />, sex:"2", city:"3", car:"4" },
          { name:"1", sex:"2", city:"3", car:"4"}
      ],
    };

    this.changeColumnWidths = (columnWidths) => {
      this.setState({ columnWidths });
    };
  }

  render() {
    const { rows, columns, columnWidths } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={this.changeColumnWidths}
          />
          <TableHeaderRow />
        </Grid>
      </Paper>
    );
  }
}
