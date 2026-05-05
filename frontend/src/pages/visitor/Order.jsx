import React, { useEffect, useState, useRef } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import axios from 'axios'
import Swal from 'sweetalert2'

const STATUS_CONFIG = {
  pending_payment: { label: 'Menunggu Pembayaran', color: '#f0ad4e', bg: '#fff8ee' },
  confirmed:       { label: 'Dikonfirmasi',          color: '#5bc0de', bg: '#eef8fb' },
  ready_to_pickup: { label: 'Siap Diambil',          color: '#5cb85c', bg: '#eefbee' },
  sold:            { label: 'Selesai',               color: '#777',    bg: '#f5f5f5' },
  canceled:        { label: 'Dibatalkan',            color: '#d9534f', bg: '#fff0f0' },
  booked:          { label: 'Booked',                color: '#337ab7', bg: '#eef4fb' },
}

const StatusBadge = ({ status }) => {
  const s = STATUS_CONFIG[status] || { label: status, color: '#333', bg: '#eee' }
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.color}`,
      borderRadius: 6,
      padding: '3px 10px',
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>
      {s.label}
    </span>
  )
}

const Order = () => {
  const [dataOrder, setDataOrder] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const fileInputRefs = useRef({})

  const fetchData = async () => {
    try {
      const id_user = localStorage.getItem('id_user')
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/order/${id_user}`)
      setDataOrder(response.data.data)
    } catch (error) {
      console.error('error fetching data:', error)
    }
  }

  useEffect(() => { fetchData() }, [])

  const formatToRupiah = amount =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Batalkan Order?',
      text: 'Order yang dibatalkan tidak bisa dikembalikan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Batalkan',
      cancelButtonText: 'Kembali',
    })
    if (!result.isConfirmed) return

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}api/order/${orderId}/cancel`)
      Swal.fire('Dibatalkan', 'Order berhasil dibatalkan.', 'success')
      fetchData()
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Gagal membatalkan order', 'error')
    }
  }

  const handleUploadProof = async (orderId, file) => {
    if (!file) return
    const formData = new FormData()
    formData.append('payment_proof', file)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}api/order/${orderId}/payment-proof`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      Swal.fire('Berhasil', 'Bukti pembayaran berhasil diupload. Menunggu konfirmasi admin.', 'success')
      fetchData()
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Gagal upload bukti bayar', 'error')
    }
  }

  return (
    <div className='container my-1 py-1'>
      <h4 className='text-center'>My Orders</h4>
      <hr />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='order table'>
          <TableHead>
            <TableRow sx={{ background: '#f5f5f5' }}>
              <TableCell><strong>#</strong></TableCell>
              <TableCell><strong>Produk</strong></TableCell>
              <TableCell><strong>Qty</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell><strong>Metode Bayar</strong></TableCell>
              <TableCell><strong>Penerima</strong></TableCell>
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
              const isPending = status === 'pending_payment'
              const isTransferPending = isPending && row.payment_method === 'transfer' && !row.payment_proof

              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img
                        src={`${import.meta.env.VITE_API_URL}uploads/${row.product?.image}`}
                        alt=''
                        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                      />
                      <span>{row.product?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{formatToRupiah(row.total_amount)}</TableCell>
                  <TableCell>
                    {row.payment_method === 'transfer' ? 'Transfer Bank' : 'Tunai (Cash)'}
                  </TableCell>
                  <TableCell>
                    <div>{row.recipient_name || '-'}</div>
                    <small style={{ color: '#888' }}>{row.recipient_phone || ''}</small>
                  </TableCell>
                  <TableCell><StatusBadge status={status} /></TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {isTransferPending && (
                        <>
                          <input
                            type='file'
                            accept='image/*'
                            style={{ display: 'none' }}
                            ref={el => (fileInputRefs.current[row.id] = el)}
                            onChange={e => handleUploadProof(row.id, e.target.files[0])}
                          />
                          <button
                            className='btn btn-sm btn-outline-primary'
                            onClick={() => fileInputRefs.current[row.id]?.click()}
                          >
                            Upload Bukti Bayar
                          </button>
                        </>
                      )}
                      {isPending && row.payment_method === 'transfer' && row.payment_proof && (
                        <span style={{ color: '#5bc0de', fontSize: 12 }}>✓ Bukti terkirim</span>
                      )}
                      {isPending && (
                        <button
                          className='btn btn-sm btn-outline-danger'
                          onClick={() => handleCancelOrder(row.id)}
                        >
                          Batalkan
                        </button>
                      )}
                      {!isPending && status !== 'canceled' && (
                        <span style={{ color: '#aaa', fontSize: 12 }}>—</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {dataOrder.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align='center' style={{ padding: 40, color: '#aaa' }}>
                  Belum ada order
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={dataOrder.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0) }}
      />
    </div>
  )
}

export default Order
