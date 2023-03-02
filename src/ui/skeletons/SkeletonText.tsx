import { Skeleton } from '@mui/material'
import Stack from '@mui/material/Stack'

export const SkeletonText = () => {
  return (
    <Stack>
      <Skeleton animation='wave' variant='text' height={40} />
      <Skeleton animation='wave' variant='text' height={40} />
      <Skeleton animation='wave' variant='text' height={40} />
    </Stack>
  )
}