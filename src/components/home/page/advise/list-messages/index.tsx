import { StyleInpSearch, StyleListSearch } from "../style-mui";
import { StyleColumnGap20, StyleColumnGap5, StyleDetailChat, StyleExtraAvater, StyleExtraLi, StyleExtraName, StyleExtraTitle, StyleIconLogo, StyleNewChat, StyleRowGap10, StyleSearchChat } from "../style-mui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Skeleton } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { MessageActions } from "../../../../../redux/advise";
import { request } from "../../../../../api/request";

type UserData = {
    id: string;
    fullName: string;
    avatar: any;
};

export default function ChatAiExtra() {
    const dispatch = useDispatch();
    const [boxChat, setBoxChat] = useState<any>(null);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataSearch, setDataSearch] = useState<UserData[]>([]);
    const user = useSelector((state: any) => state.user.user);
    const idBoxChat = useSelector((state: any) => state.message.choose);
    useEffect(() => {
        if (!user) return;
        const fetchData = async (id: string) => {
            try {
                const dataInfo = await request("GET", "", `BoxChat/user/${id}`);
                let dataFake: any[] = [];

                await Promise.all(dataInfo.map(async (item: any) => {
                    if (item.contactUser && item.contactUser.length === 2) {
                        await Promise.all(item.contactUser.map(async (user: any) => {
                            if (user.userId !== id) {
                                const profileImage = await request("GET", "", `users/profileImage/${user.userId}`);
                                dataFake.push({
                                    ...item,
                                    name: user.nickName,
                                    profileImage: profileImage
                                });
                            }
                        }));
                    }
                }));
                setBoxChat(dataFake);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (user) {
            fetchData(user._id);
        }
    }, [user, idBoxChat])

    const handleClick = async (box: any) => {
        dispatch(MessageActions.SetChoose({
            ...box,
            profileImage: box.profileImage
        }));
    }

    const handleNewchat = () => {
        dispatch(MessageActions.SetChoose(null))
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(search);
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            handleSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const handleSearch = (content: string) => {
        const fetch = async () => {
            const data = await request("GET", "", `users/search?page=1&show=10&search=${content}`);
            const filteredUsers = data.data.filter((item: any) => item._id !== user._id);
            setDataSearch(filteredUsers);
            setLoading(false);
        }
        if (content != "") {
            setLoading(true);
            fetch();
        }
    }

    const handleCheckBoxChat = (id: string) => {
        const fetch = async () => {
            const data = await request("GET", "", `BoxChat/checkBox?id1=${user._id}&id2=${id}`);
            dispatch(MessageActions.SetChoose(data));
            setSearch('');
        }
        fetch();
    }
    return (
        <StyleDetailChat>
            <StyleColumnGap20>
                <StyleExtraTitle>Đoạn chat</StyleExtraTitle>
                <StyleSearchChat className="search">
                    <img src="/Images/home/message/icon_search.svg" />
                    <StyleInpSearch type="text" placeholder="Search..." value={search} onChange={(e: any) => { setSearch(e.target.value); if (e.target.value == "") setDataSearch([]) }} />
                    {search &&
                        <StyleListSearch>
                            {
                                loading ? (
                                    <CircularProgress />
                                ) : (
                                    dataSearch && Array.isArray(dataSearch) && dataSearch.length > 0 ? (
                                        dataSearch.map((data: any, index: number) => (
                                            <StyleExtraLi key={index} onClick={() => handleCheckBoxChat(data._id)}>
                                                <StyleRowGap10>
                                                    <StyleExtraAvater src={data.profileImage ? data.profileImage : "/Images/admin/header/profile.svg"} />
                                                    <StyleColumnGap5>
                                                        <StyleExtraName>{data.fullName}</StyleExtraName>
                                                    </StyleColumnGap5>
                                                </StyleRowGap10>
                                            </StyleExtraLi>
                                        ))
                                    ) : (
                                        <p>No results were found!</p>
                                    )
                                )
                            }
                            <Button variant="outlined" onClick={() => setSearch("")}>Close</Button>
                        </StyleListSearch>}
                </StyleSearchChat>
                <ul>
                    {boxChat && Array.isArray(boxChat) ? (
                        boxChat.map((box: any, index: number) => (
                            <StyleExtraLi key={index} onClick={() => handleClick(box)}
                                sx={{
                                    background: idBoxChat && idBoxChat._id === box._id ? "#e5e3e3" : "",
                                    borderRadius: '8px'
                                }}
                            >
                                <StyleRowGap10>
                                    <StyleExtraAvater src={box.profileImage ? box.profileImage : "/Images/admin/header/profile.svg"} />
                                    <StyleColumnGap5>
                                        <StyleExtraName>{box.name}</StyleExtraName>
                                        {/* <StyleExtraContent>You: {box.message} {box.time}</StyleExtraContent> */}
                                    </StyleColumnGap5>
                                </StyleRowGap10>
                            </StyleExtraLi>
                        ))
                    ) : (
                        Array.from({ length: 3 }).map((_, index) => (
                            <StyleExtraLi key={index}>
                                <StyleRowGap10>
                                    <Skeleton variant="circular" width={50} height={50} />
                                    <Skeleton width={300} height={50} />
                                </StyleRowGap10>
                            </StyleExtraLi>
                        ))
                    )}
                </ul>
            </StyleColumnGap20>
            <StyleNewChat
                onClick={handleNewchat}
            >
                <StyleRowGap10>
                    <StyleIconLogo src="/Images/home/message/icon_logo.png" />
                    <StyleExtraName>New chat</StyleExtraName>
                </StyleRowGap10>
                <EditNoteIcon />
            </StyleNewChat>
        </StyleDetailChat>
    );
}