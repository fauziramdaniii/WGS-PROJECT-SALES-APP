import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import Swal from 'sweetalert2'
import axios from 'axios'
import useOrderStores from '../../../../stores/order/OrderStore'
import Sidebar from '../../../../components/sidebar/Sidebar'
import Navbar from '../../../../components/navbar/Navbar'
import './list.scss'
import './table.scss'

const STATUS_CONFIG = {
  pending_payment: { label: 'Menunggu Pembayaran', color: '#f0ad4e', bg: '#fff8ee' },
  confirmed:       { label: 'Dikonfirmasi',          color: '#5bc0de', bg: '#eef8fb' },
  ready_to_pickup: { label: 'Siap Diambil',          color: '#5cb85c', bg: '#eefbee' },
  sold:            { label: 'Selesai',               color: '#777',    bg: '#f5f5f5' },
  canceled:        { label: 'Dibatalkan',            color: '#d9534f', bg: '#fff0f0' },
  booked:          { label: 'Booked (Lama)',         color: '#337ab7', bg: '#eef4fb' },
}

const StatusBadge = ({ status }) => {
  const s = STATUS_CONFIG[status] || { label: status, color: '#333', bg: '#eee' }
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.color}`,
      borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
    }}>
      {s.label}
    </span>
  )
}

const NEXT_STATUS = {
  pending_payment: { next: 'confirmed',       label: 'Konfirmasi Pembayaran' },
  confirmed:       { next: 'ready_to_pickup', label: 'Siap Diambil' },
  ready_to_pickup: { next: 'sold',            label: 'Tandai Selesai' },
}

const ListOrder = () => {
  const { getOrder } = useOrderStores()
  const [dataOrder, setDataOrder] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const fetchData = async () => {
    try {
      const response = await getOrder()
      setDataOrder(response.data)
    } catch (error) {
      console.error('error fetching data:', error)
    }
  }

  useEffect(() => { fetchData() }, [])

  const formatToRupiah = amount =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)

  const handleUpdateStatus = async (orderId, currentStatus) => {
    const cfg = NEXT_STATUS[currentStatus]
    if (!cfg) return

    const result = await Swal.fire({
      title: `${cfg.label}?`,
      text: `Status akan diubah ke: "${STATUS_CONFIG[cfg.next]?.label}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal',
    })
    if (!result.isConfirmed) return

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}api/order/${orderId}/status`, { status: cfg.next })
      Swal.fire('Berhasil', `Status diubah ke ${STATUS_CONFIG[cfg.next]?.label}`, 'success')
      fetchData()
    } catch (error) {
      Swal.fire('Error', 'Gagal mengubah status', 'error')
    }
  }

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Batalkan Order?',
      text: 'Stok produk akan dikembalikan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Batalkan',
      cancelButtonText: 'Kembali',
    })
    if (!result.isConfirmed) return

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}api/order/${orderId}/status`, { status: 'canceled' })
      Swal.fire('Dibatalkan', 'Order berhasil dibatalkan.', 'success')
      fetchData()
    } catch (error) {
      Swal.fire('Error', 'Gagal membatalkan order', 'error')
    }
  }

  const handleViewProof = (filename) => {
    Swal.fire({
      title: 'Bukti Pembayaran',
      imageUrl: `${import.meta.env.VITE_API_URL}uploads/${filename}`,
      imageAlt: 'Bukti Bayar',
      imageWidth: '100%',
      width: 600,
    })
  }

  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        <TableContainer component={Paper} className='table' style={{ padding: 20 }}>
          <Table sx={{ minWidth: 650 }} aria-label='order table'>
            <TableHead>
              <TableRow sx={{ background: '#f5f5f5' }}>
                <TableCell><strong>#</strong></TableCell>
                <TableCell><strong>Produk</strong></TableCell>
                <TableCell><strong>Qty</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>Penerima</strong></TableCell>
                <TableCell><strong>Metode Bayar</strong></TableCell>
                <TableCell><strong>Bukti Bayar</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Aksi</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? dataOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : dataOrder
              ).map(row => {
                const status = row.status?.[0] || 'pending_payment'
                const isFinal = status === 'sold' || status === 'canceled'

                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <div className='cellWrapper'>
                        <img
                          src={`${import.meta.env.VITE_API_URL}uploads/${row.product?.image}`}
                          alt=''
                          className='image'
                          style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover', marginRight: 8, flexShrink: 0 }}
                        />
                        <span>{row.product?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{formatToRupiah(row.total_amount)}</TableCell>
                    <TableCell>
                      <div>{row.recipient_name || '-'}</div>
                      <small style={{ color: '#888' }}>{row.recipient_phone || ''}</small>
                    </TableCell>
                    <TableCell>
                      {row.payment_method === 'transfer' ? 'Transfer Bank' : 'Tunai (Cash)'}
                    </TableCell>
                    <TableCell>
                      {row.payment_proof ? (
                        <button
                          className='btn btn-sm btn-outline-info'
                          onClick={() => handleViewProof(row.payment_proof)}
                        >
                          Lihat Bukti
                        </button>
                      ) : (
                        <span style={{ color: '#bbb', fontSize: 12 }}>Belum ada</span>
                      )}
                    </TableCell>
                    <TableCell><StatusBadge status={status} /></TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {!isFinal && NEXT_STATUS[status] && (
                          <button
                            className='btn btn-sm btn-outline-success'
                            onClick={() => handleUpdateStatus(row.id, status)}
                          >
                            {NEXT_STATUS[status].label}
                          </button>
                        )}
                        {!isFinal && (
                          <button
                            className='btn btn-sm btn-outline-danger'
                            onClick={() => handleCancelOrder(row.id)}
                          >
                            Batalkan
                          </button>
                        )}
                        {isFinal && (
                          <span style={{ color: '#aaa', fontSize: 12 }}>—</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {dataOrder.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align='center' style={{ padding: 40, color: '#aaa' }}>
                    Belum ada order
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          count={dataOrder.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
        />
      </div>
    </div>
  )
}

export default ListOrder
