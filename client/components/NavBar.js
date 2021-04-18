//NPM
import React, { useContext } from 'react';
import { ShoppingCart, User, SignOut } from 'phosphor-react';
import Link from 'next/link';
import Cookie from 'js-cookie'

//Project Files
import { DataContext } from '../store/GlobalState';

//CSS
import styles from '../styles/NavBar.module.css';


const NavBar = () => {
  const { state, dispatch } = useContext(DataContext);
  
  
	const { auth } = state;

  const handleLogout = () => {
    Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'}})
    
  } 

  const loggedRouter = () => {
    return (
      <>
        <Link href='/profile'>
          <a>
            <User size={30} />
          </a>
        </Link>
        
          <a className={styles.logout} onClick={handleLogout}>
            <SignOut size={30} />
          </a>
      </>
    );
  };

	return (
		<>
			<div className={styles.navbar}>
				<div className={styles.navItems}>
					<div className={styles.navLogo}>
						<img src='/logo.png' alt='logo' />
					</div>
					<Link href='/'>
						<a>Hjem</a>
					</Link>
					<Link href='/kurs'>
						<a>Kurs</a>
					</Link>
					<Link href='/shop'>
						<a>Shop</a>
					</Link>
					<Link href='/events'>
						<a>Events/aktuelt</a>
					</Link>
					<Link href='/about'>
						<a>Om meg</a>
					</Link>
					<Link href='/kontakt'>
						<a>Kontakt</a>
					</Link>
					<div className='flex-end'>
						<Link href='/cart'>
							<a>
								<ShoppingCart size={30} />
							</a>
						</Link>
						{Object.keys(auth).length === 0 ? (
							<Link href='/signin'>
								<a>
									<User size={30} />
								</a>
							</Link>
						) : (
							loggedRouter()
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default NavBar;
