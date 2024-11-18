import { Box, Button, TextField } from "@mui/material";
import AuthOther from "../other";
import { StyleBoxForm, StyleButton, StyleForfotPassword, StyleTextField } from "../style-mui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogActions } from "../../../redux/dialog";
import ForgotPassword from "../forgot-password";
import { SnackbarActions } from "../../../redux/snackbar";
import { request } from "../../../api/request";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation();
    const handleClickOpen = () => {
        dispatch(DialogActions.setForgotPassword(true))
    };
    const handleLogin = async () => {
        const data = {
            username: username,
            password: password
        };
        const fetch = await request("POST", data, "auth/login");
        if (!fetch) {
            dispatch(SnackbarActions.OpenSnackbar(
                {
                    open: true,
                    content: fetch.description,
                    state: "error",
                }))
        } else if (fetch) {
            Cookies.set('accessToken', fetch.data.accessToken, { expires: 3 / 288, path: '/' });
            Cookies.set('refreshToken', fetch.data.refreshToken, { expires: 7, path: '/' });
            dispatch(SnackbarActions.OpenSnackbar(
                {
                    open: true,
                    content: fetch.description,
                    state: "succes",
                }))
            
            fetch.data.role === "Admin" ? navigate(`/admin`) : navigate(`/`);
        }
    }
    return (
        <StyleBoxForm>
            <StyleTextField label={t("Email or username")} variant="standard" value={username} onChange={(e: any) => { setUsername(e.target.value) }} />
            <StyleTextField label={t("Password")} type="password" variant="standard" value={password} onChange={(e: any) => { setPassword(e.target.value) }} />
            <StyleButton variant="contained" onClick={handleLogin}>{t('Sign In')}</StyleButton>
            <StyleForfotPassword onClick={handleClickOpen}>{t('Forgot password?')}</StyleForfotPassword>
            <AuthOther />
            <ForgotPassword />
        </StyleBoxForm>
    )
}