// src/api/joomla.ts
import axios from 'axios'
import CONFIG from '@/configs/config'

const jaxios = axios.create({
  baseURL: CONFIG.apiUrl, // '/index.php'
  withCredentials: false, // jeśli używasz sesji/cookies Joomla
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  // Parametry wspólne dla wszystkich zapytań Joomla
  //option=com_thapi&task=api....&format=json
  params: {
    option: 'com_thapi',
    format: 'json',
    task: 'api', // zostanie nadpisane w konkretnym endpointcie
  },
})

export const jaxios2 = axios.create({
  baseURL: CONFIG.apiUrl, // '/index.php'
  withCredentials: false, // jeśli używasz sesji/cookies Joomla
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  params: {
    option: 'com_ewidencjaofertedukacyjnych',
    format: 'json',
    task: 'api', // zostanie nadpisane w konkretnym endpointcie
  },
})

export default jaxios