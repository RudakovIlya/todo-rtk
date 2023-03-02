import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react'


type AddItemFormPropsType = {
  disabled?: boolean
  addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem, disabled }) => {
  const [error, setError] = useState<boolean>(false)
  const [titleTask, setTitle] = useState<string>('')

  const addItemCallback = () => {
    const trimmedTitle = titleTask.trim()
    if (trimmedTitle) {
      addItem(trimmedTitle)
      setTitle('')
    } else {
      setError(true)
    }
  }

  const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && addItemCallback()
  }

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    error && setError(false)
  }

  return (
    <>
      <TextField
        disabled={disabled}
        label={error ? 'Please, enter task title' : 'Title'}
        variant='outlined'
        value={titleTask}
        onChange={onChangeInputHandler}
        onKeyDown={onKeyDownInputHandler}
        error={error}
      />
      <IconButton
        disabled={disabled}
        onClick={addItemCallback}
        color={'default'}
        style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }}>
        <AddBoxIcon />
      </IconButton>
    </>
  )
})