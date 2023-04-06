import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountNotifications,
  AccountChangePassword,
} from '../../../sections/@dashboard/user/account';
import AccountGeneralCompany from 'src/sections/@dashboard/user/account/AccountGeneralCompany';

// ----------------------------------------------------------------------

UserAccountPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('info');

  const TABS = [
    {
      value: 'info',
      label: 'Informations',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral />,
    },
    {
      value: 'company',
      label: 'Entreprise',
      icon: <Iconify icon="ri:building-line" />,
      component: <AccountGeneralCompany />,
    },
    {
      value: 'facturation',
      label: 'Facturation',
      icon: <Iconify icon="ic:round-receipt-long" />,
      component: (
        <AccountBilling
          cards={_userPayment}
          addressBook={_userAddressBook}
          invoices={_userInvoices}
        />
      ),
    },
    {
      value: 'change_password',
      label: 'Mot de passe',
      icon: <Iconify icon="mdi:password-check-outline" />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <>
      <Head>
        <title>Mon compte - Binary-Cloud</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Mon compte"
          links={[
            { name: 'Tableau de bord', href: PATH_DASHBOARD.root },
            { name: 'Mon compte' },
          ]}
        />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
