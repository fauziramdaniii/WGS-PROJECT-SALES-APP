// DataTable.jsx
import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import fetchLog from './source'

const DataTable = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { columns: fetchedColumns, rows: fetchedRows } = await fetchLog()

      setColumns(fetchedColumns)
      setData(fetchedRows)
    } catch (error) {
      console.error('Error fetching log data:', error)
      setData([{ id: 'error', error: 'Error fetching log data' }])
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className='datatable'>
      <div className='datatableTitle' textAlign='center'>
        Log Activity
      </div>
      {data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label='custom pagination table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.field} align='left'>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map(row => (
                <TableRow key={row.id}>
                  {columns.map(column => (
                    <TableCell key={column.field} align='left'>
                      {row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10]}
            colSpan={3}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page'
              },
              native: true
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '200px' }}>
          <Box size='large'>
            <CircularProgress />
          </Box>
        </p>
      )}
    </div>
  )
}

export default DataTable
