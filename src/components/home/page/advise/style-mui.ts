import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Grid, Menu, Popover, TextareaAutosize } from '@mui/material';
import { keyframes, styled as muiStyled } from '@mui/system';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';

export const StyleBoxRow = muiStyled(Box)(({ theme }) => ({
    display: "flex",
}));

export const StyleBoxColumn = muiStyled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column"
}));

export const StyleRowGap20 = muiStyled(StyleBoxRow)(({ theme }) => ({
    gap: '20px',
    alignItems: 'center'
}));

export const StyleRowGap5 = muiStyled(StyleBoxRow)(({ theme }) => ({
    gap: '5px',
    alignItems: 'center'
}));

export const BoxContainerColMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const BoxMessageMui = muiStyled(BoxContainerColMui)(({ theme }) => ({
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    width: '-webkit-fill-available',
    height: '-webkit-fill-available',
}));

export const FeatureMessMui = muiStyled(Box)(({ theme }) => ({
    padding: '10px 20px',
    width: '-webkit-fill-available',
    position: 'relative',
    background: "white",
    height: '90px',
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    alignItems: 'center'
}));

export const ContentMessageMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowX: 'hidden',
    overflowY: 'scroll',
    background: 'white',
    width: '-webkit-fill-available',
    padding: '40px 10px 10px 30px',
    gap: '10px',
    height: '-webkit-fill-available',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#c4c4c4',
        borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#a0a0a0',
    },
}));

export const FullNameMui = muiStyled(BoxContainerColMui)(({ theme }) => ({
    fontSize: '15px',
    fontWeight: '600',
}));

export const UserActiveMui = muiStyled(BoxContainerColMui)(({ theme }) => ({
    fontSize: '13px',
    fontWeight: '400',
    color: '#41bf0c'
}));

export const TitleMessageMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 'auto'
}));

export const StyleBtnHidden = muiStyled('button')(({ theme }) => ({
    border: '0',
    background: 'transparent'
}));

export const ListIconMessMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    width: 'auto !important',
    right: '0',
    float: 'left',
    gap: '10px'
}));

export const ListIconMessMui2 = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
}));

export const StyleMuiBtnIcon = muiStyled(Button)(({ theme }) => ({
    'span': {
        marginLeft: '0',
        marginRight: '0',
    },
    padding: '0',
    minWidth: 'auto'
}));

export const ListIconCallMessMui = muiStyled(ListIconMessMui)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    right: '0',
    float: 'left',
    gap: '10px',
    justifyContent: 'space-between'
}));

export const StyleBoxTitleMess = muiStyled(Box)(({ theme }) => ({
    display: "flex",
    gap: '10px',
    width: '100%',
    justifyContent: 'space-between',
    padding: "0 20px",
    alignItems: 'center',
}));

export const TextareaAutosizeMui = muiStyled(TextareaAutosize)(({ theme }) => ({
    resize: 'none',
    lineHeight: '20px',
    width: 'calc(100% - 100px) !important',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: "0 10px",
    fontSize: '16px'
}));

export const BoxInputMessMui = muiStyled(Box)(({ theme }) => ({
    fontSize: '18px',
    padding: '10px',
    borderRadius: '30px',
    background: '#f0f2f5',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: '1'
}));



export const CallIconMui = muiStyled(CallIcon)(({ theme }) => ({
    fontSize: '25px',
    color: '#bcc0c4',
    padding: '2px',
    ':hover': {
        background: '#80808036',
        borderRadius: '50%',
    }
}));

export const ContentMessageRightMui = muiStyled(Box)(({ theme }) => ({
    color: '#898989ad',
    fontSize: '13px',
    maxWidth: '70%',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    position: 'relative',
    ".MuiSvgIcon-root": {
        width: '25px',
        height: '25px'
    }
}));

export const AvatarSizeMessMui = muiStyled(Avatar)(({ theme }) => ({
    width: '35px',
    height: '35px',
}));

export const OneMessageMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    width: '-webkit-fill-available',
    padding: '5px',
    alignItems: 'end !important',
    gap: '10px',
}));

export const MainContentMessMui = muiStyled('span')(({ theme }) => ({
    padding: '10px',
    borderRadius: '20px',
    maxWidth: '-webkit-fill-available',
    fontSize: '15px',
}));

export const NameMessageMui = muiStyled('p')(({ theme }) => ({
    fontSize: '11px',
    color: '#898989ad',
}));


export const IconEmojiMui = muiStyled('img')(({ theme }) => ({
    width: '32px',
    height: '32px',
    ':hover': {
        scale: '1.2',
        transition: 'all 0.3s'
    }
}));

