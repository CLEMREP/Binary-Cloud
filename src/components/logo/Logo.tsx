import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    const SECONDARY_LIGHT = theme.palette.secondary.dark;

    const SECONDARY_MAIN = theme.palette.secondary.darker;

    const test = theme.palette.primary.contrastText;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.1 263.83">
          <defs></defs>
          <title>Logotype BinaryCloud</title>
          <g id="Calque_2" data-name="Calque 2">
            <g id="Calque_1-2" data-name="Calque 1">
              <path fill='#15a5e3' d="M42.47,89.45v84.93H21.23V126.23A42.19,42.19,0,0,1,0,131.91V110.68A21.22,21.22,0,0,0,21.23,89.45Z"/>
              <path fill='#15a5e3' d="M125.53,102a21.24,21.24,0,0,0-19.36-12.5H84.94A21.23,21.23,0,0,0,63.7,110.68v42.47a21.21,21.21,0,0,0,21.24,21.23h21.23a21.23,21.23,0,0,0,21.23-21.23V110.68a21.19,21.19,0,0,0-1.87-8.73m-19.36,40.58a10.58,10.58,0,0,1-3.92,8.23,10.34,10.34,0,0,1-2.33,1.45,10.6,10.6,0,0,1-7.42.49h0a11.54,11.54,0,0,1-1.32-.49,10.72,10.72,0,0,1-5.31-5.31,10.6,10.6,0,0,1-.93-4.37V121.3a10.61,10.61,0,0,1,19.2-6.24,10.26,10.26,0,0,1,1.09,1.87,10.61,10.61,0,0,1,.94,4.37Z"/>
              <path fill='#fafafa' d="M190.22,189.51A63.73,63.73,0,0,1,127.4,242.6c-1.87,0-3.72-.09-5.54-.24a42.47,42.47,0,0,1-79.39-21v-5.69a42.56,42.56,0,0,1-19.9-26.17H45.31A21.19,21.19,0,0,0,63.7,200.13v21.24a21.24,21.24,0,1,0,41.53-6.24,42.49,42.49,0,0,0,63.3-25.62Z"/>
              <path fill='#fafafa' d="M189.77,74.31H167A21.39,21.39,0,0,0,161.38,68a21.13,21.13,0,0,0-12.75-4.25V42.47a21.23,21.23,0,1,0-42.46,0,21,21,0,0,0,.93,6.23A42.51,42.51,0,0,0,43.8,74.31H22.12A63.69,63.69,0,0,1,84.94,21.23c1.86,0,3.71.08,5.54.24a42.47,42.47,0,0,1,79.39,21v5.68a42.6,42.6,0,0,1,19.9,26.16"/>
              <path fill='#15a5e3' d="M191.1,89.45v84.93H169.87V126.23l-.46.26a42.19,42.19,0,0,1-20.78,5.42V110.68a21.23,21.23,0,0,0,21.24-21.23Z"/>
            </g>
          </g>
        </svg>

      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
