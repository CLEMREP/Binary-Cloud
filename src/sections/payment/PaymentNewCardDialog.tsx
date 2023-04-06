import { useState } from 'react';
// @mui
import {
  Stack,
  Button,
  Dialog,
  TextField,
  IconButton,
  DialogTitle,
  DialogProps,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@mui/material';
// components
import Iconify from '../../components/iconify';
import MenuPopover from '../../components/menu-popover';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  onClose: VoidFunction;
}

export default function PaymentNewCardDialog({ onClose, ...other }: Props) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <Dialog maxWidth="xs" onClose={onClose} {...other}>
        <DialogTitle> Ajouter une carte </DialogTitle>

        <DialogContent sx={{ overflow: 'unset' }}>
          <Stack spacing={3}>
            <TextField fullWidth label="Nom sur la carte" />

            <TextField fullWidth label="Numéro de carte" />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="MM/YY" />

              <TextField
                label="CVV"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" edge="end" onClick={handleOpenPopover}>
                        <Iconify icon="eva:info-fill" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="contained" onClick={onClose}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="bottom-center"
        sx={{ maxWidth: 200, typography: 'body2', textAlign: 'center' }}
      >
        Les trois nombres sur le dos de votre carte.
      </MenuPopover>
    </>
  );
}
