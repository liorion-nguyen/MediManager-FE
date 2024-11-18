import { Box, MenuItem, Select, TextareaAutosize } from "@mui/material";
import { StyleAutocomplete, StyleBoxInput, StyleButton, StyleFormControl, StyleInput, StyleLabel, StyleLineDashed, StyleScrollY, StyleSubtitle, StyleTextareaAutosize, StyleTitle } from "../../../../dialog/style-mui";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { request } from "../../../../../api/request";
import { SnackbarActions } from "../../../../../redux/snackbar";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function UpdatePermissions() {
    const roles = [
        "Admin",
        "Parient",
        "Doctor",
        "Receptionist"
    ]
    const allowed = [
        "Read",
        "Create",
        "Update",
        "Delete"
    ]
    const ids = useSelector((state: any) => state.dialog.showId);
    const [numberTab, setNumberTab] = useState(1);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [dataRoles, setDataRoles] = useState<any>([]);
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [createdAt, setCreatedAt] = useState<string>("")
    const [updatedAt, setUpdatedAt] = useState<string>("")

    const dispatch = useDispatch();
    const fetch = async () => {
        const data = await request('GET', "", `permissions/${ids[numberTab-1]}`)
        setName(data.name);
        setDescription(data.description);
        setDataRoles(data.role);
        setCreatedAt(data.createdAt);
        setUpdatedAt(data.updatedAt);
    }


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

    const handleUpdatePermissions = async () => {
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

        const fetch = await request('PUT', {
            name: name,
            role: filteredRoles,
            description: description,
        }, `permissions/${ids[numberTab-1]}`);

        dispatch(SnackbarActions.OpenSnackbar(
            {
                open: true,
                content: "You have successfully updated permissions",
                state: "correct",
            })); 
        await request("POST", {
            "channel": "permissions-channel",
            "event": "permissions-updated",
            "data": {
                "data": {
                    id: ids[numberTab-1],
                    name: name,
                    role: filteredRoles,
                    description: description,
                }
            }
        }, "pusher")
        return;
    }

    const handleDeletePermissions = async () => {
        const fetch = await request('DELETE', "", `permissions/${ids[numberTab-1]}`);
        dispatch(SnackbarActions.OpenSnackbar(
            {
                open: true,
                content: "You have successfully delete permissions",
                state: "correct",
            }));
        return;
    }

    const handleNext = () => {
        if (numberTab === ids.length) {
            setNumberTab(1);
        } else {
            setNumberTab((pre) => pre + 1);
        }
    }

    const handlePervious = () => {
        if (numberTab === 1) {
            setNumberTab(ids.length);
        } else {
            setNumberTab((pre) => pre - 1);
        }
    }


    useEffect(() => {
        if (ids) {
            fetch();
        }
    }, [ids, numberTab])


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                gap: '30px'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <StyleTitle>Details Permissions</StyleTitle>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <SkipPreviousIcon
                        onClick={handlePervious}
                    />
                    <p>{numberTab}</p>
                    <SkipNextIcon
                        onClick={handleNext}
                    />
                </Box>
            </Box>
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
                        <StyleLabel>ID</StyleLabel>
                        <StyleInput type="text" placeholder="ID..."
                            value={ids[numberTab-1]}
                        />
                    </StyleBoxInput>
                    <StyleBoxInput>
                        <StyleLabel>Name</StyleLabel>
                        <StyleInput type="text" placeholder="Function name...."
                            value={name}
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
                                            value={item.method}
                                            getOptionLabel={(option: any) => option}
                                            renderOption={(props: any, option: any, { selected }: any) => {
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
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '30px'
                        }}
                    >
                        <StyleBoxInput>
                            <StyleLabel>CreatedAt</StyleLabel>
                            <StyleInput type="text" placeholder="Creation time..."
                                value={createdAt}
                            />
                        </StyleBoxInput>
                        <StyleBoxInput>
                            <StyleLabel>UpdatedAt</StyleLabel>
                            <StyleInput type="text" placeholder="Update time...."
                                value={updatedAt}
                            />
                        </StyleBoxInput>
                    </Box>
                    <StyleBoxInput>
                        <StyleLabel>Description</StyleLabel>
                        <StyleTextareaAutosize minRows={5}
                            value={description}
                            placeholder='Please write a detailed description of the function...'
                            onChange={(e: any) => { setDescription(e.target.value) }}
                        />

                    </StyleBoxInput>
                    <StyleBoxInput>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeletePermissions}>
                            Delete
                        </Button>
                    </StyleBoxInput>
                </StyleScrollY>
            </Box>
            <Box>
                <StyleButton variant="contained" color="success" onClick={handleUpdatePermissions}>
                    <span>Update Permission</span>
                </StyleButton>
            </Box>
        </Box>
    );
}