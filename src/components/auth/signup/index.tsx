import AuthOther from "../other";
import { StyleBoxForm, StyleButton, StyleForfotPassword, StyleTextField } from "../style-mui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { request } from "../../../api/request";
import { useState } from "react";
import { SnackbarActions } from "../../../redux/snackbar";
import { useDispatch } from "react-redux";

export default function SignUp() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handlePagechange = () => {
        navigate(`/auth?page=signin`);
    }
    const dispatch = useDispatch();
    const handleSignUp = async () => {
        const data = {
            fullName: fullName,
            email: email,
            username: username,
            password: password,
            role: "Patient"
        };
        const fetch = await request("POST", data, "users");
        if (!fetch) {
            dispatch(SnackbarActions.OpenSnackbar(
                {
                    open: true,
                    content: fetch.description,
                    state: "error",
                }))
        } else if (fetch) {
            dispatch(SnackbarActions.OpenSnackbar(
                {
                    open: true,
                    content: fetch.description,
                    state: "succes",
                }))
        }
        navigate(`/auth?page=signin`);
    }
    return (
        <StyleBoxForm>
            <StyleTextField label={t("Full Name")} variant="standard" onChange={(e) => setFullName(e.target.value)} />
            <StyleTextField label={t("Username")} variant="standard" onChange={(e) => setUsername(e.target.value)} />
            <StyleTextField label={t("Email")} variant="standard" onChange={(e) => setEmail(e.target.value)} />
            <StyleTextField label={t("Password")} type="password" variant="standard" onChange={(e) => setPassword(e.target.value)} />
            <StyleButton variant="contained" onClick={handleSignUp}>{t('Sign Up')}</StyleButton>
            <StyleForfotPassword onClick={handlePagechange}>{t('I have an Account?')}</StyleForfotPassword>
            <AuthOther />
        </StyleBoxForm>
    )
}