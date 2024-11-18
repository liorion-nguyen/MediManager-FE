import { Box, Button, MenuItem, Select, SelectChangeEvent, TextareaAutosize } from "@mui/material";
import { StyleAutocomplete, StyleBoxInput, StyleButton, StyleFormControl, StyleInput, StyleLabel, StyleLineDashed, StyleScrollY, StyleSubtitle, StyleTextareaAutosize, StyleTitle } from "../../../../dialog/style-mui";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarActions } from "../../../../../redux/snackbar";
import { request } from "../../../../../api/request";
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoItem, DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import Resizer from 'react-image-file-resizer';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function UpdateUser() {
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
    const ids = useSelector((state: any) => state.dialog.showId);
    const [numberTab, setNumberTab] = useState(1);

    const [dataUser, setDataUser] = useState<any>();
    const [imgProfile, setImgProfile] = useState<any>();

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();

    const handleUpdateUser = async () => {
        if (imgProfile) {
            const maxSizeInMB = 0.5;
            let fileToUpload = imgProfile;

            if (fileToUpload.size / 1024 / 1024 > maxSizeInMB) {
                try {
                    fileToUpload = await resizeImage(fileToUpload);
                } catch (error) {
                    console.error('Error resizing image:', error);
                    return;
                }
            }
            const formData = new FormData();
            formData.append('file', fileToUpload);
            if (dataUser.profileImage) {
                await request("DELETE", { "imageUrl": dataUser.profileImage }, "firebase/delete");
                console.log(dataUser.profileImage);
                
            }
            const fetch = await request("POST", formData, "firebase/upload");
            if (fetch.imageUrl) {
                dispatch(SnackbarActions.OpenSnackbar(
                    {
                        open: true,
                        content: "Image uploaded successfully.",
                        state: "correct",
                    }
                ));

                const updateUser = await request("PUT", {
                    ...dataUser,
                    profileImage: `https://firebasestorage.googleapis.com/v0/b/medimanager-liorion.appspot.com/o/${fetch.imageUrl}?alt=media`
                }, `users/${dataUser._id}`);
                setDataUser({
                    ...dataUser,
                    profileImage: fetch.imageUrl
                })
            } else {
                console.error('Failed to upload image');
            }
        } else {
            const updateUser = await request("PUT", {
                ...dataUser
            }, `users/${dataUser._id}`);
            setDataUser({
                ...dataUser
            })
        }

        dispatch(SnackbarActions.OpenSnackbar(
            {
                open: true,
                content: "You have successfully updated users",
                state: "correct",
            }));
        await request("POST", {
            "channel": "users-channel",
            "event": "users-updated",
            "data": {
                "data": {
                    id: dataUser._id,
                    cccdNumber: dataUser.cccdNumber,
                    fullName: dataUser.fullName,
                    email: dataUser.email,
                    role: dataUser.role,
                    isActive: dataUser.isActive
                }
            }
        }, "pusher")
        return;
    }

    const fetch = async () => {
        const data = await request('GET', "", `users/${ids[numberTab - 1]}`);
        setDataUser(data);
    }


    const handleIconClick = () => {
        fileInputRef?.current?.click();
    };

    const resizeImage = (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            Resizer.imageFileResizer(
                file,
                800,
                800,
                'JPEG',
                80,
                0,
                (uri: any) => {
                    resolve(uri);
                },
                'file'
            );
        });
    };

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (!file) return;
        setImgProfile(file);
    };

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
                gap: '30px',
                
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <StyleTitle>Details User</StyleTitle>
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
            {
                dataUser && <Box
                    sx={{
                        display: "flex",
                        flexDirection: 'column',
                        gap: '30px',
                    }}
                >
                    <StyleScrollY>
                        <StyleSubtitle>User Information</StyleSubtitle>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    height: '200px',
                                    width: '200px',
                                    position: 'relative',
                                }}
                            >
                                <img src={imgProfile ? URL.createObjectURL(imgProfile) : (dataUser.profileImage ? dataUser.profileImage : "/Images/admin/header/profile.svg")}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        boxShadow: dataUser.profileImage ? "#7b7b7b91 0 0 5px 5px" : '',
                                        objectFit: 'cover'
                                    }}
                                />
                                <CameraEnhanceIcon
                                    sx={{
                                        position: 'absolute',
                                        bottom: '10%',
                                        right: '10%',
                                        fontSize: '35px',
                                        opacity: '0.7',
                                        ":hover": {
                                            opacity: '0.9',
                                            cursor: 'pointer'
                                        }
                                    }}
                                    onClick={handleIconClick}
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </Box>
                        </Box>
                        <StyleBoxInput>
                            <StyleLabel>ID</StyleLabel>
                            <StyleInput type="text" value={dataUser._id} />
                        </StyleBoxInput>
                        <StyleBoxInput>
                            <StyleLabel>CCCD Number</StyleLabel>
                            <StyleInput type="text" placeholder="No CCCD information yet" value={dataUser.cccdNumber} onChange={(e: any) => {
                                setDataUser({
                                    ...dataUser,
                                    cccdNumber: e.target.value
                                })
                            }} />
                        </StyleBoxInput>
                        <StyleBoxInput>
                            <StyleLabel>Insurance Number</StyleLabel>
                            <StyleInput type="text" placeholder="No Insurance Number information yet" value={dataUser.insuranceNumber} onChange={(e: any) => {
                                setDataUser({
                                    ...dataUser,
                                    insuranceNumber: e.target.value
                                })
                            }} />
                        </StyleBoxInput>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '30px'
                            }}
                        >
                            <StyleBoxInput>
                                <StyleLabel>Full Name</StyleLabel>
                                <StyleInput type="text" placeholder="Function fullname...." value={dataUser.fullName}
                                    onChange={(e: any) => {
                                        setDataUser({
                                            ...dataUser,
                                            fullName: e.target.value
                                        })
                                    }}
                                />
                            </StyleBoxInput>
                            <StyleBoxInput>
                                <StyleLabel>Username</StyleLabel>
                                <StyleInput type="text" placeholder="Function username...." value={dataUser.username}
                                    onChange={(e: any) => {
                                        setDataUser({
                                            ...dataUser,
                                            username: e.target.value
                                        })
                                    }}
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
                                <StyleInput type="text" placeholder="Function email...." value={dataUser.email}
                                    onChange={(e: any) => {
                                        setDataUser({
                                            ...dataUser,
                                            email: e.target.value
                                        })
                                    }}
                                />
                            </StyleBoxInput>
                            <StyleBoxInput>
                                <StyleLabel>Phone</StyleLabel>
                                <StyleInput type="text" placeholder="Function phone...." value={dataUser.phoneNumber}
                                    onChange={(e: any) => {
                                        setDataUser({
                                            ...dataUser,
                                            phoneNumber: e.target.value
                                        })
                                    }}
                                />
                            </StyleBoxInput>
                        </Box>
                        <StyleBoxInput>
                            <StyleLabel>Address</StyleLabel>
                            <StyleInput type="text" placeholder="No address information yet" value={dataUser.address} onChange={(e: any) => {
                                setDataUser({
                                    ...dataUser,
                                    address: e.target.value
                                })
                            }} />
                        </StyleBoxInput>
                        <StyleBoxInput>
                            <StyleLabel>Emergency Contact</StyleLabel>
                            <StyleInput type="text" placeholder="No Emergency Contact information yet" value={dataUser.emergencyContact} onChange={(e: any) => {
                                setDataUser({
                                    ...dataUser,
                                    emergencyContact: e.target.value
                                })
                            }} />
                        </StyleBoxInput>
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
                                            value={dataUser.role}
                                            onChange={(e: any) => {
                                                setDataUser({
                                                    ...dataUser,
                                                    role: e.target.value
                                                })
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
                                            value={dataUser.gender}
                                            onChange={(e: any) => {
                                                setDataUser({
                                                    ...dataUser,
                                                    gender: e.target.value
                                                })
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
                        <StyleBoxInput
                            sx={{
                                ".MuiStack-root": {
                                    width: '100% !important',
                                    paddingTop: '0 !important'
                                }
                            }}
                        >
                            <StyleLabel>Date Of Birth</StyleLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    sx={{
                                        "fieldset": {
                                            border: '0'
                                        },
                                        ".MuiInputBase-root": {
                                            background: '#222338',
                                            color: '#626D7D',
                                        }
                                    }}
                                    components={[
                                        'MobileDatePicker',
                                    ]}
                                >
                                    <DemoItem>
                                        <MobileDatePicker
                                            value={dayjs(dataUser.dateOfBirth)}
                                            onChange={(newValue) => {
                                                setDataUser({
                                                    ...dataUser,
                                                    dateOfBirth: newValue
                                                });
                                            }}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </StyleBoxInput>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '30px'
                            }}
                        >
                            <StyleBoxInput>
                                <StyleLabel>CreatedAt</StyleLabel>
                                <StyleInput type="text" value={dataUser.createdAt} />
                            </StyleBoxInput>
                            <StyleBoxInput>
                                <StyleLabel>UpdatedAt</StyleLabel>
                                <StyleInput type="text" value={dataUser.updatedAt} />
                            </StyleBoxInput>
                        </Box>
                        <StyleBoxInput>
                            <Button variant="contained" color={dataUser.isActive ? "success" : "error"}
                                sx={{
                                    height: '48px'
                                }}
                                onClick={() => {
                                    setDataUser({
                                        ...dataUser,
                                        isActive: !dataUser.isActive
                                    });
                                }}
                            >
                                {dataUser.isActive ? "active" : "inactive"}
                            </Button>
                        </StyleBoxInput>
                    </StyleScrollY>
                </Box>
            }

            <Box>
                <StyleButton variant="contained" color="success" onClick={handleUpdateUser}>
                    <span>Update new user</span>
                </StyleButton>
            </Box>
        </Box>
    );
}