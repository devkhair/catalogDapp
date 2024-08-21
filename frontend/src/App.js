import React from 'react';
// import './App.css';
import {ethers} from 'ethers'
import contractAbi from './abi.json'

function App() {
  const [connected, setConnected] = React.useState(false)
  const [bookInfo, setBookInfo] = React.useState(false)
  const [name, setName] = React.useState("")
  const [year, setYear] = React.useState("")
  const [updateStatus, setUpdateStatus] = React.useState("")
  const [refresh, setRefresh] = React.useState(0)
  const [contract, setContract] = React.useState(null)
  const contractAddress= "0x6e72E3F2351C80D68577A1884D542e533F2D6079"

  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'})
  }

  async function handleConnected(){
    if(!connected){
      if(typeof window.ethereum != 'undefined'){
        await requestAccount()
        const provider= new ethers.BrowserProvider(window.ethereum)
        const signer= await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)
        setContract(contract)
        setConnected(true)
      }
    } 
  }

  async function handleBookNameUpdate(){
    setName("")
    setUpdateStatus("Updating..........")
    if(contract && connected){
      try {
        const transaction= await contract.updateBookName(name)
        await transaction.wait()
        setUpdateStatus("")
        setRefresh(refresh+1)
      }
      catch(e){
        setUpdateStatus("error")
      }
    }
  }

  async function handleBookYearUpdate(){
    setYear("")
    setUpdateStatus("Updating..........")
    if(contract && connected){
      try {
        const transaction= await contract.updatePublicationYear(year)
        await transaction.wait()
        setUpdateStatus("")
        setRefresh(refresh+1)
      }
      catch(e){
        setUpdateStatus("error")
      }
    }
  }

  React.useEffect(()=>{
      (async function getRegistry(){
        if(contract && connected){
          try {
            const transaction= await contract.getBookDetails()
            setBookInfo(Object.values(transaction))
          }
          catch(e){
            console.log("book details not gotten")
          }
        }
      })()
  }, [contract, connected, refresh])

  return (
    (
      <div className="App">
  <button 
    onClick={(e) => { handleConnected(e) }} 
    style={{ 
      padding: '10px 20px', 
      fontSize: '16px', 
      backgroundColor: '#007bff', 
      color: '#fff', 
      border: 'none', 
      borderRadius: '5px', 
      cursor: 'pointer' 
    }}
  >
    Connect
  </button>
  <small style={{ marginLeft: '10px' }}>
    {connected ? "Connected" : "Not connected"}
  </small>

  <header className="App-header" style={{ marginTop: '30px' }}>
    <div>
      <h2>Book Details</h2>
      {bookInfo ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '10px', borderBottom: '1px solid #ddd' }}>Name</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{bookInfo[0]}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '10px', borderBottom: '1px solid #ddd' }}>Year</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{parseInt(bookInfo[1])}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div style={{ color: 'black', fontSize: '15px', marginTop: '15px' }}>
          Waiting to connect.......
        </div>
      )}
    </div>

    <div style={{ marginTop: '30px' }} className="Edit">
      <h3>Update Book Catalog</h3>
      <div style={{ fontSize: '12px', color: 'black', marginBottom: '10px' }}>
        {updateStatus}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input 
          onChange={(e) => { setName(e.target.value) }} 
          value={name} 
          placeholder="Enter book name" 
          style={{
            padding: '10px',
            fontSize: '14px',
            width: '200px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}
        />
        <button 
          onClick={handleBookNameUpdate}
          style={{ 
            padding: '10px 20px', 
            fontSize: '14px', 
            backgroundColor: '#28a745', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Update Name
        </button>
      </div>

      <div>
        <input 
          onChange={(e) => { setYear(e.target.value) }}  
          value={year} 
          placeholder="Enter publication year" 
          style={{
            padding: '10px',
            fontSize: '14px',
            width: '200px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}
        />
        <button 
          onClick={handleBookYearUpdate}
          style={{ 
            padding: '10px 20px', 
            fontSize: '14px', 
            backgroundColor: '#ffc107', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Update Year
        </button>
      </div>
    </div>
  </header>
</div>

    )    
  );
}

export default App;
