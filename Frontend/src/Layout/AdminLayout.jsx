import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
const AdminLayout = () => {
    return (
        <>
            <div className='flex h-[calc(100vh-70px)]'>
                <AdminSidebar />
                <Outlet />
            </div>
        </>
    )
}

export default AdminLayout

