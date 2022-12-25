import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import ButtonUnstyled, { ButtonUnstyledRootSlotProps, buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'

const SvgButton = React.forwardRef(
  (props: ButtonUnstyledRootSlotProps & ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const theme = useTheme()
    const { label, url, ownerState, ...others } = props
    const id = label.replace(/\s/g, '-')
    return (
      <Box
        component="a"
        {...others}
        ref={ref}
        href={url}
        sx={{
          width: '160px',
          padding: '0',
          pointerEvents: props.disabled ? 'none' : 'auto',
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          transition: 'transform 160ms ease-in-out',
          opacity: props.disabled ? 0.5 : 1,
          [`&.${buttonUnstyledClasses.focusVisible}, &:hover`]: {
            transform: 'scale(1.03)',
          },
          [`&.${buttonUnstyledClasses.active}, &:active`]: {
            transform: 'scale(0.97)',
          },
          ['& .button-rect']: {
            transition: ['x 160ms ease-in-out', 'width 160ms ease-in-out'].join(','),
          },
          [`&.${buttonUnstyledClasses.active} .button-rect, &:active .button-rect`]: {
            x: 235,
            width: 0,
          },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-3 -3 241 70"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <clipPath id={`button-shape-${id}`}>
            <polygon points="235 16 235 0 0 0 0 48.25 16 64 235 64 235 48 231 44 231 20 235 16" fill="black" />
          </clipPath>
          <rect
            className="button-rect"
            clipPath={`url(#button-shape-${id})`}
            x={0}
            y={0}
            width={235}
            height={64}
            fill={props.disabled ? 'transparent' : theme.palette.primary[600]}
          />
          <polygon
            points="235 16 235 0 0 0 0 48.25 16 64 235 64 235 48 231 44 231 20 235 16"
            stroke={props.disabled ? theme.palette.text.primary : theme.palette.primary[600]}
            strokeWidth={3}
            fillOpacity={0}
          />
          <text
            x={117.5}
            y={32}
            textAnchor="middle"
            fontSize="18px"
            fontFamily={['Bank Gothic', 'sans-serif'].join(',')}
            letterSpacing="0.3em"
            dominantBaseline="middle"
            fill={theme.palette.primary[600]}
          >
            {label}
          </text>
          <clipPath id={`button-text-${id}`}>
            <text
              x={117.5}
              y={32}
              textAnchor="middle"
              fontSize="18px"
              fontFamily={['Bank Gothic', 'sans-serif'].join(',')}
              letterSpacing="0.3em"
              dominantBaseline="middle"
            >
              {label}
            </text>
          </clipPath>
          <rect
            className="button-rect"
            clipPath={`url(#button-text-${id})`}
            x={0}
            y={0}
            width={235}
            height={64}
            fill={theme.palette.text.primary}
          />
        </svg>
      </Box>
    )
  }
)

const Button = React.forwardRef((props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  return <ButtonUnstyled {...props} slots={{ root: SvgButton }} ref={ref} />
})
type ButtonProps = {
  label: string
  url?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  disabled?: boolean
}

export default Button
