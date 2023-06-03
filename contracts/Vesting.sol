// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Vesting {
    uint256 public totalSupply;

    struct Organisation {
        address orgAddress;
        string name;
        uint256 token;
    }

    struct Stakeholder {
        address stakeholderAddress;
        string stakeholderPost;
        uint256 vestingPeriod;
        uint256 startTime;
        uint256 token;
        uint256 claimedToken;
    }

    mapping(address => Stakeholder) public stakeholders;
    mapping(address => bool) public whitelistedAddresses;
    mapping(address => Organisation) public organisations;
    mapping(address => uint) public balance;

    event CreateStakeholder(uint256 startTime, uint256 vestingPeriod);

    function addOrganisation(string memory _name,address _orgAddress, uint256 _token) public {
        Organisation storage org = organisations[_orgAddress];
        org.orgAddress = _orgAddress;
        org.name = _name;
        org.token = _token;
        totalSupply += _token;
    }

    function addStakeholder(
        address _stakeholderAddress,
        string memory _post,
        uint256 _vestingPeriod,
        uint256 _token
    ) public {
        require(organisations[msg.sender].orgAddress == msg.sender, "Unauthorized");
        require(organisations[msg.sender].token >= _token, "Token cannot be greater than the total token");

        stakeholders[_stakeholderAddress] = Stakeholder({
            stakeholderAddress: _stakeholderAddress,
            stakeholderPost: _post, 
            vestingPeriod: _vestingPeriod,
            startTime: block.timestamp,
            token: _token,
            claimedToken: 0
        });

        emit CreateStakeholder(block.timestamp, _vestingPeriod);
    }

    function whitelistAddress(address _stakeholder) external {
        require(organisations[msg.sender].orgAddress == msg.sender, "Only organization admin can perform this action");
        whitelistedAddresses[_stakeholder] = true;
    }

    function claimToken() external {
        require(whitelistedAddresses[msg.sender], "Only whitelisted address can withdraw");
        Stakeholder storage stakeholder = stakeholders[msg.sender];
        require(organisations[msg.sender].orgAddress == msg.sender || 
        stakeholder.stakeholderAddress == msg.sender, "You do not belong to this organisation");
        require(block.timestamp >= stakeholder.startTime + stakeholder.vestingPeriod, "Vesting period not yet over");

        uint256 claimableTokens = stakeholder.token - stakeholder.claimedToken;
        require(claimableTokens > 0, "No tokens available to claim");

        stakeholder.claimedToken += claimableTokens; 
        balance[stakeholder.stakeholderAddress] =  claimableTokens;
    }
   

    function getClaimedToken() public view returns (uint256){
        return balance[msg.sender];
    }
    function getStakeholderPostion(address _address) public view returns (Stakeholder memory){
        return stakeholders[_address];
    }
}
