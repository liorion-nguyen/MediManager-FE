import { Box, Checkbox, MenuItem, Select, SelectChangeEvent, TextareaAutosize, TextField } from "@mui/material";
import { StyleAutocomplete, StyleBoxDateTime, StyleBoxInput, StyleButton, StyleFormControl, StyleInput, StyleLabel, StyleLineDashed, StyleScrollY, StyleSubtitle, StyleTextareaAutosize, StyleTitle } from "../../../../dialog/style-mui";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from 'dayjs';
import { SnackbarActions } from "../../../../../redux/snackbar";
import { request } from "../../../../../api/request";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoItem, DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from "@mui/x-date-pickers";

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
export default function CreateService() {
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

    const handleCreateService = async () => {
        const fetch = await request('POST', dataService, 'services');

        dispatch(SnackbarActions.OpenSnackbar(
            {
                open: true,
                content: "You have successfully created services",
                state: "correct",
            }));
        setDataService({
            name: '',
            description: '',
            sampling: dayjs('00:00:00', 'hh:mm:ss'),
            result: dayjs('00:00:00', 'hh:mm:ss'),
            condition: '',
            numSampleSupport: 0,
            room: [],
        })
        await request("POST", {
            "channel": "services-channel",
            "event": "services-created",
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
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                gap: '30px',
                
            }}
        >
            <StyleTitle>Add new Service</StyleTitle>
            <StyleLineDashed />
            <Box
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
                                        <TimePicker views={['hours', 'minutes', 'seconds']} format="hh:mm:ss" value={dataService.sampling}
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
                                        <TimePicker views={['hours', 'minutes', 'seconds']} format="hh:mm:ss" value={dataService.result}
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
            <Box>
                <StyleButton variant="contained" color="success" onClick={handleCreateService}>
                    <span>Create new Service</span>
                </StyleButton>
            </Box>
        </Box>
    );
}