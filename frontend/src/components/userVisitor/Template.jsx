import Header from './Header'
import Content from './content'
import Footer from './Footer'
function Template (props) {
  return (
    <>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </>
  )
}

export default Template
