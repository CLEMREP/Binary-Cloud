import * as Yup from 'yup';
import {useCallback, useState} from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
import { forEach } from "lodash";
// utils
import { fData } from '../../../../utils/formatNumber';
// assets
import { countries } from '../../../../assets/data';
// components
import { CustomFile } from '../../../../components/upload';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  email: string;
  image: CustomFile;
  phone: string;
  siret: string;
  address: string;
  state: string;
  city: string;
  zip: string;
};

export default function AccountGeneralCompany() {
  const [image, setImage] = useState<File>(new File([], ''));
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis'),
    email: Yup.string().required('L\'e-mail est requise').email('L\'e-mail est invalide'),
    image: Yup.string().required('Votre image de marque est requise').nullable(true),
    phone: Yup.string().required('Le numéro de téléphone est requis'),
    siret: Yup.string().required('Le numéro SIRET est requis'),
    address: Yup.string().required('L\'adresse est requise'),
    state: Yup.string().required('Le pays est requis'),
    city: Yup.string().required('La ville est requise'),
    zip: Yup.string().required('Le code postal est requis'),
  });

  const defaultValues = {
    name: user?.company.name || '',
    email: user?.company.email || '',
    image: user?.company?.image?.path || null,
    phone: user?.company.phone || '',
    siret: user?.company.siret || '',
    address: user?.company.address.address || '',
    state: user?.company.address.state || '',
    city: user?.company.address.city || '',
    zip: user?.company.address.zip || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = new FormData();
      form.append('name', data.name);
      form.append('email', data.email);
      form.append('phone', data.phone);
      form.append('siret', data.siret);
      form.append('address', data.address);
      form.append('state', data.state);
      form.append('city', data.city);
      form.append('zip', data.zip);
      form.append('image', image);
      await axios.post(`/api/account/update/${user?.id}/company`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      enqueueSnackbar('Modification effectuée !');
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

  const handleDrop = useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        if (file) {
          setImage(newFile);
          setValue('image', newFile, { shouldValidate: true });
        }
      },
      [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
                name="image"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                  >
                    Autorisé : *.jpeg, *.jpg, *.png, *.gif
                    <br /> Taille maximale de {fData(3145728)}
                  </Typography>
                }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
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
              <RHFTextField name="name" label="Entreprise" />

              <RHFTextField name="email" label="Adresse électronique" />

              <RHFTextField name="phone" label="Téléphone" />

              <RHFTextField name="siret" label="SIRET" />

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
