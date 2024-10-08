import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import DashBoard from "../../components/admin/page/dashboard";
import SideBar from "../../components/admin/sidebar";
import Header from "../../components/admin/header";
import Permissions from "../../components/admin/page/permissions";
import Users from "../../components/admin/page/users";
import Services from "../../components/admin/page/services";
export default function Admin() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    return (
        <Box
            sx={{
                backgroundColor: '#1B1C31',
                width: '-webkit-fill-available',
                height: '100vh',
                display: 'flex',
                maxWidth: '100vw',
                overflowY: 'hidden'
            }}
        >
            <SideBar />
            <Box
                sx={{
                    width: '-webkit-fill-available',
                    height: '-webkit-fill-available',
                    padding: '20px'
                }}
            >
                <Header />
                {(path == undefined || path == "" || path == "dashboard") && <DashBoard />}
                {path == "permissions" && <Permissions />}
                {path == "users" && <Users />}
                {path == "services" && <Services />}
            </Box>
        </Box>
    );
}