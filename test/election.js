const Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
  var electionIntance;
  it("initializes with 2 candidates", function() {
    return Election.deployed().then(function(instance) {
        return instance.candidatesCount();
      }).then(function(count) {
        assert.equal(count, 2);
      });
  });

  it("it initializes the candidates with the correct values", function() {
    return Election.deployed().then(function(instance) {
      electionIntance = instance;
      return electionIntance.candidates(1);
    }).then(function(candidate) {
      assert.equal(candidate[0], 1, "right ID");
      assert.equal(candidate[1], "竞选者1", "right NAME");
      assert.equal(candidate[2], 0, "right VOTES");
      return electionIntance.candidates(2);
    }).then(function(candidate) {
      assert.equal(candidate[0], 2, "right ID");
      assert.equal(candidate[1], "竞选者2", "right NAME");
      assert.equal(candidate[2], 0, "right VOTES");
    });
  });
  it("allows a voter to cast a vote", function() {
    return  Election.deployed().then(function(instance) {
      electionIntance = instance;
      candidateID = 1;
      return electionIntance.vote(candidateID, { from: accounts[0]});
    }).then(function(receipt) {
      return electionIntance.voters(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted");
      return electionIntance.candidates(candidateID);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1,"increments the candidate's vote count");
    })
  });
  it("throws an exception for invalid candiates", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
    });
  });
});
