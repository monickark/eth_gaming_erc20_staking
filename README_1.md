## Lobby

# Testing
- `npm i -g truffle`
- `npm i -g ganache-cli`
- `truffle test test/challenge/challenge.test.js --network local`


### setGameStorage(address address_) 
    o Take address as perameter to set gameStorage address for using game interface

### setUsd(address address_) 
    o Take address as perameter to set USdToken address for using usd token interface

### setBonus(address address_) 
    o Take address as perameter to set BonusToken address for using bonus token interface
    
### setWinnerAndWinnings(uint256 winnerCount_,uint256[] calldata winnings_)
    o winnerCount_ - take total winners count 
    o winnings_    - array of winnigs percentage configuration
    o it will map array of wiining with winners count

### takeFunds(uint256 challengeCharges, address player)
    o challengeCharges - entry fees to play game
    o player           - address of player
    o it will check player address has funds of usd and bonus token in respective the ratio of 90/10 and transfer that require funds to contract itself.

### joinLobby(JoinLobby joinLobbyReq)
    o joinLobbyReq - take a structure of values (player, playOptionId, channelOpId)
    o this function will set rakeId for every player by gameId or channelOpId or default. Then it will add this player in to lobby with details (player, playOptionId, channelOpId, rakeId, usd, bonus).

### exitLobby(address player_)
    o player_ - address of player who wants to leave lobby
    o This function check that player has not joined room and player is exist in lobby. Then it will transfer back his deposited amount back to his address and remove from lobby.

 ### createDeathMatchRoom(address [] player_, string roomId_, string playOptionId_)
    o players_      - array of addresses of player who gonna play deathmatch
    o roomId_       - unique string id to identify deathmatch rooms
    o playOptionId_ - playOptionId to get all game configuration like entryfess, no of players and all.
    o This function will create the room for players who are going to play for same playOptionId. It will check that players in array are not more then number of players in play configuration. Then it will calculate total deposits for perticular room and add mappings like player in room, playoptionId by room and usd deposit by room.

 ### endDeathMatchRoom(address[] winners_, string roomId_)
    o winners_ - array of winners users address
    o roomId_ - roomId to get details of room
    o This function will take room details by roomid and calculate the winning of each player from mapping of winning configuration and transfer winning ammounts to winner's address. if needed it will mint token to contract it self. then it will call distribute rake function to distribute rake if extra usd is not minted.

### distributeRake(string roomId_, uint256 usdTransferred_)
    o roomId_         - roomId to get details of room
    o usdTransferred_ - total winning transferd amount 
    o this function will check that total transfferd winning usd is less then usd deposit. after that it will average the rake amount by total players in room and distribute average rake amount with each player rakeId configuration.

### exitDeathMatchRoom(string roomId_)
    o roomId_ - roomId to get details of room
    o this fucntion will transfer all deposited amount of every player in room to their address and remove all room player from room and lobby. 
