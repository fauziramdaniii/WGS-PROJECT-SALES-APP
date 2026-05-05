import React, { useState, useEffect } from 'react'
import Footer from '../../components/visitor/Footer'
import Navbar from '../../components/visitor/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import useTermAndConditionStores from '../../stores/termCondition/TermAndConditionStores'
import { getCart } from '../../redux/action/action'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.cartItems)
  const { getTerm } = useTermAndConditionStores()

  const [form, setForm] = useState({
    recipient_name: '',
    recipient_phone: '',
    payment_method: 'cash',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  const formatToRupiah = amount => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.product?.price || 0),
    0
  )

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const validate = () => {
    const errs = {}
    if (!form.recipient_name.trim()) errs.recipient_name = 'Nama penerima wajib diisi'
    if (!form.recipient_phone.trim()) errs.recipient_phone = 'Nomor HP wajib diisi'
    else if (!/^[0-9]{9,15}$/.test(form.recipient_phone.replace(/\s/g, '')))
      errs.recipient_phone = 'Nomor HP tidak valid'
    return errs
  }

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    try {
      // Tampilkan syarat & ketentuan
      const responseTerm = await getTerm()
      if (!responseTerm.data || responseTerm.data.length === 0) {
        Swal.fire('Error', 'Terms & Conditions belum dikonfigurasi. Hubungi admin.', 'error')
        return
      }

      const result = await Swal.fire({
        title: responseTerm.data[0].title,
        html: responseTerm.data[0].content,
        showCancelButton: true,
        confirmButtonText: 'Setuju & Order',
        cancelButtonText: 'Batal',
        width: '70%',
      })

      if (!result.isConfirmed) return

      setLoading(true)
      const idUser = localStorage.getItem('id_user')

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/order`,
        {
          id_user: idUser,
          payment_method: form.payment_method,
          notes: form.notes || 'Collect at Store',
          recipient_name: form.recipient_name,
          recipient_phone: form.recipient_phone,
        }
      )

      dispatch(getCart())

      if (form.payment_method === 'transfer') {
        await Swal.fire({
          icon: 'success',
          title: 'Order Berhasil!',
          html: `
            <p>Invoice telah dikirim ke email kamu.</p>
            <p><strong>Silakan upload bukti pembayaran</strong> di halaman <em>My Order</em> agar pesanan dapat diproses.</p>
          `,
          confirmButtonText: 'Lihat Order Saya',
        })
      } else {
        await Swal.fire({
          icon: 'success',
          title: 'Order Berhasil!',
          text: 'Invoice telah dikirim ke email kamu. Silakan datang ke toko untuk melakukan pembayaran.',
          confirmButtonText: 'Lihat Order Saya',
        })
      }

      navigate('/dashboard/order')
    } catch (error) {
      console.error('Checkout error:', error)
      const msg = error.response?.data?.error || 'Gagal membuat order. Coba lagi.'
      Swal.fire('Error', msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className='container my-5 py-5 text-center'>
          <h4 className='display-5'>Keranjang kamu kosong</h4>
          <Link to='/' className='btn btn-outline-dark mt-3'>
            <i className='fa fa-arrow-left me-2'></i> Lanjut Belanja
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className='container my-3 py-3'>
        <h1 className='text-center'>Checkout</h1>
        <hr />
        <div className='row my-4'>

          {/* Form Checkout */}
          <div className='col-md-7'>
            <div className='card mb-4'>
              <div className='card-header py-3'>
                <h5 className='mb-0'>Detail Penerima</h5>
              </div>
              <div className='card-body'>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label className='form-label'>Nama Penerima <span className='text-danger'>*</span></label>
                    <input
                      type='text'
                      className={`form-control ${errors.recipient_name ? 'is-invalid' : ''}`}
                      name='recipient_name'
                      placeholder='Nama lengkap penerima'
                      value={form.recipient_name}
                      onChange={handleChange}
                    />
                    {errors.recipient_name && <div className='invalid-feedback'>{errors.recipient_name}</div>}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Nomor HP <span className='text-danger'>*</span></label>
                    <input
                      type='text'
                      className={`form-control ${errors.recipient_phone ? 'is-invalid' : ''}`}
                      name='recipient_phone'
                      placeholder='Contoh: 08123456789'
                      value={form.recipient_phone}
                      onChange={handleChange}
                    />
                    {errors.recipient_phone && <div className='invalid-feedback'>{errors.recipient_phone}</div>}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Catatan (opsional)</label>
                    <textarea
                      className='form-control'
                      name='notes'
                      rows={2}
                      placeholder='Catatan tambahan untuk toko...'
                      value={form.notes}
                      onChange={handleChange}
                    />
                  </div>

                  <hr />
                  <h5 className='mb-3'>Metode Pembayaran</h5>

                  <div className='mb-2'>
                    <div className='form-check mb-2'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='payment_method'
                        id='cash'
                        value='cash'
                        checked={form.payment_method === 'cash'}
                        onChange={handleChange}
                      />
                      <label className='form-check-label' htmlFor='cash'>
                        <strong>Tunai (Cash)</strong>
                        <small className='d-block text-muted'>Bayar langsung di toko saat mengambil barang</small>
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='payment_method'
                        id='transfer'
                        value='transfer'
                        checked={form.payment_method === 'transfer'}
                        onChange={handleChange}
                      />
                      <label className='form-check-label' htmlFor='transfer'>
                        <strong>Transfer Bank</strong>
                        <small className='d-block text-muted'>Transfer ke rekening toko, lalu upload bukti pembayaran</small>
                      </label>
                    </div>
                  </div>

                  {form.payment_method === 'transfer' && (
                    <div className='alert alert-info mt-3 mb-0'>
                      <strong>Info Rekening:</strong><br />
                      Bank BCA — No. Rek: <strong>1234567890</strong><br />
                      Atas Nama: <strong>WGS Sales App</strong><br />
                      <small>Setelah transfer, upload bukti bayar di halaman My Order.</small>
                    </div>
                  )}

                  <hr />
                  <button
                    type='submit'
                    className='btn btn-dark btn-lg w-100'
                    disabled={loading}
                  >
                    {loading ? 'Memproses...' : 'Konfirmasi Order'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='col-md-5'>
            <div className='card mb-4'>
              <div className='card-header py-3 bg-light'>
                <h5 className='mb-0'>Ringkasan Pesanan</h5>
              </div>
              <div className='card-body'>
                {cartItems.map(item => (
                  <div key={item.id} className='d-flex justify-content-between mb-2'>
                    <span>
                      {item.product?.name}
                      <small className='text-muted d-block'>x{item.quantity}</small>
                    </span>
                    <span>{formatToRupiah(item.quantity * (item.product?.price || 0))}</span>
                  </div>
                ))}
                <hr />
                <div className='d-flex justify-content-between'>
                  <span>Total ({totalItems} produk)</span>
                  <strong>{formatToRupiah(subtotal)}</strong>
                </div>
              </div>
            </div>
            <Link to='/cart' className='btn btn-outline-secondary w-100'>
              <i className='fa fa-arrow-left me-2'></i> Kembali ke Keranjang
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Checkout
