import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-2.jpg';
import img3 from 'src/assets/images/profile/user-3.jpg';
import img4 from 'src/assets/images/profile/user-4.jpg';

import icon1 from 'src/assets/images/svgs/icon-account.svg';
import icon2 from 'src/assets/images/svgs/icon-inbox.svg';
import icon3 from 'src/assets/images/svgs/icon-tasks.svg';

import ddIcon1 from 'src/assets/images/svgs/icon-dd-chat.svg';
import ddIcon2 from 'src/assets/images/svgs/icon-dd-cart.svg';
import ddIcon3 from 'src/assets/images/svgs/icon-dd-invoice.svg';
import ddIcon4 from 'src/assets/images/svgs/icon-dd-date.svg';
import ddIcon5 from 'src/assets/images/svgs/icon-dd-mobile.svg';
import ddIcon6 from 'src/assets/images/svgs/icon-dd-lifebuoy.svg';
import ddIcon7 from 'src/assets/images/svgs/icon-dd-message-box.svg';
import ddIcon8 from 'src/assets/images/svgs/icon-dd-application.svg';

//
// Profile dropdown
//
const profile = [
  {
    href: '/user-profile',
    title: 'My Profile',
    subtitle: 'Account Settings',
    icon: icon1,
  },
  {
    href: '/apps/email',
    title: 'My Inbox',
    subtitle: 'Messages & Emails',
    icon: icon2,
  },
  {
    href: '/apps/notes',
    title: 'My Tasks',
    subtitle: 'To-do and Daily Tasks',
    icon: icon3,
  },
];

// apps dropdown

const appsLink = [
  {
    href: '/apps/chats',
    title: 'Chat Application',
    subtext: 'Messages & Emails',
    avatar: ddIcon1,
  },
  {
    href: '/apps/ecommerce/shop',
    title: 'eCommerce App',
    subtext: 'Messages & Emails',
    avatar: ddIcon2,
  },
  {
    href: '/apps/invoice/list',
    title: 'Invoice App',
    subtext: 'Messages & Emails',
    avatar: ddIcon3,
  },
  {
    href: '/apps/calendar',
    title: 'Calendar App',
    subtext: 'Messages & Emails',
    avatar: ddIcon4,
  },
  {
    href: '/apps/contacts',
    title: 'Contact Application',
    subtext: 'Account settings',
    avatar: ddIcon5,
  },
  {
    href: '/apps/tickets',
    title: 'Tickets App',
    subtext: 'Account settings',
    avatar: ddIcon6,
  },
  {
    href: '/apps/email',
    title: 'Email App',
    subtext: 'To-do and Daily tasks',
    avatar: ddIcon7,
  },
  {
    href: '/dashboards/ecommerce',
    title: 'Ecom Dashboard ',
    subtext: 'Data-genic Dashbaords',
    avatar: ddIcon8,
  },
];

const pageLinks = [
  {
    href: '/pricing',
    title: 'Pricing Page',
  },
  {
    href: '/auth/login',
    title: 'Authentication Design',
  },
  {
    href: '/auth/register',
    title: 'Register Now',
  },
  {
    href: '/404',
    title: '404 Error Page',
  },
  {
    href: '/apps/notes',
    title: 'Notes App',
  },
  {
    href: '/user-profile',
    title: 'User Application',
  },
  {
    href: '/frontend-pages/blog/',
    title: 'Blog Design',
  },
  {
    href: '/apps/ecommerce/eco-checkout',
    title: 'Shopping Cart',
  },
];

// Initialize notifications as an empty array
let notifications = [];

// Fetch data from API and update notifications
async function fetchNotifications() {
  const response = await fetch('http://localhost:5000/api/getlowstock');
  const data = await response.json();

  // Map the API response to the notifications format
  notifications = data.map((product, index) => ({
    avatar: [img1, img2, img3, img4][index % 4], // Cycle through avatars
    title: product.name,
    subtitle: `Stock Level: ${product.stock_level}`,
  }));

  // After fetching the data, you can now use the notifications array
  console.log('Updated Notifications:', notifications);
}

// Call fetchNotifications function to populate notifications
fetchNotifications();

// Export notifications after they are populated
export { notifications, profile, pageLinks, appsLink };
