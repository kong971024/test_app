import React, { useState } from 'react'
import { Menu} from 'semantic-ui-react'
import{Link} from 'react-router-dom'

function Menubar() {
    const pathname = window.location.pathname;
    const handleItemClick = (e, { name }) => setActiveItem(name);
   
    const path = pathname ==='/' ? 'home': pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path)


    return (
        
            <Menu pointing secondary>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
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

}
export default Menubar;