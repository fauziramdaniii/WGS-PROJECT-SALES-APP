import React, { useEffect, useState } from 'react'
import Footer from '../../components/visitor/Footer'
import Navbar from '../../components/visitor/Navbar'
import { Link } from 'react-router-dom'
import useCategoryStore from '../../stores/category/CategoryStore'

const AboutPage = () => {
  const [categories, setCategories] = useState([])

  const { getCategory } = useCategoryStore()
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategory()
      setCategories(response.data)
      console.log(response)
    }

    fetchData()
  }, [setCategories])
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
          explore various styles and fashion trends.{' '}
        </p>
        <h2 className='text-center py-4'>Our Products</h2>
        <div className='row'>
          {categories.map(category => (
            <div className='col-md-3 col-sm-6 mb-3 px-3' key={category.id}>
              {/* Use the Link component to create a clickable link */}
              <Link
                to={`/category/${category.id}`}
                className='text-decoration-none'
              >
                <div className='card h-100'>
                  <img
                    className='card-img-top img-fluid'
                    src={`${import.meta.env.VITE_API_URL}uploads/${
                      category.image
                    }`}
                    alt=''
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <div className='card-body'>
                    <h5 className='card-title text-center'>{category.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage
