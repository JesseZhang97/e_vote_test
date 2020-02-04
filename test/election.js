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
});
