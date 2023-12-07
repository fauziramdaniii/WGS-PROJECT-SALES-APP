import './table.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const rows = [
  {
    id: '1',
    product: 'Nike Gold',
    img: 'data:image/jpeg;base64,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',
    customer: 'WGS',
    date: '1 March',
    amount: '70$',
    method: 'Ambil di Tempat',
    status: 'Booked'
  },
  {
    id: '2',
    product: 'Adidas Silver',
    img: 'Test',
    customer: 'XYZ',
    date: '2 March',
    amount: '80$',
    method: 'Pengiriman',
    status: 'Sold'
  },
  {
    id: '3',
    product: 'Puma Bronze',
    img: 'Test',
    customer: 'ABC',
    date: '3 March',
    amount: '60$',
    method: 'Ambil di Tempat',
    status: 'Canceled'
  },
  {
    id: '4',
    product: 'Reebok Platinum',
    img: 'Test',
    customer: 'DEF',
    date: '4 March',
    amount: '90$',
    method: 'Pengiriman',
    status: 'Available'
  },
  {
    id: '5',
    product: 'New Balance Black',
    img: 'Test',
    customer: 'GHI',
    date: '5 March',
    amount: '75$',
    method: 'Ambil di Tempat',
    status: 'Booked'
  }
]

const BasicTable = () => {
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>Tracking ID</TableCell>
            <TableCell className='tableCell'>Product</TableCell>
            <TableCell className='tableCell'>Customers</TableCell>
            <TableCell className='tableCell'>Date</TableCell>
            <TableCell className='tableCell'>Amount</TableCell>
            <TableCell className='tableCell'>Method</TableCell>
            <TableCell className='tableCell'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className='tableCell'>{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.img} alt='' className='image' />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className='tableCell'>{row.customer}</TableCell>
              <TableCell className='tableCell'>{row.date}</TableCell>
              <TableCell className='tableCell'>{row.amount}</TableCell>
              <TableCell className='tableCell'>{row.method}</TableCell>
              <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
