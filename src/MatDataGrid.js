import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

const columns = [
    {
    field: 'date',
    headerName: 'Date',
    width: 250,
    editable: false,
    type: 'Date',
    valueFormatter: (field) => {
      const valueFormatted = moment(field.value.toString()).format('MMM Do YYYY');
      return valueFormatted
    }
  },
  {
    field: 'weather',
    headerName: 'Weather',
    width: 150,
    editable: false,
  },
  {
    field: 'max',
    headerName: 'Max Temp',
    width: 175,
    editable: false,
  },
  {
    field: 'min',
    headerName: 'Min Temp',
    width: 175,
    editable: false,
  },
  {
    field: 'wind10m_max',
    headerName: 'Max Wind Speed',
    width: 200,
    editable: false,
  }
];

export default function DataGridDemo({loading, rows}) {
        return (
    <div style={{ height: 475, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.date}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
        loading={loading}
        autoHeight={true}
      />
    </div>
  );
}
