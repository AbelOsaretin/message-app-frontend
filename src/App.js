import logo from "./logo.svg";
import "./App.css";
import { abi, contractAddress } from "./constants.js";
//import { ethers } from "ethers";
const { ethers } = require("ethers");

//const { ethers } = require("ethers");

function App() {
  /*   const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const signer = provider.getSigner();
  console.log(signer); */

  //const provider = new ethers.providers.Web3Provider(window.ethereum);
  //const contract = new ethers.Contract(contractAddress, abi, provider);

  async function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    console.log("Wallet Connected............");
    // console.log(signer);
  }

  async function sendMessage(newMessage) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    console.log("Wallet Connected............");

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transaction = await contract.setMessage("Hello Boss");
      await transaction.wait();
      console.log("Message Set");
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function receiveMessage() {
    /*     const message = await contract.getMessage();
    console.log("Message:", message.toString()); */
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    console.log("Wallet Connected............");

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transaction = await contract.getMessage();
      //await transaction.wait();
      console.log(transaction);
      console.log("Message Retrieved");
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={connectWallet}>Conncect Wallet</button>
        <button onClick={sendMessage}>Send Message</button>
        <button onClick={receiveMessage}>View Message</button>
      </header>
    </div>
  );
}

export default App;
