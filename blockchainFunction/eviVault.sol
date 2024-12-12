// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoginAuditTrail {

    struct LoginEvent {
        string role;
        string userId;
        uint256 timestamp;
    }

    // map last login time to user
    mapping(string => uint256) public lastLogin;

    // store all login events
    LoginEvent[] public loginEvents;


    // Event emitted when a login is recorded
    event LoginRecorded(string role, string userId, uint256 timestamp);

    // Function to log a new login event
    function logLogin(string memory _role, string memory _userId) public {
        // Store the current timestamp as the last login time for the user
        lastLogin[_userId] = block.timestamp;

        // Create a new LoginEvent and store it in the loginEvents array
        loginEvents.push(LoginEvent({
            role: _role,
            userId: _userId,
            timestamp: block.timestamp
        }));

        // Emit the LoginRecorded event
        emit LoginRecorded(_role, _userId, block.timestamp);
    }

    // Function to retrieve the last login time of a user
    function getLastLogin(string memory _userId) public view returns (uint256) {
        return lastLogin[_userId];
    }

    // Function to retrieve all login events
    function getLoginEvents() public view returns (LoginEvent[] memory) {
        return loginEvents;
    }
}
