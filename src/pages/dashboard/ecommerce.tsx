// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  EcommerceYearlySales,
  EcommerceWidgetSummary,
} from '../../sections/@dashboard/general/e-commerce';

import {
  BankingRecentTransitions,
} from '../../sections/@dashboard/general/banking';

import {
  _bankingContacts,
  _bankingCreditCard,
  _bankingRecentTransitions,
} from '../../_mock/arrays';

// ----------------------------------------------------------------------

GeneralEcommercePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function GeneralEcommercePage() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Tableau de bord - Binary-Cloud</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          
          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Chiffre d'affaires"
              percent={2.6}
              total={7650}
              chart={{
                colors: [theme.palette.primary.main],
                series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Bénéfices"
              percent={-0.1}
              total={18765}
              chart={{
                colors: [theme.palette.info.main],
                series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Pertes"
              percent={0.6}
              total={4876}
              chart={{
                colors: [theme.palette.warning.main],
                series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <EcommerceYearlySales
              title="Chiffre d'affaires"
              subheader="(+43%) par rapport à l'année dernière"
              chart={{
                categories: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
                series: [
                  {
                    year: '2021',
                    data: [
                      { name: 'CA', data: [10, 41, 35, 151, 49, 62, 69, 91, 48, 68, 90, 101] },
                    ],
                  },
                  {
                    year: '2022',
                    data: [
                      { name: 'CA', data: [148, 91, 69, 62, 49, 51, 35, 41, 10, 68, 90, 101] },
                    ],
                  },
                ],
              }}
            />
          </Grid>


          <Grid item xs={12} md={12} lg={12} xl={6} >
              <BankingRecentTransitions
                title="Factures récentes"
                tableData={_bankingRecentTransitions}
                tableLabels={[
                  { id: 'client', label: 'Client' },
                  { id: 'date', label: 'Date' },
                  { id: 'montant', label: 'Montant' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
          </Grid>

          <Grid item xs={12} md={12} lg={12} xl={6} >
              <BankingRecentTransitions
                title="Devis récents"
                tableData={_bankingRecentTransitions}
                tableLabels={[
                  { id: 'client', label: 'Client' },
                  { id: 'date', label: 'Date' },
                  { id: 'montant', label: 'Montant' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
          </Grid>


        </Grid>
      </Container>
    </>
  );
}
