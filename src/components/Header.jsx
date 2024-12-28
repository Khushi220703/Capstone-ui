import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '50%', 
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch', 
    },
  },
}));

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#007bff' }}>
      <Toolbar>
       
        <Typography variant="h6" noWrap component="div">
          MyLogo
        </Typography>

      
      <Link to="/">
        <IconButton color="inherit" sx={{ marginLeft: 2 }}>
          <HomeIcon />
        </IconButton>
      </Link>

        
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for products, brands and more..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

      
        <Button variant="contained" sx={{ backgroundColor: '#fff', color: '#6c757d', marginRight: 2 }}>
          Logout
        </Button>
        
        
        <Link to="/order"><Button
          variant="text"
          sx={{
            color: 'white',
            marginLeft: 2,
            textTransform: 'none', 
            boxShadow: 'none', 
            backgroundColor: 'transparent', 
          }}
        >
          Order History
        </Button>
        </Link>

      
       <Link to="/cart"><Button
          variant="text"
          startIcon={<ShoppingCartIcon />}
          sx={{
            color: 'white',
            marginLeft: 2,
            textTransform: 'none', 
            boxShadow: 'none', 
            backgroundColor: 'transparent', 
          }}
        >
          Cart
        </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
