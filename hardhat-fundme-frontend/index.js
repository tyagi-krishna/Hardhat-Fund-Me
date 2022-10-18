import { ethers } from "./ethers.js";
import { abi, contractAddress } from "./constants.js";

const connectbutton = document.getElementById("connectbutton");
const connectheading = document.getElementById("connectheading");
const fundmebutton = document.getElementById("fundmebutton");
const transactionResponse = document.getElementById("transactionResponse");
connectbutton.onclick = connect;
fundmebutton.onclick = fund;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    connectheading.innerHTML = "connected";
  } else {
    connectheading.innerHTML = "No Metamask Found";
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethamount").value;
  console.log(`Amount is ${ethAmount}`);
  if (typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    });
    console.log(transactionResponse);
    transactionResponse.innerHTML = "Transaction Successfull";
  } else {
    console.log("No metamask Found");
    connectheading.innerHTML = "No Metamask Found";
  }
}

async function withdraw() {}
