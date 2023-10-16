import React, { useState } from 'react'
import { getFirestore , addDoc , serverTimestamp , collection , query , orderBy , limit , getDocs} from "firebase/firestore"
import { app } from "../firebase"
import "./Share.css";

const firestore = getFirestore(app);

const Share = () => {
  const [message, setMessage] = useState("")
  const [code, setCode] = useState("")
  const [text, setText] = useState("")
  const [encode, setEncode] = useState("")

const writeData = async () => {
  const  result = await addDoc(collection(firestore,"user"),{
    code: code,
    message: message,
    timestamp: serverTimestamp(),
});


}

const getDocumentByQuery = async () => {
  const collectionRef = collection(firestore , "user");
  const q = query( collectionRef , orderBy('timestamp','desc'), limit(1) );
  const getSnapshot = await getDocs( q );
  getSnapshot.forEach((doc) => {
      const data = doc.data();
      
      
      if (encode === data.code) {
          setText(`${data.message}`)
          
      } else {
          console.log("wrong");
      }
      
      
  });
};

  return (
    <div className='container' >
      <div className='top-text'>
          <label className='text-1' >Enter text here</label>
          <div >            
          <input className='input-container' type="text" onChange={(e)=>setMessage(e.target.value)} value={message} />
          </div>
      </div>
      <div className='text-2'>
          <label className='text-1' >Code (optional)</label>
          <br />
          <input className='' type="text" placeholder='Code' onChange={(e)=>setCode(e.target.value)} value={code} />
          <br />
          <div className=''>
          <button className='' onClick={writeData} >Share Text</button>
          </div>
      </div>
          <br />
      <div className='part-3 div' >
            <label className='text-1' >Enter decryption code here</label>
            <input type="text" placeholder='Decryption code' onChange={(e)=>setEncode(e.target.value)} value={encode} />
        <button onClick={getDocumentByQuery}>Get Text</button>
        <h1>Text</h1>
      </div>
        <p>{text}</p>
    </div>
  )

}

export default Share