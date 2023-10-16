import React, { useState } from 'react'
import { getFirestore , addDoc , serverTimestamp , collection , query , orderBy , limit , getDocs} from "firebase/firestore"
import { app } from "../firebase"

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
console.log("result",result);

}

const getDocumentByQuery = async () => {
  const collectionRef = collection(firestore , "user");
  const q = query( collectionRef , orderBy('timestamp','desc'), limit(1) );
  const getSnapshot = await getDocs( q );
  getSnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Last document data:', data);
      console.log(data.message);
      
      if (encode === data.code) {
          setText(`${data.message}`)
          
      } else {
          console.log("wrong");
      }
      console.log(data.code)
      
  });
};

  return (
    <div>
          <label>Enter text here</label>
          <input type="text" placeholder='Text' onChange={(e)=>setMessage(e.target.value)} value={message} />
          <br />
          <label>Enter code (optional)</label>
          <input type="text" placeholder='Code' onChange={(e)=>setCode(e.target.value)} value={code} />
          <br />
          <button onClick={writeData} >Share Text</button>
          <br />
            <label>Enter encryption code here</label>
            <input type="text" placeholder='Encryption code' onChange={(e)=>setEncode(e.target.value)} value={encode} />
        <button onClick={getDocumentByQuery}>Get Text</button>
        <h1>Text</h1>
        <p>{text}</p>
    </div>
  )

}

export default Share