import React from "react";
import Login from "./Login";
import Register from "./Register";
import FlipCard from "../FlipCard";
import "./UserForm.css";

const UserForm = ({match}) => {
    return (
        <div id="userForm">
            <FlipCard name="userForm" backgroundColor="#58bbe3">
                <Login match={match} />
                <Register />
            </FlipCard>
        </div>
    );
};

export default UserForm;