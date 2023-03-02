import { Skeleton } from '@mui/material'
import Stack from '@mui/material/Stack'
import { FC } from 'react'

import { ItemWrapper } from '../wrappers/ItemWrapper'
import { SkeletonText } from './SkeletonText'

interface ISkeletonList {
  quantity?: number
}

export const SkeletonList: FC<ISkeletonList> = ({ quantity = 6 }) => {
  const skeletItem = Array.from(new Array(quantity)).map((item, index) => {
    return (
      <ItemWrapper key={index}>
        <Stack spacing={1}>
          <Skeleton animation='wave' variant='text' height={40} />

          <Skeleton animation='wave' variant='rectangular' height={60} />
          <SkeletonText />
          <Stack direction='row' spacing={2}>
            <Skeleton animation='wave' variant='rounded' width={64} height={36} />
            <Skeleton animation='wave' variant='rounded' width={84} height={36} />
            <Skeleton animation='wave' variant='rounded' width={122} height={36} />
          </Stack>
        </Stack>
      </ItemWrapper>
    )
  })

  return <>{skeletItem}</>
}