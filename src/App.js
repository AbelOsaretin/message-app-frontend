import logo from "./logo.svg";
import "./App.css";
import { abi, contractAddress } from "./constants.js";
const { ethers } = require("ethers");

function App() {
  async function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    //const signer = provider.getSigner();

    console.log("Wallet Connected............");
    // console.log(signer);
  }

  async function sendMessage() {
    const newMessage = document.getElementById("newMessage").value;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    console.log("Wallet Connected............");

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transaction = await contract.setMessage(newMessage);
      await transaction.wait();
      console.log("Message Set");
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function receiveMessage() {
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
        <button onClick={connectWallet}>Connect Wallet</button>
        <button onClick={sendMessage}>Send Message</button>
        <input id="newMessage" placeholder="Enter Message"></input>
        <button onClick={receiveMessage}>View Message</button>
      </header>
    </div>
  );
}

export default App;
