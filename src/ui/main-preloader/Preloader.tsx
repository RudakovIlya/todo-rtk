import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export const Preloader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 7,
        position: 'relative',
      }}>
      <CircularProgress
        size={300}
        sx={{
          color: '#000000',
        }}
      />
    </Box>
  )
}