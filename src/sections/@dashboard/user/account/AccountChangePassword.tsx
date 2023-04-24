import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import { IUserAccountChangePassword } from '../../../../@types/user';
import { forEach } from "lodash";
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import {useAuthContext} from "../../../../auth/useAuthContext";
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------

type FormValuesProps = IUserAccountChangePassword;

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();


  const ChangePassWordSchema = Yup.object().shape({
    old_password: Yup.string().required('L\'ancien mot de passe est requis'),
    password: Yup.string()
      .min(8, 'Le mot de passe doit être d\'au moins 8 caractères')
      .required('Le nouveau mot de passe est requis'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas'),
  });

  const defaultValues = {
    old_password: '',
    password: '',
    password_confirmation: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      await axios.put(`/api/account/update/${user?.id}/password`, {
        data,
      });
      enqueueSnackbar('Modification enregistrée', { variant: 'success' });
    } catch (error) {
      forEach(error.errors, (value, key) => {
        // @ts-ignore
        methods.setError(key, {
          type: 'manual',
          message: value,
        });
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
          <RHFTextField name="old_password" type="password" label="Ancien mot de passe" />

          <RHFTextField
            name="password"
            type="password"
            label="Nouveau mot de passe"
            helperText={
              <Stack component="span" direction="row" alignItems="center">
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Le mot de passe doit être d'au moins 8 caractères
              </Stack>
            }
          />

          <RHFTextField name="password_confirmation" type="password" label="Confirmation du mot de passe" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Sauvegarder
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
