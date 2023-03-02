import { Tooltip } from '@mui/material'
import TextField from '@mui/material/TextField'
import { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react'


type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = memo(({ title: propsTitle, changeTitle }) => {
  const [title, setTitle] = useState<string>(propsTitle)
  const [editMode, setEditMode] = useState<boolean>(false)

  const activateEditMode = () => {
    const correctTitle = propsTitle.toLowerCase() === title.toLowerCase()
    setEditMode(!editMode)
    if (editMode && !correctTitle) {
      changeTitle(title)
    }
  }

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === 'Enter' && activateEditMode()

  return (
    <>
      {editMode ? (
        <TextField
          value={title}
          onChange={onChangeInputValue}
          onBlur={activateEditMode}
          onKeyDown={onEnterHandler}
          autoFocus
          variant='standard'
        />
      ) : (
        <Tooltip title='Double click to change'>
          <span onDoubleClick={activateEditMode}>{propsTitle}</span>
        </Tooltip>
      )}
    </>
  )
})