export const BoxEmojiMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    background: '#fff',
    width: 'auto',
    padding: '8px',
    borderRadius: '30px',
    position: 'absolute',
    gap: '7px',
    top: '50%',
    transform: "translateY(-124%)",
}));

export const MenuEmoji = muiStyled(Menu)(({ theme }) => ({
    '.MuiList-root': {
        display: 'flex !important',
        gap: '10px',
        padding: '5px 10px'
    },
    '.MuiPaper-root': {
        borderRadius: '50px'
    },
    'li': {
        padding: "0 5px",
        ':hover': {
            background: 'transparent',
        }
    },
}));
export const ButtonEmoji = muiStyled(Button)(({ theme }) => ({
    minWidth: 'auto',
    ':hover': {
        background: 'transparent'
    }
}));

export const EmojiCount = muiStyled('img')(({ theme }) => ({
    width: '13px',
    height: '13px'
}));

export const VisuallyHiddenInput = muiStyled('input')(({ theme }) => ({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
}));

export const BoxCountEmoj = muiStyled(Box)(({ theme }) => ({
    background: '#8989892e',
    borderRadius: '30px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: '-13px',
}));

export const PopoverMui = muiStyled(Popover)(({ theme }) => ({
    '.MuiPaper-root': {
        borderRadius: '15px',
        marginTop: '-40px',
    }
}));

export const LineHrMui = muiStyled('hr')(({ theme }) => ({
    border: '0',
    background: '#80808070',
    height: '1px',
    width: 'calc(100% - 20px)',
    margin: '10px',
}));

export const MenuDetailMessMui = muiStyled(Menu)(({ theme }) => ({
    '.MuiPaper-elevation': {
        borderRadius: '15px',
        minWidth: '275px'
    },
    'li': {
        gap: '10px',
        borderRadius: '10px'
    },
    'ul': {
        padding: '8px',
    }
}));

export const ButtonIconMui = muiStyled(Button)(({ theme }) => ({
    'span': {
        marginLeft: '0',
        marginRight: '0',
    },
    minWidth: 'auto',
    padding: '0'
}));

export const DialogMui = muiStyled(Dialog)(({ theme }) => ({
    '.MuiPaper-root': {
        width: '400px'
    },
}));

export const BoxImgReplyMui = muiStyled(Box)(({ theme }) => ({
    width: '40px',
    height: '40px',
    backgroundSize: 'cover',
    borderRadius: '10px',
    opacity: 0.6,
}));

export const MainContentReplyMui = muiStyled(Box)(({ theme }) => ({
    background: '#c7c7c738',
    padding: '10px',
    borderRadius: '10px',
    maxHeight: '150px',
    overflow: 'hidden',
}));


export const BoxImgContentMui = muiStyled(Box)(({ theme }) => ({
    width: '100px',
    paddingBottom: '100%',
    backgroundSize: 'cover'
}));


export const BoxGifMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

export const DialogTitleMui = muiStyled(DialogTitle)(({ theme }) => ({
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: '600'
}));

export const DialogContentMui = muiStyled(DialogContent)(({ theme }) => ({
    borderTop: '1px solid #80808085',
    borderBottom: '1px solid #80808085',
    paddingTop: '20px !important',
    '.box-emoji': {
        padding: '0',
        boxShadow: 'none',
        maxWidth: '100%'
    },
    '.box-search-icon': {
        display: 'none'
    }
}));


export const BoxRemoveMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    background: '#c0c0c080',
    borderRadius: '10px',
    padding: '10px',
    height: 'fit-content',
    ':hover': {
        cursor: 'pointer',
        background: '#9b999980'
    }
}));

export const BoxCoverRMMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
    ':hover': {
        background: '#ececec70',
        borderRadius: '10px',
    }
}));


export const InputSearchMui = muiStyled('input')(({ theme }) => ({
    border: 'none',
    outline: 'none',
    background: 'transparent',
    width: '85%',
    fontSize: '16px',
    color: '#4c4a4ade',
}));

export const IconSearchMui = muiStyled(SearchIcon)(({ theme }) => ({
    marginLeft: '9px',
    color: '#4c4a4ade',
}));

export const BoxSearchMui = muiStyled(Box)(({ theme }) => ({
    width: 'calc(100% - 14px)',
    background: '#ebebeb78',
    padding: '10px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
}));
export const GifMui = muiStyled(Box)(({ theme }) => ({
    maxWidth: '300px',
    padding: '3px 7px',
    boxShadow: '#80808061 0 0 8px 5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    bottom: '30px',
    right: '0',
    zIndex: '1000',
    background: '#fff',
}));

