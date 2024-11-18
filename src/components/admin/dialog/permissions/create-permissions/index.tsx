import { Box, FormControl, MenuItem, Select, SelectChangeEvent, TextareaAutosize } from "@mui/material";
import { StyleAutocomplete, StyleBoxInput, StyleButton, StyleFormControl, StyleInput, StyleLabel, StyleLineDashed, StyleScrollY, StyleSubtitle, StyleTextareaAutosize, StyleTitle } from "../../../../dialog/style-mui";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SnackbarActions } from "../../../../../redux/snackbar";
import { request } from "../../../../../api/request";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CreatePermissions() {
    const allowed = [
        "Read",
        "Create",
        "Update",
        "Delete"
    ]
    const [roles, setRoles] = useState([
        "Admin",
        "Parient",
        "Doctor",
        "Receptionist"
    ])
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [dataRoles, setDataRoles] = useState<any>([]);
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const dispatch = useDispatch();

    const handleChange = (value: string, num: number) => {
        const fakeRoles = [...dataRoles];
        fakeRoles[num] = { ...fakeRoles[num], name: value };
        setDataRoles(fakeRoles);
    };

    const handleChangePermission = (
        event: React.SyntheticEvent,
        value: unknown,
        reason: string,
        details: any,
        num: number
    ) => {
        const roles = value as string[];
        const fakeRoles = [...dataRoles];
        fakeRoles[num] = { ...fakeRoles[num], method: roles };
        setDataRoles(fakeRoles);
    };

    const handleCreatePermissions = async() => {
        if (!name) {
            dispatch(SnackbarActions.OpenSnackbar(
                {
                    open: true,
                    content: "You must fill in the name field.",
                    state: "warn",
                }))
            return;
        }
        if (!description) {
            dispatch(SnackbarActions.OpenSnackbar(
                {
                    open: true,
                    content: "You must fill in the description field.",
                    state: "warn",
                }))
            return;
        }
        const filteredRoles = dataRoles.filter((role: any) => {
            return role.name.trim() !== "" && role.method.length > 0;
        });
        if (filteredRoles.length === 0) {
            dispatch(SnackbarActions.OpenSnackbar(
                {
                    open: true,
                    content: "You must add at least 1 permission. must choose enough",
                    state: "warn",
                }))
            return;
        }
        const fetch = await request('POST', {
            name: name,
            role: filteredRoles,
            description: description,
        }, 'permissions');
        
        dispatch(SnackbarActions.OpenSnackbar(
            {
                open: true,
                content: "You have successfully created permissions",
                state: "correct",
            }));
        setDataRoles([{
            name: "",
            method: []
        }]);
        setName("");
        setDescription("");
        await request("POST", {
            "channel": "permissions-channel",
            "event": "permissions-created",
            "data": {
                "data": {
                    id: fetch._id,
                    name: fetch.name,
                    role: fetch.role,
                    description: description,
                }
            }
        }, "pusher")
        return;
    }

    useEffect(() => {
        if (dataRoles.length === 0) {
            setDataRoles([{
                name: "",
                method: []
            }]);
        }
    }, []);

    useEffect(() => {
        if (dataRoles.length > 0) {
            const lastRole = dataRoles[dataRoles.length - 1];
            if (lastRole.name && lastRole.method.length > 0) {
                setDataRoles((prevRoles: any) => [
                    ...prevRoles,
                    {
                        name: "",
                        method: []
                    }
                ]);
            }
        }
    }, [dataRoles]);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                gap: '30px',
                
            }}
        >
            <StyleTitle>Add new Permissions</StyleTitle>
            <StyleLineDashed />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    gap: '30px',
                }}
            >
                <StyleScrollY>
                    <StyleSubtitle>Permissons Information</StyleSubtitle>
                    <StyleBoxInput>
                        <StyleLabel>Name</StyleLabel>
                        <StyleInput type="text" placeholder="Function name...." value={name}
                            onChange={(e: any) => { setName(e.target.value) }}
                        />
                    </StyleBoxInput>
                    <StyleBoxInput>
                        <StyleLabel>Roles</StyleLabel>
                        {
                            dataRoles.map((item: any, index: number) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        gap: '30px'
                                    }}
                                >
                                    <StyleBoxInput>
                                        <StyleFormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={item.name}
                                                label="Age"
                                                onChange={(e: any) => {
                                                    handleChange(e.target.value, index)
                                                }}
                                            >
                                                {
                                                    roles.map((role, index) => (
                                                        <MenuItem key={index} value={role}
                                                            sx={{
                                                                display: `${dataRoles.some((rl: any) => rl.name === role) ? "none" : "block"} !important`
                                                            }}
                                                        >{role}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </StyleFormControl>
                                    </StyleBoxInput>
                                    <StyleBoxInput>
                                        <StyleAutocomplete
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={allowed}
                                            disableCloseOnSelect
                                            getOptionLabel={(option: any) => option}
                                            renderOption={(props, option: any, { selected }) => {
                                                const { key, ...optionProps } = props;
                                                return (
                                                    <li key={key} {...optionProps}>
                                                        <Checkbox
                                                            icon={icon}
                                                            checkedIcon={checkedIcon}
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}
                                                        />
                                                        {option}
                                                    </li>
                                                );
                                            }}

                                            onChange={(event: React.SyntheticEvent, value: unknown, reason: string, details: any) => {
                                                handleChangePermission(event, value, reason, details, index);
                                            }}
                                            renderInput={(params: any) => (
                                                <TextField {...params} placeholder="Method" />
                                            )}
                                        />
                                    </StyleBoxInput>
                                </Box>
                            ))
                        }
                    </StyleBoxInput>

                    <StyleBoxInput>
                        <StyleLabel>Description</StyleLabel>
                        <StyleTextareaAutosize minRows={5} value={description}
                            placeholder='Please write a detailed description of the function...'
                            onChange={(e: any) => { setDescription(e.target.value) }}
                        />

                    </StyleBoxInput>
                </StyleScrollY>
            </Box>
            <Box>
                <StyleButton variant="contained" color="success" onClick={handleCreatePermissions}>
                    <span>Create new permission</span>
                </StyleButton>
            </Box>
        </Box>
    );
}