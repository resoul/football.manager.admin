import {
  Boxes,
  ClipboardList,
  LayoutGrid,
  LayoutList,
  Package,
  Settings2,
  UsersRound,
} from 'lucide-react';
import type { MenuConfig } from './types';

export const MENU_SIDEBAR: MenuConfig  = [
  {
    title: 'Dashboards',
    icon: LayoutGrid,
    children: [
      { title: 'Default', path: '/dashboard' },
    ],
  },
  { heading: 'Store Inventory' },
  {
    title: 'Inventory',
    icon: Boxes,
    children: [
      {
        title: 'All Stock',
        path: '/all-stock',
      },
      {
        title: 'Current Stock',
        path: '/current-stock',
      },
      {
        title: 'Inbound Stock',
        path: '/inbound-stock',
      },
      {
        title: 'Outbound Stock',
        path: '/outbound-stock',
      },
      {
        title: 'Stock Planner',
        path: '/stock-planner',
      },
      {
        title: 'Per Product Stock',
        path: '/per-product-stock',
      },
      {
        title: 'Track Shipping',
        path: '/track-shipping',
      },
      {
        title: 'Create Shipping Label',
        path: '/create-shipping-label',
      },
    ],
  },
  {
    title: 'Products',
    icon: Package,
    children: [
      {
        title: 'Product List',
        path: '/product-list',
      },
      {
        title: 'Product Details',
        path: '/product-details',
      },
      { title: 'Create Product', path: '/create-product' },
      {
        title: 'Manage Variants',
        path: '/manage-variants',
      },
      {
        title: 'Edit Product',
        path: '/edit-product',
      },
    ],
  },
  {
    title: 'Categories',
    icon: LayoutList,
    children: [
      {
        title: 'Category List',
        path: '/category-list',
      },
      {
        title: 'Category Details',
        path: '/category-details',
      },
      {
        title: 'Create Category',
        path: '/create-category',
      },
      {
        title: 'Edit Category',
        path: '/edit-category',
      }
    ],
  },
  {
    title: 'Orders',
    icon: ClipboardList,
    children: [
      {
        title: 'Order List',
        path: '/order-list',
      },
      {
        title: 'Order List - Products',
        path: '/order-list-products',
      },
      {
        title: 'Order Details',
        path: '/order-details', 
      },
      {
        title: 'Order Tracking',
        path: '/order-tracking',
      },
    ],
  },
  {
    title: 'People',
    icon: UsersRound,
    children: [
      {
        title: 'Managers',
        path: '/managers',
      },
      {
        title: 'Users',
        path: '/users',
      },
    ],
  },
  {
    title: 'Settings',
    icon: Settings2,
    children: [
      {
        title: 'Settings(Modal View)',
        path: '/settings-modal',
      } 
    ]
  }
];
