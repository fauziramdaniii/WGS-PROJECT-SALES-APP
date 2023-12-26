import React from 'react'
import Footer from '../../components/visitor/Footer'
import Navbar from '../../components/visitor/Navbar'

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className='container my-3 py-3'>
        <h1 className='text-center'>About Us</h1>
        <hr />
        <p className='lead text-center'>
          Andromeda Urban Trends is a fashion destination that seamlessly blends
          urban contemporary style with innovative futuristic touches. Located
          in the bustling city center, this store offers a unique and enjoyable
          shopping experience for visitors looking to stay stylish and
          up-to-date. With a modern and attractive interior design, Andromeda
          Urban Trends creates a captivating atmosphere. Thoughtfully designed
          racks organize the latest clothing and accessories collections, making
          it easy for customers to find fashion items that suit their style. We
          present a diverse range of choices from well-known brands to
          up-and-coming local designers, giving customers the opportunity to
          explore various styles and fashion trends. Andromeda Urban Trends also
          proudly features exclusive collections that cannot be found elsewhere,
          providing customers with an exclusive and individual shopping
          experience.
        </p>

        <h2 className='text-center py-4'>Our Products</h2>
        <div className='row'>
          <div className='col-md-3 col-sm-6 mb-3 px-3'>
            <div className='card h-100'>
              <img
                className='card-img-top img-fluid'
                src='https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=''
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <div className='card-body'>
                <h5 className='card-title text-center'>Mens's Clothing</h5>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 mb-3 px-3'>
            <div className='card h-100'>
              <img
                className='card-img-top img-fluid'
                src='https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=''
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <div className='card-body'>
                <h5 className='card-title text-center'>Women's Clothing</h5>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 mb-3 px-3'>
            <div className='card h-100'>
              <img
                className='card-img-top img-fluid'
                src='https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=''
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <div className='card-body'>
                <h5 className='card-title text-center'>Jewelery</h5>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 mb-3 px-3'>
            <div className='card h-100'>
              <img
                className='card-img-top img-fluid'
                src='https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=''
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <div className='card-body'>
                <h5 className='card-title text-center'>Electronics</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage
