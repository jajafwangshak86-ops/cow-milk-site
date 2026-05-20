// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MilkSupplyChain
 * @notice Tracks milk batches from farm to consumer on Celo
 */
contract MilkSupplyChain {
    // ─── Roles ───────────────────────────────────────────────────────────────
    address public owner;

    enum Role { None, Farmer, Processor, Distributor, Retailer }

    mapping(address => Role) public roles;

    // ─── Batch ───────────────────────────────────────────────────────────────
    enum Stage { Farmed, Processed, Distributed, OnSale, Sold }

    struct Batch {
        uint256 id;
        string  productName;   // e.g. "Whole Milk 1L"
        uint256 quantity;      // litres
        uint256 pricePerUnit;  // in wei (CELO)
        address farmer;
        address processor;
        address distributor;
        address retailer;
        address buyer;
        Stage   stage;
        uint256 createdAt;
        uint256 updatedAt;
    }

    uint256 public batchCount;
    mapping(uint256 => Batch) public batches;

    // ─── Events ──────────────────────────────────────────────────────────────
    event RoleAssigned(address indexed account, Role role);
    event BatchCreated(uint256 indexed batchId, address indexed farmer, string productName, uint256 quantity);
    event StageUpdated(uint256 indexed batchId, Stage stage, address indexed updatedBy);
    event BatchPurchased(uint256 indexed batchId, address indexed buyer, uint256 totalPaid);

    // ─── Modifiers ───────────────────────────────────────────────────────────
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyRole(Role _role) {
        require(roles[msg.sender] == _role, "Unauthorized role");
        _;
    }

    modifier batchExists(uint256 _id) {
        require(_id > 0 && _id <= batchCount, "Batch not found");
        _;
    }

    // ─── Constructor ─────────────────────────────────────────────────────────
    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.Farmer; // owner starts as farmer for convenience
    }

    // ─── Admin ───────────────────────────────────────────────────────────────
    function assignRole(address _account, Role _role) external onlyOwner {
        require(_role != Role.None, "Cannot assign None");
        roles[_account] = _role;
        emit RoleAssigned(_account, _role);
    }

    // ─── Supply Chain Actions ─────────────────────────────────────────────────

    /// @notice Farmer creates a new milk batch
    function createBatch(
        string calldata _productName,
        uint256 _quantity,
        uint256 _pricePerUnit
    ) external onlyRole(Role.Farmer) returns (uint256) {
        require(_quantity > 0, "Quantity must be > 0");
        require(_pricePerUnit > 0, "Price must be > 0");

        batchCount++;
        batches[batchCount] = Batch({
            id:           batchCount,
            productName:  _productName,
            quantity:     _quantity,
            pricePerUnit: _pricePerUnit,
            farmer:       msg.sender,
            processor:    address(0),
            distributor:  address(0),
            retailer:     address(0),
            buyer:        address(0),
            stage:        Stage.Farmed,
            createdAt:    block.timestamp,
            updatedAt:    block.timestamp
        });

        emit BatchCreated(batchCount, msg.sender, _productName, _quantity);
        return batchCount;
    }

    /// @notice Processor marks batch as processed
    function processBatch(uint256 _id) external onlyRole(Role.Processor) batchExists(_id) {
        Batch storage b = batches[_id];
        require(b.stage == Stage.Farmed, "Batch not at Farmed stage");
        b.processor = msg.sender;
        b.stage     = Stage.Processed;
        b.updatedAt = block.timestamp;
        emit StageUpdated(_id, Stage.Processed, msg.sender);
    }

    /// @notice Distributor marks batch as distributed
    function distributeBatch(uint256 _id) external onlyRole(Role.Distributor) batchExists(_id) {
        Batch storage b = batches[_id];
        require(b.stage == Stage.Processed, "Batch not at Processed stage");
        b.distributor = msg.sender;
        b.stage       = Stage.Distributed;
        b.updatedAt   = block.timestamp;
        emit StageUpdated(_id, Stage.Distributed, msg.sender);
    }

    /// @notice Retailer lists batch for sale
    function listForSale(uint256 _id) external onlyRole(Role.Retailer) batchExists(_id) {
        Batch storage b = batches[_id];
        require(b.stage == Stage.Distributed, "Batch not at Distributed stage");
        b.retailer  = msg.sender;
        b.stage     = Stage.OnSale;
        b.updatedAt = block.timestamp;
        emit StageUpdated(_id, Stage.OnSale, msg.sender);
    }

    /// @notice Consumer purchases a batch (pays pricePerUnit * quantity in CELO)
    function purchaseBatch(uint256 _id) external payable batchExists(_id) {
        Batch storage b = batches[_id];
        require(b.stage == Stage.OnSale, "Batch not for sale");

        uint256 total = b.pricePerUnit * b.quantity;
        require(msg.value >= total, "Insufficient payment");

        b.buyer     = msg.sender;
        b.stage     = Stage.Sold;
        b.updatedAt = block.timestamp;

        // Pay retailer
        (bool sent, ) = b.retailer.call{value: total}("");
        require(sent, "Payment failed");

        // Refund excess
        if (msg.value > total) {
            (bool refunded, ) = msg.sender.call{value: msg.value - total}("");
            require(refunded, "Refund failed");
        }

        emit BatchPurchased(_id, msg.sender, total);
        emit StageUpdated(_id, Stage.Sold, msg.sender);
    }

    // ─── Views ────────────────────────────────────────────────────────────────

    function getBatch(uint256 _id) external view batchExists(_id) returns (Batch memory) {
        return batches[_id];
    }

    function getStage(uint256 _id) external view batchExists(_id) returns (Stage) {
        return batches[_id].stage;
    }
}
