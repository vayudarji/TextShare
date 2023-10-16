import React, { useState } from 'react'
import { getFirestore , addDoc , serverTimestamp} from "firebase/firestore"
import { app } from "../firebase"

const firestore = getFirestore(app);

const writeData = async () => {
  const [message, setMessage] = useState("")
  const  result = await addDoc(collection(firestore,"user"),{
    code: code,
    message: message,
    timestamp: serverTimestamp(),
});
console.log("result",result);

}

const Share = () => {
  return (
    <div>
          <label>enter text here</label>
          <input type="text" placeholder='text here' onChange={(e)=>setMessage(e.target.value)} value={message} />
          <button onClick={writeData} >add data</button>
          <br />
    </div>
  )
}

export default Share