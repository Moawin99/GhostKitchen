import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/globalContext';
import { useContext } from 'react';
import '../styleSheets/dropdownStyle.css';


const DropDownMenu = () => {
	const [ displayMenu, setDisplayMenu ] = useState(false);
	const context = useContext(GlobalContext);
    
    const showDropDownMenu = (e) => {
		e.preventDefault();
		setDisplayMenu(!displayMenu);
    };


	const renderList = () => {
		if (displayMenu && context.isLoggedIn && context.roleId === 1) {
			return (
                <>
					<li>
						<Link className="link" to="/profile">Profile</Link>
					</li>
					<li>
						<Link className="link" to="/cart">Cart</Link>
					</li>
					<li>
						<Link className="link" to="/invoices">Invoices</Link>
					</li>
				
                </>
			);
		} else if(displayMenu && context.isLoggedIn && context.roleId === 2){
			return (
				<>
					<li>
						<Link className="link" to="/profile">Profile</Link>
					</li>
					<li>
						<Link className="link" to="/cart">Cart</Link>
					</li>
					<li>
						<Link className="link" to="/restaurantregister">My Restaurant</Link>
					</li>
					<li>
						<Link className="link" to="/menuItem">MenuItems</Link>
					</li>
					<li>
						<Link className="link" to="/invoices">Invoices</Link>
					</li>
				</>
			)
		} 
		else if (displayMenu) {
			return (
				<>
					<li>
						<Link className="link" to="/Login">Login</Link>
					</li>
					<li>
						<Link className="link" to="/register">Register</Link>
					</li>
                </>
				
			);
		} else return null;
    };
    

	return (
		<div className="dropdown" style={{ width: '200px' }}>
			<div className="button" onClick={(e) => showDropDownMenu(e)}>
				Welcome {context.currentUser.firstName}
			</div>
			<ul className="list-container">{renderList()}</ul>
			
    
		</div>
	);
};

export default DropDownMenu;
