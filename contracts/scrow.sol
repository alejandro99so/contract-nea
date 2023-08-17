// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract TokenEscrow {
    address public owner;
    IERC20 public token;
    struct receiverStruct {
        address receiver;
        uint256 amount;
    }
    uint256 public totalTxs;
    uint256 private balanceOwner;
    address[] frogs = [
        0x820FAec66A504901De79fa44D21609d457174f5B,
        0x6E72F14a6a8c60D3c938B7A14eA7ad3fB6c4a7c9
    ];
    mapping(address => receiverStruct) private tranfers;

    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }

    modifier onlyFrogs() {
        bool _isFrog = false;
        for (uint i = 0; i < frogs.length; i++) {
            if (frogs[i] == msg.sender) {
                _isFrog = true;
                break;
            }
        }
        require(_isFrog, "Only the frogs can call this function");
        _;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only the owner can call this function");
        _;
    }


    function deposit(uint256 _amount, address _receiver) public {
        uint256 _valueTransfer = _amount;
        if (totalTxs > 100 && totalTxs <1000) {
            _valueTransfer = _amount*10005/10000;
            balanceOwner += uint256(_amount*5/10000);
        } else if (totalTxs > 1000) {
            _valueTransfer = _amount*1001/1000;
            balanceOwner += uint256(_amount/1000);
        }
        token.transferFrom(msg.sender, address(this), _valueTransfer);
        tranfers[msg.sender] = receiverStruct({
            receiver: _receiver,
            amount: _amount
        });
        bool transferSuccess = token.transfer(address(this), _valueTransfer);
        totalTxs += 1;
        require(transferSuccess, "Transfer to contract failed");
    }

    function confirm() external {
        receiverStruct memory _reciever = tranfers[msg.sender];
        require(_reciever.amount > 0, "No funds available");
        require(
            token.transfer(_reciever.receiver, _reciever.amount),
            "Transfer failed"
        );
        tranfers[msg.sender].amount = 0;
    }

    function cancel(address _sender) external onlyFrogs {
        require(tranfers[_sender].amount > 0, "No funds available");
        require(token.transfer(_sender, tranfers[_sender].amount), "Transfer failed");
        tranfers[_sender].amount = 0;
    }

    function withdraw() public onlyOwner {
        require(balanceOwner > 0, "without money");
        bool transferSuccess = token.transfer(owner, balanceOwner);
        require(transferSuccess, "Transfer to contract failed");
    }
}