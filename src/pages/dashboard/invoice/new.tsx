// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import InvoiceNewEditForm from '../../../sections/@dashboard/invoice/form';

// ----------------------------------------------------------------------

InvoiceCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function InvoiceCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Nouvelle facture - Binary-Cloud</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Nouvelle facture"
          links={[
            {
              name: 'Tableau de bord',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Mes factures',
              href: PATH_DASHBOARD.invoice.list,
            },
            {
              name: 'Nouvelle facture',
            },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </>
  );
}
