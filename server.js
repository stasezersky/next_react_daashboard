const express = require('express')
const next = require('next')
const bcrypt = require('bcrypt')
const session = require('express-session')
const bodyParser = require('body-parser')

const m2ProdFunctions = require('./lib/m2ServerSrc/prodFunctions')
const smProdFunctions = require('./lib/smServerSrc/controllers/prodFunctions')
const timeHelper = require('./lib/m2ServerSrc/timeHelper')
const moment = require('moment');
const m2Transformer = require('./lib/m2ServerSrc/m2DataTrasnformer')
const smTransformer = require('./lib/smServerSrc/helpers/smDataTransformer')
const merger = require('./lib/merger').merger
const rawPassword = require('./lib/auth/auth.config').password

let hashPassword

bcrypt.hash(rawPassword, 10, (err, enc) => {
  hashPassword = enc
})

let stateObj = { m2Data: {}, smData: {} }

async function m2UpdateServerData() {
  const timeframe = timeHelper.getDatesInTimeFrame('2018-8-1', moment().format('YYYY-MM-DD'));
  const data = await m2ProdFunctions.getWeeklyStatsFromMongo(timeframe)
  if (!data) {
    console.log("couldn't fetch data from M2")
    return
  }
  stateObj['m2Data'] = m2Transformer.transform(data)
  console.log('M2 data updated to state')
}

async function smUpdateServerData() {
  const timeframe = timeHelper.getDatesInTimeFrame('2018-8-1', moment().format('YYYY-MM-DD'));
  const data = await smProdFunctions.getAvgForWeeksFromMongo(timeframe)
  if (!data) {
    console.log("couldn't fetch data from SM");
    return
  }
  stateObj['smData'] = smTransformer.transform(data)
  console.log('sm data updated to state')
}

async function getState() {
  await m2UpdateServerData()
  await smUpdateServerData()
  stateObj = merger(stateObj)
  stateObj['dateOfUpdate'] = moment().format('YYYY-MM-DD, h:mm a')
}

getState()



const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use( bodyParser.json() )
    server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }))
    server.use(session({
      secret: 'wiser2019',
      resave: true,
      saveUninitialized: false
    }));
    server.route('/login')
      .post((req, res) => {
        if (req.session.user === 'genericUser') {
          res.redirect('/')
        } else {
          let insertPassword = req.body.password          
          bcrypt.compare(insertPassword, hashPassword, (err, same) => {
            if (same) {
              req.session.user = 'genericUser'
              res.redirect('/')
            } else {
              res.redirect('/login')
            }
          })

        }
      })
    server.route('/logout')
      .get((req, res) =>{
        if(req.session.user === 'genericUser'){
          delete req.session.user
        }
        res.redirect("/")
      })



    server.get('/api/getState', (req, res) => {
      res.send(stateObj)
    })
    server.get('/refreshState', (req, res) => {
      getState()
      res.send('state refreshed')
    })
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })


