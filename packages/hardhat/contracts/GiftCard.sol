// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract GiftCard {
    uint256 balance;

    struct User {
        address uid;
        bool isMerchant;
    }

    struct Card {
        string cardID;
        // value || balance available in gift card
        uint value;
        // issue date of gift card [when was the card issued]
        uint256 issueDate;
        // till when is the card valid before expiration
        uint validUntil;
        // gift card benefiary [only beneficiary can make transactions with the card]
        address beneficiary;
        // can the gift card be topped up
        bool rechargable;
        // address the card was issued to
        address generatedBy;
        // can the beneficiary of the gift card be transfered
        bool transferable;
        // where can the gift card be used | TODO: nil address should mean card is universal
        address merchant;
        string merchantName;
    }

    struct Merchant {
        address merchantID;
        string name;
    }

    // mapping each gift card to it's ID
    mapping(string => Card) cards;
    mapping(address => Merchant) merchants;
    mapping(address => User) users;

    address[] public merchantAddresses;
    string[] public cardIDs;

    modifier isMerchantExists(address merchantAddress) {
        require(merchants[merchantAddress].merchantID != merchantAddress);
        _;
    }

    modifier isUserExists() {
        require(users[msg.sender].uid != msg.sender);
        _;
    }

    function createUser(bool ismerchant) public isUserExists {
        users[msg.sender] = User(msg.sender, ismerchant);
    }

    function getUser() public view returns (bool, bool) {
        if (users[msg.sender].uid == msg.sender) {
            return (true, users[msg.sender].isMerchant);
        } else {
            return (false, false);
        }
    }

    function createMerchant(
        string memory name
    ) public isMerchantExists(msg.sender) {
        merchants[msg.sender] = Merchant(msg.sender, name);
        users[msg.sender] = User(msg.sender, true);
        merchantAddresses.push(msg.sender);
    }

    function getMerchants() public view returns (Merchant[] memory) {
        Merchant[] memory allMerchants = new Merchant[](
            merchantAddresses.length
        );

        for (uint y = 0; y < merchantAddresses.length; y++) {
            allMerchants[y] = merchants[merchantAddresses[y]];
        }
        return allMerchants;
    }

    function createCard(
        address merchant,
        string memory _cardID,
        uint validThru,
        bool rechargable,
        bool transferable
    ) public payable {
        // create new gift card & map gift card to _cardID
        cards[_cardID] = Card({
            cardID: _cardID,
            // issue date is now
            issueDate: block.timestamp,
            validUntil: validThru,
            rechargable: rechargable,
            transferable: transferable,
            value: 0,
            beneficiary: msg.sender,
            merchant: merchant,
            generatedBy: msg.sender,
            merchantName: merchants[merchant].name
        });

        require(cards[_cardID].beneficiary == msg.sender);
        cards[_cardID].value = msg.value;
        balance += msg.value;
        cardIDs.push(_cardID);
    }

    function viewCard(
        string memory _cardID
    )
        public
        view
        returns (
            address merchant,
            string memory cardId,
            uint value,
            address generatedBy,
            bool transferable,
            address beneficiary
        )
    {
        // view card with ID

        // get card
        Card memory card = cards[_cardID];

        // card can only be viewed by it's beneficiary
        require(
            card.beneficiary == msg.sender,
            "Cards can only be viewed by their beneficiaries"
        );

        // return card
        return (
            card.merchant,
            _cardID,
            card.value,
            card.generatedBy,
            card.transferable,
            card.beneficiary
        );
    }

    // function confirmCreation(string memory _cardID) public payable {
    //     // confirmation to create a gift card
    //     // payable function
    //     // will receive funds from gift card creator and update giftcard [_cardID] with message value
    //     require(cards[_cardID].beneficiary == msg.sender);
    //     cards[_cardID].value = msg.value;
    //     balance += msg.value;
    // }

    function redeemCard(
        string memory _cardID,
        address payable recipient,
        uint256 amount
    ) public {
        // gift card must belong to redeemin account
        require(
            cards[_cardID].beneficiary == msg.sender,
            "address is not authorized to make transaction"
        );

        // gift card must have sufficient value > amount
        require(cards[_cardID].value > amount, "Insufficient amount");

        // gift card must be for valid merchant
        require(
            cards[_cardID].merchant == recipient,
            "Invalid merchant address"
        );

        // send funds to merchant
        recipient.transfer(amount);

        // update gift card value
        cards[_cardID].value -= amount;

        // update contract balance
        balance -= amount;
    }

    function transferCard(string memory _cardID, address beneficiary) public {
        // current beneficiary must belong to func caller
        require(cards[_cardID].beneficiary == msg.sender);

        // can the card be transfered to another beneficiary
        require(cards[_cardID].transferable == true);

        // trasfer gift card to beneficiary
        cards[_cardID].beneficiary = beneficiary;
    }

    function viewCards() public view returns (Card[] memory) {
        Card[] memory _allCards = new Card[](cardIDs.length);

        for (uint y = 0; y < cardIDs.length; y++) {
            if (cards[cardIDs[y]].beneficiary == msg.sender) {
                _allCards[y] = cards[cardIDs[y]];
            }
        }
        return _allCards;
    }
}
