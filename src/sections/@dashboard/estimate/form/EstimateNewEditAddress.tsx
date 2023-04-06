import { useState } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// _mock
import { _estimateAddressFrom, _estimateAddressTo } from '../../../../_mock/arrays';
// components
import Iconify from '../../../../components/iconify';
//
import EstimateAddressListDialog from './EstimateAddressListDialog';

// ----------------------------------------------------------------------

export default function EstimateNewEditAddress() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { estimateFrom, estimateTo } = values;

  const [openFrom, setOpenFrom] = useState(false);

  const [openTo, setOpenTo] = useState(false);

  const handleOpenFrom = () => {
    setOpenFrom(true);
  };

  const handleCloseFrom = () => {
    setOpenFrom(false);
  };

  const handleOpenTo = () => {
    setOpenTo(true);
  };

  const handleCloseTo = () => {
    setOpenTo(false);
  };

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          flexItem
          orientation={upMd ? 'vertical' : 'horizontal'}
          sx={{ borderStyle: 'dashed' }}
        />
      }
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            Depuis :
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon="eva:edit-fill" />}
            onClick={handleOpenFrom}
          >
            Modifier
          </Button>

          <EstimateAddressListDialog
            open={openFrom}
            onClose={handleCloseFrom}
            selected={(selectedId: string) => estimateFrom?.id === selectedId}
            onSelect={(address) => setValue('estimateFrom', address)}
            addressOptions={_estimateAddressFrom}
          />
        </Stack>

        <AddressInfo
          name={estimateFrom.name}
          address={estimateFrom.address}
          phone={estimateFrom.phone}
        />
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            Pour :
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon={estimateTo ? 'eva:edit-fill' : 'eva:plus-fill'} />}
            onClick={handleOpenTo}
          >
            {estimateTo ? 'Modifier' : 'Ajouter'}
          </Button>

          <EstimateAddressListDialog
            open={openTo}
            onClose={handleCloseTo}
            selected={(selectedId: string) => estimateTo?.id === selectedId}
            onSelect={(address) => setValue('estimateTo', address)}
            addressOptions={_estimateAddressTo}
          />
        </Stack>

        {estimateTo ? (
          <AddressInfo name={estimateTo.name} address={estimateTo.address} phone={estimateTo.phone} />
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {(errors.estimateTo as any)?.message}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type AddressInfoProps = {
  name: string;
  address: string;
  phone: string;
};

function AddressInfo({ name, address, phone }: AddressInfoProps) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        {address}
      </Typography>
      <Typography variant="body2">Téléphone : {phone}</Typography>
    </>
  );
}
