// next
import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { CustomAvatar } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: theme.spacing(1),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavAccountMini() {
  const { user } = useAuthContext();
  const image = `${process.env.HOST_API_KEY}/${user?.company?.image?.path}`;
  return (
    <Link component={NextLink} href={PATH_DASHBOARD.user.account} underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar src={image} alt={user?.company?.name} name={user?.company?.name} />
      </StyledRoot>
    </Link>
  );
}
