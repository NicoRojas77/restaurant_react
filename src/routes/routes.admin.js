import { AdminLayout } from "../layouts"
import { HomeAdmin, UsersAdmin, CategoriesAdmin, ProductAdmin, TableAdmin } from "../pages/Admin"

const routesAdmin = [
    {
        path:"/Admin",
        layout: AdminLayout,
        component: HomeAdmin,
        exact: true

    },
    {
        path:"/Admin/Users",
        layout: AdminLayout,
        component: UsersAdmin,
        exact: true

    },
    {
        path:"/Admin/Categories",
        layout: AdminLayout,
        component: CategoriesAdmin,
        exact: true

    },
    {
        path:"/Admin/Products",
        layout: AdminLayout,
        component: ProductAdmin,
        exact: true

    },
    {
        path:"/Admin/Tables",
        layout: AdminLayout,
        component: TableAdmin,
        exact: true

    },
];

export default routesAdmin;