import { Box, Checkbox, MenuItem, Select, SelectChangeEvent, TextareaAutosize, TextField } from "@mui/material";
import { StyleAutocomplete, StyleBoxDateTime, StyleBoxInput, StyleButton, StyleFormControl, StyleInput, StyleLabel, StyleLineDashed, StyleScrollY, StyleSubtitle, StyleTextareaAutosize, StyleTitle } from "../../../../dialog/style-mui";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import { SnackbarActions } from "../../../../../redux/snackbar";
import { request } from "../../../../../api/request";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoItem, DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from "@mui/x-date-pickers";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Service {
    name: string,
    description: string,
    sampling: any,
    result: any,
    condition: string,
    numSampleSupport: number,
    room: string[],
}
export default function UpdateService() {
    const rooms = [
        "P.101",
        "P.102",
        "P.103",
        "P.104",
        "P.201",
        "P.202",
        "P.203",
        "P.204",
    ]
    const ids = useSelector((state: any) => state.dialog.showId);
    const [numberTab, setNumberTab] = useState(1);
    const [dataService, setDataService] = useState<Service>({
        name: '',
        description: '',
        sampling: dayjs('00:00:00', 'hh:mm:ss'),
        result: dayjs('00:00:00', 'hh:mm:ss'),
        condition: '',
        numSampleSupport: 0,
        room: [],
    });


    const dispatch = useDispatch();

    const handleChangePermission = (
        event: React.SyntheticEvent,
        value: unknown,
        reason: string,
        details: any,
    ) => {
        const rooms = value as string[];
        setDataService({
            ...dataService,
            room: rooms
        })
    };

    const handleUpdateService = async () => {
        const fetch = await request('PUT', dataService, `services/${ids[numberTab-1]}`);
        dispatch(SnackbarActions.OpenSnackbar(
            {
                open: true,
                content: "You have successfully updated users",
                state: "correct",
            }));
        await request("POST", {
            "channel": "services-channel",
            "event": "services-updated",
            "data": {
                "data": {
                    id: fetch._id,
                    name: dataService.name,
                    numSampleSupport: dataService.numSampleSupport,
                    room: dataService.room
                }
            }
        }, "pusher")
        return;
    }

    const fetch = async () => {
        const data = await request('GET', "", `services/${ids[numberTab-1]}`);
        setDataService(data);
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
                gap: '30px',
                
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <StyleTitle>Details Service</StyleTitle>
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
                dataService && <Box
                    sx={{
                        display: "flex",
                        flexDirection: 'column',
                        gap: '30px',
                    }}
                >
                    <StyleScrollY>
                        <StyleSubtitle>Service Information</StyleSubtitle>
                        <StyleBoxInput>
                            <StyleLabel>Name Service</StyleLabel>
                            <StyleInput type="text" placeholder="Function name...." value={dataService.name}
                                onChange={(e: any) => {
                                    setDataService({
                                        ...dataService,
                                        name: e.target.value
                                    })
                                }}
                            />
                        </StyleBoxInput>
                        <StyleBoxInput>
                            <StyleLabel>Condition</StyleLabel>
                            <StyleInput type="text" placeholder="Function condition...." value={dataService.condition}
                                onChange={(e: any) => {
                                    setDataService({
                                        ...dataService,
                                        condition: e.target.value
                                    })
                                }}
                            />
                        </StyleBoxInput>
                        <StyleBoxDateTime>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <DemoItem>
                                        <StyleBoxInput>
                                            <StyleLabel>sampling time</StyleLabel>
                                            <TimePicker views={['hours', 'minutes', 'seconds']} format="hh:mm:ss" value={dayjs(dataService.sampling)}
                                                onChange={(newValue) => {
                                                    setDataService({
                                                        ...dataService,
                                                        sampling: newValue
                                                    });
                                                }}
                                            />
                                        </StyleBoxInput>
                                        <StyleBoxInput>
                                            <StyleLabel>Result time</StyleLabel>
                                            <TimePicker views={['hours', 'minutes', 'seconds']} format="hh:mm:ss" value={dayjs(dataService.result)}
                                                onChange={(newValue) => {
                                                    setDataService({
                                                        ...dataService,
                                                        result: newValue
                                                    });
                                                }}
                                            />
                                        </StyleBoxInput>
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </StyleBoxDateTime>
                        <Box
                            sx={{
                                display: "flex",
                                gap: '30px'
                            }}
                        >
                            <StyleBoxInput>
                                <StyleLabel>Number Sample Support</StyleLabel>
                                <StyleInput type="number" placeholder="Function name...." value={dataService.numSampleSupport}
                                    onChange={(e: any) => {
                                        setDataService({
                                            ...dataService,
                                            numSampleSupport: e.target.value
                                        })
                                    }}
                                />
                            </StyleBoxInput>
                            <StyleBoxInput>
                                <StyleLabel>Room Clinic</StyleLabel>
                                <StyleAutocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={rooms}
                                    disableCloseOnSelect
                                    value={dataService.room}
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
                                        handleChangePermission(event, value, reason, details);
                                    }}
                                    renderInput={(params: any) => (
                                        <TextField {...params} placeholder="Method" />
                                    )}
                                />
                            </StyleBoxInput>
                        </Box>

                        <StyleBoxInput>
                            <StyleLabel>Description</StyleLabel>
                            <StyleTextareaAutosize minRows={5}
                                placeholder='Please write a detailed description of the function...'
                                value={dataService.description}
                                onChange={(e: any) => {
                                    setDataService({
                                        ...dataService,
                                        description: e.target.value
                                    })
                                }}
                            />
                        </StyleBoxInput>
                    </StyleScrollY>
                </Box>
            }

            <Box>
                <StyleButton variant="contained" color="success" onClick={handleUpdateService}>
                    <span>Details Service</span>
                </StyleButton>
            </Box>
        </Box>
    );
}