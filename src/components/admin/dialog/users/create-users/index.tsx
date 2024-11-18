import { Box, MenuItem, Select, SelectChangeEvent, TextareaAutosize } from "@mui/material";
import { StyleAutocomplete, StyleBoxDateTime, StyleBoxInput, StyleButton, StyleFormControl, StyleInput, StyleLabel, StyleLineDashed, StyleScrollY, StyleSubtitle, StyleTextareaAutosize, StyleTitle } from "../../../../dialog/style-mui";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SnackbarActions } from "../../../../../redux/snackbar";
import { request } from "../../../../../api/request";
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoItem, DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CreateUser() {
    const [roles, setRoles] = useState([
        "Admin",
        "Parient",
        "Doctor",
        "Receptionist"
    ])
    const [gender, setGender] = useState([
        "Male",
        "Female",
        "Other"
    ])
    const [selectedRoles, setSelectedRoles] = useState<string>("");
    const [fullname, setFullName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [dateOfBirth, setDateOfBirth] = useState<any>("2024-08-07T12:00:00.000Z")
    const [selectedGender, setSelectedGender] = useState<string>("")


    const dispatch = useDispatch();

    const handleCreateUser = async () => {
        let fetch = await request('POST', {
            fullName: fullname,
            username: username,
            password: password,
            email: email,
            phoneNumber: phone,
            gender: selectedGender,
            role: selectedRoles,
            dateOfBirth: dateOfBirth,
        }, 'users');
        fetch = fetch.data
        

        dispatch(SnackbarActions.OpenSnackbar(
            {
                open: true,
                content: "You have successfully created users",
                state: "correct",
            }));
        setFullName("");
        setUsername("");
        setPassword("");
        setEmail("");
        setPhone("");
        setSelectedGender("");
        setSelectedRoles("");
        await request("POST", {
            "channel": "users-channel",
            "event": "users-created",
            "data": {
                "data": {
                    id: fetch._id,
                    fullName: fullname,
                    email: email,
                    phoneNumber: phone,
                    role: selectedRoles,
                    isActive: fetch.isActive
                }
            }
        }, "pusher")
        return;
    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                gap: '30px',
                
            }}
        >
            <StyleTitle>Add new User</StyleTitle>
            <StyleLineDashed />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    gap: '30px',
                }}
            >
                <StyleScrollY>
                    <StyleSubtitle>User Information</StyleSubtitle>
                    <StyleBoxInput>
                        <StyleLabel>Full Name</StyleLabel>
                        <StyleInput type="text" placeholder="Function fullname...." value={fullname}
                            onChange={(e: any) => { setFullName(e.target.value) }}
                        />
                    </StyleBoxInput>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '30px'
                        }}
                    >
                        <StyleBoxInput>
                            <StyleLabel>Username</StyleLabel>
                            <StyleInput type="text" placeholder="Function username...." value={username}
                                onChange={(e: any) => { setUsername(e.target.value) }}
                            />
                        </StyleBoxInput>
                        <StyleBoxInput>
                            <StyleLabel>Password</StyleLabel>
                            <StyleInput type="password" placeholder="Function password...." value={password}
                                onChange={(e: any) => { setPassword(e.target.value) }}
                            />
                        </StyleBoxInput>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '30px'
                        }}
                    >
                        <StyleBoxInput>
                            <StyleLabel>Email</StyleLabel>
                            <StyleInput type="text" placeholder="Function email...." value={email}
                                onChange={(e: any) => { setEmail(e.target.value) }}
                            />
                        </StyleBoxInput>
                        <StyleBoxInput>
                            <StyleLabel>Phone</StyleLabel>
                            <StyleInput type="text" placeholder="Function phone...." value={phone}
                                onChange={(e: any) => { setPhone(e.target.value) }}
                            />
                        </StyleBoxInput>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '30px'
                        }}
                    >
                        <StyleBoxInput>
                            <StyleLabel>Roles</StyleLabel>
                            <StyleBoxInput>
                                <StyleFormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedRoles}
                                        label="Age"
                                        onChange={(e: any) => {
                                            setSelectedRoles(e.target.value)
                                        }}
                                    >
                                        {
                                            roles.map((role, index) => (
                                                <MenuItem key={index} value={role}>{role}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </StyleFormControl>
                            </StyleBoxInput>
                        </StyleBoxInput>
                        <StyleBoxInput>
                            <StyleLabel>Gender</StyleLabel>
                            <StyleBoxInput>
                                <StyleFormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedGender}
                                        label="Age"
                                        onChange={(e: any) => {
                                            setSelectedGender(e.target.value)
                                        }}
                                    >
                                        {
                                            gender.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </StyleFormControl>
                            </StyleBoxInput>
                        </StyleBoxInput>
                    </Box>
                    <StyleBoxDateTime>
                        <StyleLabel>Date Of Birth</StyleLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'MobileDatePicker',
                                ]}
                            >
                                <DemoItem>
                                    <MobileDatePicker defaultValue={dayjs(dateOfBirth)} 
                                         onChange={(newValue) => {
                                            setDateOfBirth(newValue); 
                                        }}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </StyleBoxDateTime>
                </StyleScrollY>
            </Box>
            <Box>
                <StyleButton variant="contained" color="success" onClick={handleCreateUser}>
                    <span>Create new user</span>
                </StyleButton>
            </Box>
        </Box>
    );
}