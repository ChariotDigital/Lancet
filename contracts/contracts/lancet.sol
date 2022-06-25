pragma solidity 0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract Lancet {
    struct Job {
        address payable provider;
        address buyer;
        uint256 amount;
        bool complete;
    }

    uint256 public s_jobID;
    uint256 public runningJobs;
    uint256 public contractBalance;
    uint256 public s_platformFee;

    address owner;

    mapping(uint256=>Job) public jobs;

    event JobCreated(Job job,uint256 jobID);
    event JobComplete(Job job,uint256 jobID);
    event CancelJob(Job job, uint256 jobID_);

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function initialize(uint256 s_platformFee_) external {
        s_platformFee = s_platformFee_;
        owner = msg.sender;
    }

    function createJob(address payable provider_, address buyer_, uint256 amount_) payable public{
        require(msg.value == amount_, "Please send the correct amount");
        require(msg.sender == buyer_, "You cannot do this on someone elses behalf");
        s_jobID++;
        runningJobs++;
        uint id = s_jobID;
        jobs[id] = Job(provider_, buyer_,amount_,false);
        
        emit JobCreated(jobs[id], id);
    }

    function cancelJob(uint256 jobID_) public {
        require(jobs[jobID_].buyer == msg.sender || jobs[jobID_].provider == msg.sender, "You do not have access to release these funds");
        require(jobs[jobID_].complete == false, "This job has already been complete and funds have been dispersed");
        jobs[jobID_].complete == true;
        runningJobs--;
        emit CancelJob(jobs[jobID_], jobID_);
    }

    function releaseFunds(uint256 jobID_) public {
        require(jobs[jobID_].buyer == msg.sender, "You do not have access to release these funds");
        require(jobs[jobID_].complete == false, "This job has already been complete and funds have been dispersed");
        jobs[jobID_].complete == true;
        uint256 fee = jobs[jobID_].amount * s_platformFee/100;
        contractBalance+=fee;
        jobs[jobID_].provider.transfer(jobs[jobID_].amount - fee);
        runningJobs--;
        emit JobComplete(jobs[jobID_], jobID_);
    }

    //++++++++
    // Owner Only Functions
    //++++++++

    function setPlatformFee(uint256 platformFee_) public onlyOwner {
        s_platformFee = platformFee_;
    }

    function emergancyRelease(uint256 jobID_, address payable emergancyReceiver_) public onlyOwner {
        jobs[jobID_].complete == true;
        emergancyReceiver_.transfer(jobs[jobID_].amount);
    }

    function withdraw(address payable to) external onlyOwner {
        require(to != address(0), "Cannot recover tokens to the 0 address");
        require(contractBalance>0, "Theres no balance for you to withdraw");
        to.transfer(contractBalance);
        contractBalance = 0;
    }
}

