// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// _mock_
import { _estimates } from '../../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import EstimateNewEditForm from '../../../../sections/@dashboard/estimate/form';

// ----------------------------------------------------------------------

EstimateEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function EstimateEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();

  const currentEstimate = _estimates.find((estimate) => estimate.id === id);

  return (
    <>
      <Head>
        <title>Éditer un devis - Binary-Cloud</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Éditer un devis"
          links={[
            {
              name: 'Tableau de bord',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Mes devis',
              href: PATH_DASHBOARD.estimate.list,
            },
            { name: `DEV-${currentEstimate?.estimateNumber}` },
          ]}
        />

        <EstimateNewEditForm isEdit currentEstimate={currentEstimate} />
      </Container>
    </>
  );
}
