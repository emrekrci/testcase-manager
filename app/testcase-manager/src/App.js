import React, {useEffect, useState } from 'react';



export default function App() {

  const[testcases, setTestcases] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/testcases").then(response => response.json()).then(data => setTestcases(data));
    
  },[]) 

  return(
      
      <div>


        {testcases.map((testcase) => (
            <h4>{testcase.name}</h4>
        ))}
      </div>
  )
}
