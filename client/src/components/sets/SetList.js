import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchSets, createSet, updateSet} from "../../actions";
import FlipCard from "../FlipCard";
import ContentEditable from "react-contenteditable";
import "./SetList.css";

const SetsList = ({sets, fetchSets, createSet, updateSet}) => {
	useEffect(() => {
		fetchSets();
	}, [fetchSets]);

	const onEditableKeyPress = (e, set) => {
		if(e.which === 13) {
			updateSet({title: e.target.textContent || "Set"}, set._id)
		};
	};

	const renderList = () => {
		return sets.map(set => {
			return (
				<div className="setItem card" key={set._id}>
					<FlipCard name={set._id} backgroundColor={set.color}>
						<React.Fragment>
							<ContentEditable
								className="header"
								html={set.title}
								disabled={false}
								spellCheck={false}
								onClick={e => e.stopPropagation()}
								onKeyPress={e => onEditableKeyPress(e, set)}
								onBlur={e => updateSet({title: e.target.textContent}, set._id)} />
							<Link 
								to={`/sets/${set._id}`}
								onClick={(e) => e.stopPropagation()}
								className="ui huge blue redirect button"
							>
								Practice
							</Link>
						</React.Fragment>
						<div onClick={(e) => e.stopPropagation()}>
							<Link to={`/sets/${set._id}/delete`} className="ui circular button">
								<i className="trash icon" />
							</Link>
						</div>
					</FlipCard>
				</div>
			);
		});
	};

	return (
		<div id="setsList">
			<div className="ui cards">
				{renderList()}
				<button 
					type="button" 
					className="ui green create button setItem" 
					onClick={() => createSet({title: "Set"})}
				>
					<i className="plus icon" />Create
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {sets: state.sets};
};

export default connect(mapStateToProps, {fetchSets, createSet, updateSet})(SetsList);