import { useState } from 'react'
import Form from './components/Form'
import Application from './components/Application'
import { getDataTemplate } from './dataTemplates'

import './App.css'

function App() {
  const [loadFormIfTrue, setLoadFormIfTrue] = useState(true);
  const [data, setData] = useState(getDataTemplate());

  if (loadFormIfTrue) {
    return <Form setLoadFormIfTrue={setLoadFormIfTrue} data={data} updateData={setData}></Form>
  } else {
    return <Application setLoadFormIfTrue={setLoadFormIfTrue}></Application>
  }
}

export default App
