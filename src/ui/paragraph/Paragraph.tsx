import Typography from '@mui/material/Typography'
import { FC, PropsWithChildren } from 'react'

export const Paragraph: FC<PropsWithChildren & { color?: string }> = ({ children, color = 'inherit' }) => {
  return (
    <Typography
      sx={{
        color,
        '&:not(:last-child)': {
          marginBottom: 1.5,
        },
      }}>
      {children}
    </Typography>
  )
}