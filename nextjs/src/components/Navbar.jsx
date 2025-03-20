import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Slide, useScrollTrigger, Menu, MenuItem, Button } from "@mui/material";
import Link from "next/link";
import QuackleSvgIcon from "./QuackleSvgIcon";
import {
  IconHome,
  IconMessage,
  IconShoppingCart,
  IconUser,
  IconCategory,
  IconHeart,
  IconUserCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  color: theme.palette.text.primary,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.primary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  "& .MuiInputBase-input": {
    color: theme.palette.text.primary,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function SearchAppBar() {
  const [searchTerm, setSearchTerm] = React.useState(""); // State for search term
  const [anchorEl, setAnchorEl] = React.useState(null); // State for dropdown menu
  const router = useRouter();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit(event);
    }
  };

  // Handle dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    router.push(`/products/${category}`);
    handleMenuClose();
  };

  // Handle dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    router.push(`/products/${category}`);
    handleMenuClose();
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-white dark:text-white " />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <IconUserCircle className="h-4 w-4 text-white dark:text-white " />,
    },
    {
      name: "Cart",
      link: "/cart",
      icon: (
        <IconShoppingCart className="h-4 w-4 text-white dark:text-white " />
      ),
    },
    {
      name: "Wishlist",
      link: "/wishlist",
      icon: <IconHeart className="h-4 w-4 text-white dark:text-white " />,
    },
  ];

  const categories = [
    "accessories",
    "audio",
    "computers",
    "phones",
    "tablets",
    "watches",
    "home",
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <QuackleSvgIcon />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Ducktronics
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {navItems.map((navItem, idx) => (
                <Link
                  key={`link-${idx}`}
                  href={navItem.link}
                  className="text-white hover:text-gray-300 flex items-center space-x-1"
                >
                  {navItem.icon}
                  <span className="hidden sm:inline">{navItem.name}</span>
                </Link>
              ))}
              {/* Categories Dropdown */}
              <Button
                aria-controls="categories-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                startIcon={<IconCategory />}
                sx={{ color: "white" }}
              >
                Categories
              </Button>
              <Menu
                id="categories-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "categories-button",
                }}
              >
                {categories.map((category, idx) => (
                  <MenuItem
                    key={`category-${idx}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Search component="form" onSubmit={handleSearchSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onKeyDown={handleKeyDown}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
}
