/* eslint-disable prettier/prettier */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard/Pages/Dashboard.tsx';
import Amenities from './Dashboard/Pages/Amenities.tsx';
import Equipments from './Dashboard/Pages/Equipments.tsx';
import Facilities from './Dashboard/Pages/Facilities.tsx';
import { Provider } from 'react-redux';
import { store } from './Dashboard/Redux/store.ts';
import Form from './Dashboard/Pages/Forms.tsx';
import FacilitiesDetails from './Dashboard/Pages/FacilitiesDetails.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import Customer from './Dashboard/Pages/Customer.tsx';
import Payment from './Dashboard/Pages/Payment.tsx';
import MembershipPackages from './Dashboard/Pages/MembershipPackages.tsx';
import Plans from './Dashboard/Pages/Plans.tsx';
import CustomerDeatils from './Dashboard/Pages/CustomerDetails';
import TransactionDetails from './Dashboard/Pages/TransactionDetails.tsx';
import TierManage from './Dashboard/Pages/TierManage.tsx';
import Catagories from './Dashboard/Pages/Catagories.tsx';
import { UserRoles } from './Dashboard/Pages/UserRoles.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/dashbord',
        element: <Dashboard />
      },
      {
        path: '/Facilities',
        element: <Facilities />
      },
      {
        path: '/Facilities/Amenities',
        element: <Amenities />
      },
      {
        path: '/Facilities/Equipments',
        element: <Equipments />
      },
      {
        path: '/Customer',
        element: <Customer />
      },
      {
        path: '/CustomerDetails/:id',
        element: <CustomerDeatils />
      },
      {
        path: '/Payment',
        element: <Payment />
      },
      {
        path: '/TransactionDetails/:id',
        element: <TransactionDetails />
      },
      {
        path: '/Manage/MembershipPackages',
        element: <MembershipPackages />
      },
      {
        path: '/Facilities/FacilitiesDetails/:id',
        element: <FacilitiesDetails />
      },
      {
        path: '/Manage/MembershipPackages/Plans/:id',
        element: <Plans />
      },
      {
        path: 'Facilities/TierManagement',
        element: <TierManage />
      },
      {
        path: '/Facilities/facilityCategories',
        element: <Catagories />
      },
      {
        path:"/Manage/MembershipPackages/UserRoles",
        element:<UserRoles/>
      }
    ]
  },
  {
    path: '/Form',
    element: <Form />
  }
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
