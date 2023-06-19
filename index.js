require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')


//const client = ZoomMtgEmbedded.createClient()

const app = express()
const port = process.env.PORT || 4000

{/* <script src="https://source.zoom.us/2.1.0/lib/vendor/react.min.js"></script>
<script src="https://source.zoom.us/2.1.0/lib/vendor/react-dom.min.js"></script>
<script src="https://source.zoom.us/2.1.0/lib/vendor/redux.min.js"></script>
<script src="https://source.zoom.us/2.1.0/lib/vendor/redux-thunk.min.js"></script>
<script src="https://source.zoom.us/2.1.0/lib/vendor/lodash.min.js"></script>
<script src="https://source.zoom.us/zoom-meeting-2.1.0.min.js"></script> */}

app.use(bodyParser.json(), cors())
app.options('*', cors())

app.get('/',(req,res) => {
  res.render('index.ejs');
});

app.post('/result', (req, res) => {

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const sdk = 'nfS8tiTyRILZC4XvXxe0Q'
  const oPayload = {
    sdkKey: sdk,
    mn: req.body.movie,
    role: "0",
    iat: iat,
    exp: exp,
    appKey: sdk,
    tokenExp: iat + 60 * 60 * 2
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, "5ACSU7jk0MNdwrJbAf0tiNml0EK4GcQR");

  
  res.render('meet.ejs',{data:signature});
  
})



app.listen(port, () => console.log(`Zoom Meeting SDK Auth Endpoint Sample Node.js listening on port ${port}!`))
