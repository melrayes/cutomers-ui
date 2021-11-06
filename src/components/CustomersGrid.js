import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {CustomPaging, FilteringState, PagingState} from '@devexpress/dx-react-grid';
import {Grid, PagingPanel, Table, TableFilterRow, TableHeaderRow,} from '@devexpress/dx-react-grid-material-ui';
import {listCustomers} from "../apis/CustomersApi";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let columns = [
        {name: 'id', title: 'Customer ID'},
        {name: 'name', title: 'Customer Name'},
        {name: 'contactCountryName', title: 'Contact Country'},
        {name: 'contactPhone', title: 'Contact Phone'},
        {name: 'contactState', title: 'Contact State'},
    ];

    let tableColumnExtensions = [
        {columnName: 'id', align: 'center'},
        {columnName: 'contactState', align: 'center'},
    ];

    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageSizes] = useState([5, 10, 15]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState([]);

    const changePageSize = (value) => {
        const totalPages = Math.ceil(totalCount / value);
        const updatedCurrentPage = Math.min(currentPage, totalPages - 1);
        setPageSize(value);
        setCurrentPage(updatedCurrentPage);
    };

    const loadCustomers = () => {
        listCustomers(currentPage, pageSize, filters).then(response => {
            setRows(response.data.content);
            setTotalCount(response.data.totalSize);
            setLoading(false);
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (!loading) {
                loadCustomers();
            }
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [filters]);

    return (
        <Paper style={{position: 'relative'}}>
            <Grid
                rows={rows}
                columns={columns}>

                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={changePageSize}/>

                <CustomPaging
                    totalCount={totalCount}/>

                <Table
                    columnExtensions={tableColumnExtensions}/>

                <TableHeaderRow/>
                <PagingPanel
                    pageSizes={pageSizes}/>

                <FilteringState
                    columnExtensions={[
                        {columnName: 'id', filteringEnabled: false},
                        {columnName: 'name', filteringEnabled: false},
                        {columnName: 'contactPhone', filteringEnabled: false},
                    ]}
                    onFiltersChange={setFilters}/>

                <TableFilterRow/>
            </Grid>
        </Paper>
    );
}