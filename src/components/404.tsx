import { useNavigate } from 'react-router-dom'

import { CustomButton } from '@ui/button/CustomButton'

export const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>404: Page not found</h1>
      <CustomButton onClick={() => navigate('/')}>Back</CustomButton>
    </div>
  )
}