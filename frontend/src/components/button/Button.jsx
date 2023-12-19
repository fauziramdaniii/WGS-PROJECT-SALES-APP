import React from 'react'

const Button = ({ children, onClick, ...rest }) => {
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default Button
