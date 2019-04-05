// polyfill is required to use async in babel
// https://babeljs.io/docs/en/babel-polyfill#docsNav
import '@babel/polyfill'
import express from 'express'
import path from 'path'
const app = express()
const port = 8080

app.use('/', express.static(path.join(__dirname, '..', '..', 'firebase', 'public')))

import firebaseAdmin from 'firebase-admin'
import serviceAccount from './service_account.json'

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
})

app.get('/protected', async (req, res) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.substring(0, 7) === 'Bearer ') {
      const token = req.headers.authorization.substring(7)
      try {
        // https://firebase.google.com/docs/auth/admin/verify-id-tokens
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token)
        res.json({
          message: 'Authorized result',
          ...decodedToken
        })
      } catch (err) {
        res.status(401)
        res.json({
          error: 'Provided token is not valid'
        })
      }
    } else {
      res.status(400)
      res.json({
        error: 'Invalid authorization format'
      })
    }
  } else {
    res.json({
      message: 'This is an unauthorized result'
    })
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
