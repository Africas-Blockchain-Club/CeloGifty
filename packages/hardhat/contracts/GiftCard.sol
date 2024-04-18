// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract GiftCard {
    uint256 balance;

    struct Card {
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
    }

    struct Merchant {
        address merchantID;
        string name;
    }

    // mapping each gift card to it's ID
    mapping(string => Card) cards;
    mapping(address => Merchant) merchants;

    address[] public merchantAddresses;

    modifier isMerchantExists(address merchantAddress) {
        require(merchants[merchantAddress].merchantID != merchantAddress);
        _;
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

    function createMerchant(
        address merchantAddress,
        string memory name
    ) public isMerchantExists(merchantAddress) {
        merchants[merchantAddress] = Merchant(merchantAddress, name);
    }

    function createCard(
        address merchant,
        string memory _cardID,
        uint validThru,
        bool rechargable,
        bool transferable
    ) public {
        // create new gift card & map gift card to _cardID
        cards[_cardID] = Card({
            // issue date is now
            issueDate: block.timestamp,
            validUntil: validThru,
            rechargable: rechargable,
            transferable: transferable,
            value: 0,
            beneficiary: msg.sender,
            merchant: merchant,
            generatedBy: msg.sender
        });
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

    function confirmCreation(string memory _cardID) public payable {
        // confirmation to create a gift card
        // payable function
        // will receive funds from gift card creator and update giftcard [_cardID] with message value
        require(cards[_cardID].beneficiary == msg.sender);
        cards[_cardID].value = msg.value;
        balance += msg.value;
    }

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

    // function viewCards() {}
}
