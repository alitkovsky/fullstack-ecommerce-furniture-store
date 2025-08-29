export interface NavMenuItemType {
  item: string;
  path: string;
}

export interface AdminNavItem {
  item: string;
  path: string;
}

export const mainNavMenu: NavMenuItemType[] = [
  {
    item: "Home",
    path: "/"
  },
  {
    item: "Shop",
    path: "/shop"
  },
  {
    item: "Blog",
    path: "/blog"
  },
  {
    item: "Contact",
    path: "/contact"
  }
];

export const adminNavMenu: AdminNavItem[] = [
  {
    item: "Dashboard",
    path: "/admin"
  },
  {
    item: "Products",
    path: "/admin/products"
  },
  {
    item: "Orders",
    path: "/admin/orders"
  },
  {
    item: "Users",
    path: "/admin/users"
  },
  {
    item: "Collections",
    path: "/admin/collections"
  }
];

// Customer navigation for authenticated users
export const customerNavMenu: NavMenuItemType[] = [
  {
    item: "My Account",
    path: "/account"
  },
  {
    item: "Orders",
    path: "/account#orders"
  },
  {
    item: "Wishlist",
    path: "/wishlist"
  }
];

// Helper function to check if current path is admin
export const isAdminRoute = (pathname: string): boolean => {
  return pathname.startsWith('/admin');
};

// Helper function to check if admin nav item is active
export const isAdminNavActive = (path: string, pathname: string): boolean => {
  if (path === "/admin") {
    return pathname === "/admin";
  }
  return pathname.startsWith(path);
};
