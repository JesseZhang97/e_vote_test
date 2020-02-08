pragma solidity >= 0.5.0 < 0.7.0;
contract Election {
  struct Candidate {
      uint id;
      string name;
      uint voteCount;
  }
  mapping(address => bool) public voters;//TODO
  mapping(uint => Candidate) public candidates;//TODO
  uint public candidatesCount;
    event votedEvent (
        uint indexed _candidateId
    );
  constructor() public {
    addCandidate("竞选者1");
    addCandidate("竞选者2");
  }
  function addCandidate (string memory _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }
  function vote (uint _candidateID) public {
    require(!voters[msg.sender]);
    require(_candidateID > 0 && _candidateID <= candidatesCount);
    voters[msg.sender] = true;
    candidates[_candidateID].voteCount ++;
    emit votedEvent(_candidateID);
  }
}
