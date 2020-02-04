pragma solidity >= 0.5.0 < 0.7.0;

contract Election {
  struct Candidate {
      uint id;
      string name;
      uint voteCount;
  }
  mapping(uint => Candidate) public candidates;
  uint public candidatesCount;
  constructor() public {
    addCandidate("竞选者1");
    addCandidate("竞选者2");
  }
  function addCandidate (string memory _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);

  }

}