export const InputNicknameMui = muiStyled('input')(({ theme }) => ({
    width: '-webkit-fill-available',
    padding: '10px',
    height: '40px',
    borderRadius: '5px',
}));

export const BoxInpNicknameMui = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    borderRadius: '10px',
    ':hover': {
        background: '#b7b3b321',
        cursor: 'pointer',
    }
}));

export const GridThemeMui = muiStyled(Grid)(({ theme }) => ({
    padding: '8px',
    borderRadius: '10px',
    ':hover': {
        background: '#d7d7d7',
        cursor: 'pointer'
    }
}));

export const BoxThemeMui = muiStyled(Grid)(({ theme }) => ({
    width: '100%',
    paddingBottom: '100%',
    borderRadius: '50%',
}));

export const StyleSearchChat = muiStyled(StyleBoxRow)(({ theme }) => ({
    border: '1px solid #E5E5E5',
    borderRadius: '5px',
    alignItems: 'center',
    width: '-webkit-fill-available',
    height: '50px',
    gap: '15px',
    paddingLeft: '15px',
    position: 'relative'
}));

export const StyleDetailChat = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    background: "#FFFFFF",
    borderRadius: '20px 0 0 0',
    width: '-webkit-fill-available',
    height: '-webkit-fill-available',
    padding: '30px 20px',
    border: "1px solid #80808021",
    justifyContent: 'space-between',
}));

export const StyleExtraName = muiStyled('p')(({ theme }) => ({
    fontSize: '16px',
    fontWeight: '550'
}));

export const StyleExtraContent = muiStyled('p')(({ theme }) => ({
    fontSize: '13px',
    fontWeight: '400',
    color: '#cecccc'
}));

export const StyleExtraTitle = muiStyled('h1')(({ theme }) => ({
    fontSize: '25px',
    fontWeight: '500',
    textAlign: 'center'
}));

export const StyleExtraAvater = muiStyled('img')(({ theme }) => ({
    width: '45px',
    height: '45px',
    borderRadius: '50%'
}));

export const StyleRowGap10 = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
}));

export const StyleColumnGap5 = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
}));

export const StyleExtraLi = muiStyled('li')(({ theme }) => ({
    padding: '10px 3px',
    width: '100%',
    ':hover': {
        background: "#e5e3e3",
        cursor: "pointer",
        borderRadius: '8px'
    }
}));

export const StyleBoxNoDataMess = muiStyled(StyleBoxColumn)(({ theme }) => ({
    widtth: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px'
}));

export const StyleTextNoDataMess = muiStyled('p')(({ theme }) => ({
    fontSize: '25px',
    fontWeight: '500'
}));

export const StyleNewChat = muiStyled('button')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    width: '100%',
    border: '0',
    borderRadius: '15px',
    background: 'transparent',
    ':hover': {
        cursor: 'pointer',
        background: '#e3e3e3'
    }
}));

export const StyleIconLogo = muiStyled('img')(({ theme }) => ({
    width: '30px',
    height: '30px'
}));

export const StyleColumnGap20 = muiStyled(StyleBoxColumn)(({ theme }) => ({
    gap: '20px'
}));

const typingAnimation = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkCaretAnimation = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #2a91c2; }
`;

export const StyleTxtTyping = muiStyled(StyleBoxColumn)(({ theme }) => ({
    overflow: 'hidden',
    borderRight: '.15em solid orange',
    whiteSpace: 'nowrap',
    margin: '0 auto',
    color: '#32cecd',
    letterSpacing: '.10em',
    fontSize: '15px',
    animation: `${typingAnimation} 3.5s steps(40, end), ${blinkCaretAnimation} .75s step-end infinite`,
}));

export const StyleBoxCenter = muiStyled(StyleBoxRow)(({ theme }) => ({
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: '#e3e3e3',
    padding: '5px',
    borderRadius: '10px'
}));

export const StyleInpSearch = muiStyled('input')(({ theme }) => ({
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    color: 'rgba(35, 50, 85, 0.8)',
    "&::placeholder": {
        color: "rgba(35, 50, 85, 0.3)",
    }
}));

export const StyleListSearch = muiStyled(Box)(({ theme }) => ({
    background: "white",
    position: 'absolute',
    top: '120%',
    width: '100%',
    height: 'auto',
    left: '0',
    padding: '10px',
    borderRadius: '0 0 20px 20px',
    boxShadow: '0 5px 12px 5px #e2e2e2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
}));