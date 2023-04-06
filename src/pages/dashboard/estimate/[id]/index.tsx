// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _estimates } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import EstimateDetails from '../../../../sections/@dashboard/estimate/details';

// ----------------------------------------------------------------------

EstimateDetailsPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EstimateDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();

  const currentEstimate = _estimates.find((estimate) => estimate.id === id);

  return (
    <>
      <Head>
        <title>Visualiser un devis - Binary-Cloud</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Visualiser un devis"
          links={[
            { name: 'Tableau de bord', href: PATH_DASHBOARD.root },
            {
              name: 'Mes devis',
              href: PATH_DASHBOARD.estimate.root,
            },
            { name: `DEV-${currentEstimate?.estimateNumber}` },
          ]}
        />

        <EstimateDetails estimate={currentEstimate} />
      </Container>
    </>
  );
}
