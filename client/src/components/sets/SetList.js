import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchSets, flipSet} from "../../actions";
import "./SetList.css";

const SetsList = ({sets, fetchSets, flipSet}) => {
	useEffect(() => {
		fetchSets();
	}, [fetchSets]);

	const renderList = () => {
		return sets.map(set => {
			let flipped = set.flipped ? "flipped" : "";

			return (
				<div className="setItem card" key={set._id}>
					<div className={`${flipped} flipCard`}>
						<div className="front" style={{backgroundColor: set.color}} onClick={() => flipSet(set._id)}>
							<div className="header">{set.title}</div>
							<Link 
								to={`/sets/${set._id}`}
								onClick={(e) => e.stopPropagation()}
								className="ui huge blue redirect button"
							>
								Practice
							</Link>
						</div>
						<div className="back" style={{backgroundColor: set.color}} onClick={() => flipSet(set._id)}>
							<div onClick={(e) => e.stopPropagation()}>
								<Link to={`/sets/${set._id}/edit`} className="ui circular button">
									<i className="pencil alternate icon" />
								</Link>
								<Link to={`/sets/${set._id}/delete`} className="ui circular button">
									<i className="trash icon" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div id="setsList">
			<div className="ui cards">
				{renderList()}
					<Link to="/sets/create" className="ui green create button setItem">
						<i className="plus icon" />Create
					</Link>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {sets: state.sets};
};

export default connect(mapStateToProps, {fetchSets, flipSet})(SetsList);