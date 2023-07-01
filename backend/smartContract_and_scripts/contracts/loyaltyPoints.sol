// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract LPToken is ERC20, Ownable, AccessControl {

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor(address admin) ERC20("LPToken", "LP") {
        _transferOwnership(admin);
        _setupRole(ADMIN_ROLE, admin);
    }

    function mint(address receiver, uint256 amounts) external onlyRole(ADMIN_ROLE){
        _mint(receiver, amounts);
    }
    
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function burn(uint256 amount) external returns(bool) {
        _burn(tx.origin, amount);
        return true;
    }

}