import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/users/usersSlice';
import { logout } from '../features/auth/authSlice';
import { UserIcon } from './UserIcon';
import React from 'react';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const isLoggedIn = !!user;

  let navContent: React.ReactNode = null;

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(logout())
    };

    navContent = navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to="/posts">Posts</Link>
          <Link to="/users">Users</Link>
        </div>
        <div className="userDetails">
          <UserIcon size={32} />
          {user.name}
          <button className="button small" onClick={onLogoutClicked}>
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        {navContent}
      </section>
    </nav>
  );
};
