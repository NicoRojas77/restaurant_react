import { AdminLayout } from "../layouts"
import { UsersAdmin, CategoriesAdmin, ProductAdmin, TableAdmin, OrdersAdmin, TableDetailsAdmin, PaymentsHistory } from "../pages/Admin"

const routesAdmin = [
    {
        path:"/Admin",
        layout: AdminLayout,
        component: OrdersAdmin,
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
    {
        path:"/Admin/Table/:id",
        layout: AdminLayout,
        component: TableDetailsAdmin,
        exact: true

    },
    {
        path:"/Admin/Payments-history",
        layout: AdminLayout,
        component: PaymentsHistory,
        exact: true

    },
];

export default routesAdmin;