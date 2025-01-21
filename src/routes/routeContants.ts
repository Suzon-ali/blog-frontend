
export type TRoute = {
  name: string;
  path?: string;
  children?: TRoute[];
};

export const adminRoutes: TRoute[] = [
  {
    name: "Dashboard",
    path: "dashboard",
  },
  {
    name: "Data",
    children: [
      {
        name: "All Blogs",
        path: "all-blogs",
      },
      {
        name: "Users",
        path: "all-users",
      },
    ],
  },
];

export default adminRoutes;
