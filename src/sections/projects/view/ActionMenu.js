import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import Iconify from '@components/iconify';
import { Stack } from '@mui/material';

ActionMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  actionTitle: PropTypes.string,
};

export default function ActionMenu({ menuItems, actionTitle, handleClose, anchorEl, setAnchorEl }) {
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Stack sx={{ ml: -10 }} direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="outlined"
          endIcon={<Iconify icon={open ? 'akar-icons:chevron-up' : 'akar-icons:chevron-down'} />}
        >
          {actionTitle}
        </Button>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems.map((item, index) => (
          <>
            {item?.show ? (
              <MenuItem key={index} onClick={item.onClick} sx={{ fontSize: 14 }}>
                {item.name}
              </MenuItem>
            ) : (
              <></>
            )}
          </>
        ))}
      </Menu>
    </div>
  );
}
