import Button from '@mui/material/Button'
import { FC, memo, PropsWithChildren } from 'react'

interface ICustomButton {
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  isActive?: boolean
  variant?: 'text' | 'outlined' | 'contained' | undefined
}

export const CustomButton: FC<PropsWithChildren & ICustomButton> = memo(
  ({ children, disabled = false, onClick, variant = 'outlined', isActive, type = 'button' }) => {
    const activeStyle = {
      backgroundColor: '#333333',
      color: '#ffffff',
    }

    const defaultStyle = {
      backgroundColor: '#ffffff',
      color: '#333333',
    }

    return (
      <Button
        type={type}
        variant={variant}
        style={isActive ? activeStyle : defaultStyle}
        onClick={onClick}
        disabled={disabled}>
        {children}
      </Button>
    )
  },
)