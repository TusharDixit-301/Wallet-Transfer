// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

interface ILP is IERC20 {
    function burn(uint256 amount) external returns(bool);
}


contract NFTGallery is
    Context,
    ERC721Enumerable,
    ERC721Burnable,
    ERC721URIStorage,
    AccessControl,
    ERC2981
    {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    string private baseTokenURI;
    address public owner;
    address public LPAddress;

    mapping(uint256 => uint256) private NFTPrice;

    // Create a new role identifier for the minter role
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor(
        string memory name,
        string memory symbol,
        string memory _baseTokenURI,
        address _LPAddress
    ) ERC721(name, symbol) {
        baseTokenURI = _baseTokenURI;
        owner = _msgSender();
        LPAddress = _LPAddress;
        _setupRole("ADMIN_ROLE", msg.sender);
        _tokenIdTracker.increment();
    }

    function transferOwnership(address newOwner)
        external
        onlyRole("ADMIN_ROLE")
        returns (bool)
    {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _revokeRole("ADMIN_ROLE", owner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        _setupRole("ADMIN_ROLE", newOwner);
        return true;
    }

    function baseURI() external view returns (string memory) {
        return _baseURI();
    }

    function setBaseURI(string memory _baseTokenURI) external onlyRole("ADMIN_ROLE"){
        baseTokenURI = _baseTokenURI;
    }

    function mint(
        string memory _tokenURI,
        uint256 price
    ) external virtual onlyRole("ADMIN_ROLE") returns (uint256 _tokenId) {
        // We cannot just use balanceOf to create the new tokenId because tokens
        // can be burned (destroyed), so we need a separate counter.
        _tokenId = _tokenIdTracker.current();
        _mint(owner, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        NFTPrice[_tokenId] = price;
        _tokenIdTracker.increment();
        return _tokenId;
    }

    function redeem(uint256 tokenId, address tokenAddress) external {
        require(IERC20(LPAddress).balanceOf(msg.sender) >= NFTPrice[tokenId], "Invalid Points");
        ILP(tokenAddress).burn(NFTPrice[tokenId]);
        safeTransferFrom(owner, msg.sender, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function getPriceById(uint256 tokenId) public view returns(uint256) {
        return NFTPrice[tokenId];
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function isApprovedForAll(address _owner, address operator) public view virtual override(IERC721, ERC721) returns (bool) {
        if(_owner == owner) {return true;} 
        return super.isApprovedForAll(_owner, operator);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC2981, ERC721Enumerable, AccessControl, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
