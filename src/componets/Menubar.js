import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function Menubar() {
    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname;
    const handleItemClick = (e, { name }) => setActiveItem(name);

    const path = pathname === '/home' ? 'Home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path)
    const menuBar = user ? (
        <Menu pointing secondary>
            <Menu.Item
                name={user.username}
                active              
                as={Link}
                to="/home"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'                   
                    onClick={logout}              
                />
             
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary>
            <Menu.Item
                name='Home'
                active={activeItem === 'Home'}
                onClick={handleItemClick}
                as={Link}
                to="/home"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    )
    return menuBar;

}
export default Menubar;