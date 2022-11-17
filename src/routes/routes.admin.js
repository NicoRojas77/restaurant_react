import { AdminLayout } from "../layouts"
import { HomeAdmin, UsersAdmin, CategoriesAdmin } from "../pages/Admin"

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

];

export default routesAdmin;