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
import EstimateNewEditForm from '../../../sections/@dashboard/estimate/form';

// ----------------------------------------------------------------------

EstimateCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EstimateCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Nouveau devis - Binary-Cloud</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Nouveau devis"
          links={[
            {
              name: 'Tableau de bord',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Mes devis',
              href: PATH_DASHBOARD.estimate.list,
            },
            {
              name: 'Nouveau devis',
            },
          ]}
        />

        <EstimateNewEditForm />
      </Container>
    </>
  );
}
