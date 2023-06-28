const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game3", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer_1 = ethers.provider.getSigner(0);
    const signer_2 = ethers.provider.getSigner(1);
    const signer_3 = ethers.provider.getSigner(2);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    // const address = await signer.getAddress();

    return { game, signer_1, signer_2, signer_3 };
  }

  it("should be a winner", async function () {
    const { game, signer_1, signer_2, signer_3 } = await loadFixture(
      deployContractAndSetVariables
    );

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(signer_1).buy({ value: "2" });
    await game.connect(signer_2).buy({ value: "3" });
    await game.connect(signer_3).buy({ value: "1" });

    const address_1 = await signer_1.getAddress();
    const address_2 = await signer_2.getAddress();
    const address_3 = await signer_3.getAddress();

    // TODO: win expects three arguments
    await game.win(address_1, address_2, address_3);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
