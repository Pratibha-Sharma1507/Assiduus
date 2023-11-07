import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import {
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';


const drawerWidth = 240;

const sidebarItems = [
    { icon: <AutoAwesomeMosaicIcon />, text: 'Dashboard' },
    { icon: <AccountBalanceWalletIcon />, text: 'Accounts' },
    { icon: <AttachMoneyIcon />, text: 'Payroll' },
    { icon: <SummarizeIcon />, text: 'Reports' },
    { icon: <PersonIcon />, text: 'Advisor' },
    { icon: <ContactsIcon />, text: 'Contacts' },
];

export default function Sidebar({ children }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        handleClose();
    };

    const handleChangePasswordClick = () => {
        handleClose();
    };

    const handleLogoutClick = () => {
        handleClose();
    };


    const [selectedItem, setSelectedItem] = React.useState(null);

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
                <Toolbar >
                    <Container className="search-container">
                        <InputAdornment position="start">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search..."
                                style={{ paddingLeft: '40px' }}
                            />
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    </Container>
                    <img
                        onClick={handleClick}
                        src='data:image/jpeg;base64,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'
                        alt='image'
                        style={{ borderRadius: "50%", borderStyle: "groove", color: "black", height: "50px", width: "50px" }} />
                    <div>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleProfileClick}>
                                <Typography variant="body1">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleChangePasswordClick}>
                                <Typography variant="body1">Change Password</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogoutClick}>
                                <Typography variant="body1">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <img src='data:image/png;base64,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'
                    alt='dashboard-icon'
                    style={{ height: "100px", width: "200px", marginTop: "-69px", marginLeft: '16px' }}
                />
                <Box sx={{ overflow: 'auto' }}>

                    <List>
                        {sidebarItems.map((item, index) => (
                            <ListItem
                                key={item.text}
                                disablePadding
                                onClick={() => handleItemClick(index)}
                                selected={selectedItem === index}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#55bc55',
                                    },
                                    ...(selectedItem === index && {
                                        backgroundColor: '#55bc55',
                                    }),
                                }}
                            >
                                <ListItemButton>
                                    {item.icon && <span style={{ marginRight: '8px' }}>{item.icon}</span>}
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
