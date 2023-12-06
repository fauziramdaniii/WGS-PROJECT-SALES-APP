import './alert.scss'
import { Alert } from '@mui/material'

function AlertForCrud () {
  return (
    <div className='alert'>
      <Alert variant='filled' severity='error' className='separate'>
        This is an error alert — check it out!
      </Alert>
      <Alert variant='filled' severity='warning' className='separate'>
        This is a warning alert — check it out!
      </Alert>
      <Alert variant='filled' severity='info' className='separate'>
        This is an info alert — check it out!
      </Alert>
      <Alert variant='filled' severity='success' className='separate'>
        This is a success alert — check it out!
      </Alert>
    </div>
  )
}

export default AlertForCrud
