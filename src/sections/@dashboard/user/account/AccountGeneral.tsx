import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
import { forEach } from "lodash";
// assets
import { countries } from '../../../../assets/data';
// components
import { CustomFile } from '../../../../components/upload';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from '../../../../components/hook-form';
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------

type FormValuesProps = {
  firstname: string;
  lastname: string;
  email: string;
  photoURL: CustomFile | string | null;
  phone: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zip: string | null;
};

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    firstname: Yup.string().required('Le prénom est requis'),
    lastname: Yup.string().required('Le nom est requis'),
    email: Yup.string().required('L\'e-mail est requise').email('L\'e-mail est invalide'),
    phone: Yup.string().required('Le numéro de téléphone est requis'),
    state: Yup.string().required('Le pays est requis'),
    address: Yup.string().required('L\'adresse est requise'),
    city: Yup.string().required('La ville est requise'),
    zip: Yup.string().required('Le code postal est requis'),
  });

  const defaultValues = {
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    state: user?.address.state || '',
    address: user?.address.address || '',
    city: user?.address.city || '',
    zip: user?.address.zip || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await axios.put(`/api/account/update/${user?.id}`, {
        data,
      });
      enqueueSnackbar('Modifications enregistrées !');
      window.location.reload();
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
      <Grid container spacing={3}>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="firstname" label="Prénom" />

              <RHFTextField name="lastname" label="Nom" />

              <RHFTextField name="email" label="Adresse électronique" />

              <RHFTextField name="phone" label="Téléphone" />

              <RHFTextField name="address" label="Adresse" />

              <RHFSelect native name="state" label="Pays" placeholder="Pays">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="city" label="Ville" />

              <RHFTextField name="zip" label="Code postal" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Sauvegarder
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
