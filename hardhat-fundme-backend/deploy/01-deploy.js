const { hexValue } = require("ethers/lib/utils");
const { TASK_DEPLOY_RUN_DEPLOY } = require("hardhat-deploy");

async function deploy() {
  const Fundme = await ethers.getContractFactory("FundMe");
  const fund = await Fundme.deploy();
  console.log("Deployment Success");
  const address = fund.address;
  console.log(address);
  const send = await fund.fund({ value: 10 });
  console.log(send);
}
module.exports.default = deploy();
