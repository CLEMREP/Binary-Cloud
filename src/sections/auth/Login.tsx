// next
import NextLink from 'next/link';
// @mui
import {  Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Espace de connexion</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Vous n'avez pas de compte ?</Typography>

          <Link component={NextLink} href={PATH_AUTH.register} variant="subtitle2">
            Créer un compte
          </Link>
        </Stack>
      </Stack>

      <AuthLoginForm />

      <AuthWithSocial />
    </LoginLayout>
  );
}
