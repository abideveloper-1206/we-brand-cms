import { getPayload } from 'payload'
import config from './src/payload.config.js'

async function run() {
  try {
    const payload = await getPayload({ config })
    console.log("Success")
  } catch (err) {
    console.error(err)
  }
}
run()
