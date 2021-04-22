//NPM
import React, { useContext, useState, useEffect } from 'react';
import { ShoppingCart, User, SignOut, List } from 'phosphor-react';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router'

//Project Files
import { DataContext } from '../store/GlobalState';

//CSS
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const cx = (...classNames) => classNames.join(' ')

	const { state, dispatch } = useContext(DataContext);

	const [showLinks, setShowLinks] = useState(false);

  const [scrolled, setScrolled] = useState(false)

	const { auth, cart } = state;

  const router = useRouter()
  
  useEffect(() => {
      setShowLinks(false)
  }, [router.pathname])

	const handleLogout = () => {
		Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
		localStorage.removeItem('firstLogin');
		dispatch({ type: 'AUTH', payload: {} });
		dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } });
	};

  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 200 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })
  const stickNav = () =>{
      if(scrolled){
        return cx(styles.navbar, styles.scrolled)
      }
      return styles.navbar
  }

	const loggedRouter = () => {
		return (
			<>
				<Link href='/profile'>
					<a>
						<User size={25} />
					</a>
				</Link>
				<a className={styles.logout} onClick={handleLogout}>
					<SignOut size={25} />
				</a>
			</>
		);
	};

	return (
		<>
			<div className={stickNav()}>
				<div className={styles.navItems}>
					<div className={styles.navLogo}>
						<img src='/logo.png' alt='logo' />
					</div>
					<div className={styles.burgerDiv}>
						<button
              className={styles.burgerMenu}
							onClick={() => {
								setShowLinks(!showLinks);
							}}
						>
							<List size={25} />
						</button>
					</div>
					<div className={styles.navPages}>
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
					</div>
					<div className='flex-end'>
						<Link href='/cart'>
							<a>
								<ShoppingCart size={30}/>
                <span className={styles.shoppingCart}>{cart.length}</span>
							</a>
						</Link>
						{Object.keys(auth).length === 0 ? (
							<Link href='/signin'>
								<a>
									<User size={25} />
								</a>
							</Link>
						) : (
							loggedRouter()
						)}
					</div>
				</div>
			</div>
			{showLinks && (
        <div className={styles.centerVertically}>

				<div className={styles.mobilePages}>
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
				</div>
        </div>
			)}
		</>
	);
};

export default NavBar;
