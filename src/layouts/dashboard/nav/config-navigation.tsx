// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Tableau de bord', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.dashboard },
      { title: 'Paiements', path: PATH_DASHBOARD.general.analytics, icon: ICONS.banking },
      { title: 'Clients', path: PATH_DASHBOARD.user.list, icon: ICONS.user },
      { title: 'Devis', path: PATH_DASHBOARD.estimate.list, icon: ICONS.blank },
      { title: 'Factures', path: PATH_DASHBOARD.invoice.list, icon: ICONS.invoice },
      { title: 'Déclarations', path: PATH_DASHBOARD.general.banking, icon: ICONS.folder },
      { title: 'Rendez-vous', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
    ],
  },
];

export default navConfig;
