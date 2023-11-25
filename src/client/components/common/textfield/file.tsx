import * as React from 'react'
import InputUnstyled, { InputUnstyledInputSlotProps } from '@mui/base/InputUnstyled'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import PlusIcon from '../../../../asset/img/plus.svg'
import DocumentIcon from '../../../../asset/img/document.svg'
import { replaceRGBAlpha } from '../color'
import { MatrixContainer } from './'

const MatrixFileField = React.forwardRef(
  (
    props: InputUnstyledInputSlotProps & FileFieldProps,
    forwardRef: React.ForwardedRef<HTMLInputElement | undefined>
  ) => {
    const [state, setState] = React.useState<MatrixMobileNumberFieldState>({ focus: false, files: [] })

    const setRef: React.Ref<HTMLInputElement> = React.useCallback(
      (ref: HTMLInputElement) => {
        const input = ref ?? null
        if (input && !state.input) {
          setState((state) => ({ ...state, input }))
        }
      },
      [state.input]
    )
    React.useImperativeHandle(
      forwardRef,
      () => {
        return state.input
      },
      [state.input]
    )
    React.useEffect(() => {
      if (props.files) {
        const files = props.files
        setState((state) => ({ ...state, files }))
      }
    }, [props.files])
    React.useEffect(() => {
      if (state.input) state.input.value = ''
    }, [state.input, state.files])

    const onFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
      switch (event.type) {
        case 'focus':
          setState((state) => ({ ...state, focus: true }))
          break
        case 'blur':
          setState((state) => ({ ...state, focus: false }))
          break
      }
    }

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const files = Array.from(event.target.files ?? [])
      setState((state) => ({ ...state, files: [...state.files, ...files] }))
      onChangeFiles?.(files)
    }

    const onClick = (index: number) => {
      const files = state.files.filter((_, fileIndex) => fileIndex !== index)
      setState((state) => ({ ...state, files }))
      onChangeFiles?.(files)
    }

    const theme = useTheme()
    const { label, ownerState, files: omitFiles, onChangeFiles, helperText, ...others } = props
    const { focus, files } = state
    return (
      <MatrixContainer label={label} helperText={helperText} focus={focus}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: '8px',
            gap: '12px',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '112px',
              width: '112px',
              cursor: 'pointer',
              padding: '16px',
              border: `1px solid ${theme.palette.text.primary}`,
              backgroundColor: theme.palette.text.primary.replace(...replaceRGBAlpha(0.3)),
              borderRadius: '8px',
              userSelect: 'none',
            }}
          >
            <Box
              sx={{
                height: '50%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <img
                src={PlusIcon}
                style={{
                  width: '24px',
                }}
              />
            </Box>
            <Typography level="body1" sx={{ fontSize: '14px' }}>
              Upload
            </Typography>
            <input
              {...others}
              ref={setRef}
              type="file"
              multiple
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onFocus}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                opacity: 0,
                zIndex: 1,
              }}
            />
          </Box>
          {files.map((file, index) => (
            <Box
              key={`${index}-${file.name}`}
              onClick={() => onClick(index)}
              sx={{
                position: 'relative',
                height: '112px',
                width: '112px',
                cursor: 'pointer',
                border: `1px solid ${theme.palette.primary[400]}`,
                backgroundColor: theme.palette.primary[400].replace(...replaceRGBAlpha(0.3)),
                borderTopRightRadius: '8px',
                userSelect: 'none',
                ['& .document, & .close']: {
                  transition: 'opacity 160ms ease-in-out',
                },
                ['& .close, &:hover .document']: {
                  opacity: 0,
                },
                ['&:hover .close, & .document']: {
                  opacity: 1,
                },
              }}
            >
              <Box
                className="document"
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                }}
              >
                <Box
                  sx={{
                    height: '50%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={DocumentIcon}
                    style={{
                      width: '24px',
                    }}
                  />
                </Box>
                <Typography
                  level="body1"
                  sx={{
                    height: '50%',
                    maxWidth: '100%',
                    fontSize: '14px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {file.name}
                </Typography>
              </Box>
              <Box
                className="close"
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '16px',
                }}
              >
                <img
                  src={PlusIcon}
                  style={{
                    width: '24px',
                    transform: 'rotate(45deg)',
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </MatrixContainer>
    )
  }
)
type MatrixMobileNumberFieldState = {
  input?: HTMLInputElement
  focus: boolean
  files: File[]
}

const FileField = React.forwardRef((props: FileFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return <InputUnstyled ref={ref} slots={{ input: MatrixFileField }} slotProps={{ input: props }} />
})
type FileFieldProps = {
  label: string
  files?: File[]
  onChangeFiles?: (files: File[]) => void
  helperText?: string
  disabled?: boolean
}

export default FileField
