import { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { EEstimate, EEstimateAddress } from '../../../../@types/estimate';
// mock
import { _estimateAddressFrom } from '../../../../_mock/arrays';
// components
import FormProvider from '../../../../components/hook-form';
//
import EstimateNewEditDetails from './EstimateNewEditDetails';
import EstimateNewEditAddress from './EstimateNewEditAddress';
import EstimateNewEditStatusDate from './EstimateNewEditStatusDate';

// ----------------------------------------------------------------------

type IFormValuesProps = Omit<EEstimate, 'createDate' | 'dueDate' | 'estimateFrom' | 'estimateTo'>;

interface FormValuesProps extends IFormValuesProps {
  createDate: Date | null;
  dueDate: Date | null;
  estimateFrom: EEstimateAddress | null;
  estimateTo: EEstimateAddress | null;
}

type Props = {
  isEdit?: boolean;
  currentEstimate?: FormValuesProps;
};

export default function EstimateNewEditForm({ isEdit, currentEstimate }: Props) {
  const { push } = useRouter();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
    estimateTo: Yup.mixed().nullable().required('Estimate to is required'),
  });

  const defaultValues = useMemo(
    () => ({
      estimateNumber: currentEstimate?.estimateNumber || '17099',
      createDate: currentEstimate?.createDate || new Date(),
      dueDate: currentEstimate?.dueDate || null,
      taxes: currentEstimate?.taxes || 0,
      status: currentEstimate?.status || 'draft',
      discount: currentEstimate?.discount || 0,
      estimateFrom: currentEstimate?.estimateFrom || _estimateAddressFrom[0],
      estimateTo: currentEstimate?.estimateTo || null,
      items: currentEstimate?.items || [
        { title: '', description: '', service: '', quantity: 1, price: 0, total: 0 },
      ],
      totalPrice: currentEstimate?.totalPrice || 0,
    }),
    [currentEstimate]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentEstimate) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentEstimate]);

  const handleSaveAsDraft = async (data: FormValuesProps) => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(false);
      push(PATH_DASHBOARD.estimate.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSave(false);
    }
  };

  const handleCreateAndSend = async (data: FormValuesProps) => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      push(PATH_DASHBOARD.estimate.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSend(false);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <EstimateNewEditAddress />

        <EstimateNewEditStatusDate />

        <EstimateNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {isEdit ? 'Sauvegarder' : 'Créer'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
