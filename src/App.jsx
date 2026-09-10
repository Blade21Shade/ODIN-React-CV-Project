import { useState } from 'react'
import Form from './components/Form'
import Application from './components/Application'

import './App.css'

function App() {
  const [loadFormIfTrue, setLoadFormIfTrue] = useState(true);

  if (loadFormIfTrue) {
    return <Form setLoadFormIfTrue={setLoadFormIfTrue}></Form>
  } else {
    return <Application setLoadFormIfTrue={setLoadFormIfTrue}></Application>
  }
}

export default App
