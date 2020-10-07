import React, {useEffect} from "react";
import {connect} from "react-redux"
import {Link} from "react-router-dom";
import {logout, fetchSets} from "../actions";

const Header = ({isLoggedIn, sets, logout, fetchSets}) => {
	useEffect(() => {
		if(isLoggedIn) {
			fetchSets();
		};
	}, [fetchSets, isLoggedIn]);

	const onLogoutClick = (e) => {
		e.preventDefault();
		logout();
		if(process.env.REACT_APP_GOOGLE_CLIENTID && window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
			window.gapi.auth2.getAuthInstance().signOut();
		};
	};

	const renderAuth = () => {
		if(isLoggedIn === null) {
			return;
		} else if(isLoggedIn) {
			return <Link to="#" className="item" onClick={(e) => onLogoutClick(e)}>Logout</Link>
		} else {
			return (
				<React.Fragment>
					<Link to="/login" className="item">Login</Link>
					<Link to="/register" className="item">Sign Up</Link>
				</React.Fragment>
			);
		};
	};

	const renderDropdown = () => {
		if(isLoggedIn) {
			const renderItems = () => {
				return sets.map(set => {
					return <Link to={`/sets/${set._id}`} className="item dropdownItem" key={set._id}>{set.title}</Link>
				});
			};

			return (
				<div className="ui simple dropdown item">
					Sets
					<div className="menu">{renderItems()}</div>
				</div>
			);
		};
	};

	return (
		<div className="ui inverted secondary pointing menu" id="header">
			<div className="ui container">
				<Link to="/" className="item">Flipcards</Link>
				{renderDropdown()}
				<div className="right menu">
					{renderAuth()}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {isLoggedIn: state.auth.isLoggedIn, sets: state.sets}
};

export default connect(mapStateToProps, {logout, fetchSets})(Header);