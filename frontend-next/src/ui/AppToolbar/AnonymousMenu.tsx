import React from 'react';
import { Button } from '@mui/material';
import NavLink from 'next/link';

const AnonymousMenu = () => {
  return (
    <>
      <Button component={NavLink} href="/register" color="inherit">
        Sign up
      </Button>
      <Button component={NavLink} href="/login" color="inherit">
        Sign in
      </Button>
    </>
  );
};

export default AnonymousMenu;
