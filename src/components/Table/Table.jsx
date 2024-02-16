import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './Table.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suppressHorizontalScroll: false,
            pagination: true,
            paginationPageSize: 10,
            paginationPageSizeSelector: [10, 25, 50, 100],
            //domLayout: 'autoHeight',
            defaultColDef: {
                sortable: true,
                resizable: false,
                filter: false,
            },
        };
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };

    render() {
        const { columnDefs, rowData } = this.props;

        return (
            <div className="ag-theme-alpine ag-grid-container" style={{ width: '100%', height: '850px' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    domLayout={this.state.domLayout}
                    defaultColDef={this.state.defaultColDef}
                    pagination={true}
                    paginationPageSize={this.state.paginationPageSize}
                    paginationPageSizeSelector={this.state.paginationPageSizeSelector}
                    onGridReady={this.onGridReady}
                    suppressHorizontalScroll={this.state.suppressHorizontalScroll}
                />
            </div>
        );
    }
}

export default Table;
