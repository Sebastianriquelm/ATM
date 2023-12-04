require('dotenv').config()

const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const { readdir } = require('fs/promises')
const mime = require('mime-types')
const pool = require('./db')

const PORT = process.env.PORT || 3000

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/Images')
  },
  filename: (req, file, cb) => {
    const { atmId } = req.body
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const fullDateString = `${year}-${formartNumber(month)}-${formartNumber(day)}`
    cb(null, `${atmId}-${fullDateString}-${file.fieldname}.${mime.extension(file.mimetype)}`)
  }
})

const upload = multer({ storage })

const app = express()

// middlewares
app.use(cors())
app.use(express.json()) // req.body

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.static('public', options))

// routes
// create services
//-----------------------
// corregir para validar
//-----------------------
app.get('/atm/:id', async (req, res) => {
  const { id } = req.params
  const selectQuery = `SELECT location FROM atm WHERE atm_id = ${id}`
  try {
    const response = await pool.query(selectQuery)
    const location = response.rows[0] ? response.rows[0].location : false
    res.json({ "location": location })
  } catch (error) {
    console.error(error)
  }
})

const fieldsUploadsAtmsite = upload.fields([
  { name: 'photo1' },
  { name: 'photo2' },
  { name: 'photo3' },
  { name: 'photo4' },
  { name: 'photo5' },
  { name: 'photo6' },
])

app.post('/atm-site', fieldsUploadsAtmsite, async (req, res) => {
  try {
    /*const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const fullDateString = `${year}-${formartNumber(month)}-${formartNumber(day)}`*/
    const {
      atmId,
      auditorname,
      day,
      ATMaccesscontrol,
      OperationalAccessControl,
      ElectricalConnections,
      GeneralstatusATMspace,
      floorState,
      Statewalls,
      Doorstatus,
      Stateheavens,
      Airconditioningstatus,
      lightingstatus,
      Furniturecondition,
      Statemonitoringcameras
    } = req.body

    /*const newAtmIfDoesntExist = await pool.query(`
    INSERT INTO atm_validation (
      atm_id,
      auditorname
    )
    VALUES ($1, $2)
    ON CONFLICT (atm_id) DO
    UPDATE
    SET auditorname = $2
    WHERE atm_validation.atm_id = $1;])*/

    const newAtmAtmsite = await pool.query(`
      INSERT INTO atm_site (
        atm_id,
        auditorname,
        day,
        ATMaccesscontrol,
        OperationalAccessControl,
        ElectricalConnections,
        GeneralstatusATMspace,
        floorState,
        Statewalls,
        Doorstatus,
        Stateheavens,
        Airconditioningstatus,
        lightingstatus,
        Furniturecondition,
        Statemonitoringcameras)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);
    `, [atmId,
      day,
      auditorname,
      ATMaccesscontrol,
      OperationalAccessControl,
      ElectricalConnections,
      GeneralstatusATMspace,
      floorState,
      Statewalls,
      Doorstatus,
      Stateheavens,
      Airconditioningstatus,
      lightingstatus,
      Furniturecondition,
      Statemonitoringcameras
    ])

    res.json(newAtmAtmsite)
    console.log("insert", newAtmAtmsite);
  } catch (error) {
    console.log("errorrr")
    console.error(error)
    res.sendStatus(500)
  }
})

const fieldsUploadsPhysicalAtm = upload.fields([
  { name: 'photo1' },
])
app.post('/Physical-Atm', fieldsUploadsPhysicalAtm, async (req, res) => {
  try {
    /*const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const fullDateString = `${year}-${formartNumber(month)}-${formartNumber(day)}`*/
    const {
      atmId,
      day,
      auditorname,
      ATMscreenstatus,
      ATMKeyboardstatus,
      DamagedATMkeypads,
      keyboardcovers,
      legiblereceipt,
      ATMtrash,
      ATMpresentation
    } = req.body

    /*const newAtmIfDoesntExist = await pool.query(`
    INSERT INTO atm_validation (
      atm_id,
      auditorname
    )
    VALUES ($1, $2)
    ON CONFLICT (atm_id) DO
    UPDATE
    SET auditorname = $2
    WHERE atm_validation.atm_id = $1;])*/

    const newPhysicalAtm = await pool.query(`
      INSERT INTO physical_atm (
        atm_id,
        day,
        auditorname,
        atmscreenstatus,
        atmkeyboardstatus,
        damagedatmkeypads,
        keyboardcovers,
        legiblereceipt,
        atmtrash,
        atmpresentation
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      atmId,
      day,
      auditorname,
      ATMscreenstatus,
      ATMKeyboardstatus,
      DamagedATMkeypads,
      keyboardcovers,
      legiblereceipt,
      ATMtrash,
      ATMpresentation
    ])

    res.json(newPhysicalAtm)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

app.post('/atm-signage', fieldsUploadsPhysicalAtm, async (req, res) => {
  try {
    /*const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const fullDateString = `${year}-${formartNumber(month)}-${formartNumber(day)}`*/
    const {
      atmId,
      day,
      auditorname,
      VisaSticker,
      VisaAdhesivedesign,
      Visastickermeetslocation,
      Mastercardsticker,
      MastercardAdhesivedesign,
      Mastercardstickermeetslocation,
      VisibleATMNumber,
      AtmSafetySignage,
      AtmSafetyMeasuresSignageStopDisc,
      Redbanctape,
      Redbanctapelocation,
      redbanctapemeetslength,
      redbancribbonmeetsdesign,
      GraphiconthesideofAtm,
      floorchart
    } = req.body

    /*const newAtmIfDoesntExist = await pool.query(`
    INSERT INTO atm_validation (
      atm_id,
      auditorname
    )
    VALUES ($1, $2)
    ON CONFLICT (atm_id) DO
    UPDATE
    SET auditorname = $2
    WHERE atm_validation.atm_id = $1;
  `, [atmId, auditorname])*/

    const newAtmAtmSignage = await pool.query(`
      INSERT INTO atm_signage (
        atm_id,
        day,
        auditorname,
        Visa_Sticker,
        Visa_Adhesive_design,
        Visa_sticker_meets_location,
        Mastercard_sticker,
        Mastercard_Adhesive_design,
        Mastercard_sticker_meets_location,
        Visible_ATM_Number,
        Atm_Safety_Signage,
        Atm_Safety_Measures_Signage_StopDisc,
        Redbanc_tape,
        Redbanc_tape_location,
        redbanc_tape_meets_length,
        redbanc_ribbon_meets_design,
        Graphic_on_the_side_of_Atm,
        floor_chart
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    `, [
      atmId,
      day,
      auditorname,
      VisaSticker,
      VisaAdhesivedesign,
      Visastickermeetslocation,
      Mastercardsticker,
      MastercardAdhesivedesign,
      Mastercardstickermeetslocation,
      VisibleATMNumber,
      AtmSafetySignage,
      AtmSafetyMeasuresSignageStopDisc,
      Redbanctape,
      Redbanctapelocation,
      redbanctapemeetslength,
      redbancribbonmeetsdesign,
      GraphiconthesideofAtm,
      floorchart
    ])

    res.json(newAtmAtmSignage)
    console.log("insert", newAtmAtmSignage);
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})
const fieldsUploadsexteriorsignage = upload.fields([
  { name: 'photo1' },
])
app.post('/exterior-signage', fieldsUploadsexteriorsignage, async (req, res) => {
  try {
    /*const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const fullDateString = `${year}-${formartNumber(month)}-${formartNumber(day)}`*/
    const {
      atmId,
      auditorname,
      day,
      RedbancOutdoorSignage,
      Exteriorwallsignage,
      Exteriorsignageselfadhesivelogo,
      Exteriorsignageselfadhesivelogook

    } = req.body
    console.log("aqui", atmId);

    /*if (atmId !== null && atmId !== undefined) {
      const newAtmIfDoesntExist = await pool.query(`
    INSERT INTO atm_validation (
      atm_id,
      auditorname
    )
    VALUES ($1, $2)
    ON CONFLICT (atm_id) DO
    UPDATE
    SET auditorname = $2
    WHERE atm_validation.atm_id = $1;
  `, [atmId, auditorname])
    } else {
      console.error('Error: El valor de atmId es nulo o indefinido.');
      // Puedes manejar este caso de alguna manera, ya sea lanzando un error, registrando información, etc.
    }*/

    const newAtmExteriorSignage = await pool.query(`
      INSERT INTO exterior_signage (
        atm_id,
        auditorname,
        day,
        Redbanc_Outdoor_Signage,
        Exterior_wall_signage,
        Exterior_signage_selfadhesive_logo,
        Exterior_signage_selfadhesive_logo_ok
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      atmId,
      auditorname,
      day,
      RedbancOutdoorSignage,
      Exteriorwallsignage,
      Exteriorsignageselfadhesivelogo,
      Exteriorsignageselfadhesivelogook
    ])

    res.json(newAtmExteriorSignage)
    console.log("insert", newAtmExteriorSignage);
  } catch (error) {
    console.log("errrorrrrere")
    console.error(error)
    res.sendStatus(500)
  }
})
const fieldsUploadsAtmidentity = upload.fields([
  { name: 'photo1' },
  { name: 'photo2' },
  { name: 'photo3' },

])
app.post('/atm-identity', fieldsUploadsAtmidentity, async (req, res) => {
  try {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Formatea los componentes de tiempo para tener dos dígitos (por ejemplo, 01 en lugar de 1)
    const formatedHours = formartNumber(hours);
    const formatedMinutes = formartNumber(minutes);

    // Crea la cadena de fecha y hora
    const fullDateString = `${year}-${formartNumber(month)}-${formartNumber(day)} ${formatedHours}:${formatedMinutes}`;
    const {
      atmId,
      auditorname,
      ATMaddress,
      city,
      ClientName,
      Region
    } = req.body

    console.log("Fechaaaaa", atmId,
      auditorname, fullDateString, ATMaddress, city,
      ClientName,
      Region
    );

    /*const newAtmIfDoesntExist = await pool.query(`
      INSERT INTO atm_validation (
        atm_id,
        auditorname
      )
      VALUES ($1, $2)
      ON CONFLICT (atm_id) DO
      UPDATE
      SET auditorname = $2
      WHERE atm_validation.atm_id = $1;
    `, [atmId, auditorname])*/

    const newAtmAtmValidation = await pool.query(`
      INSERT INTO atm_validation (
        atm_id,
        day,
        auditorname,
        ATMaddress,
        city,
        ClientName,
        Region
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [atmId,
      day,
      auditorname,
      ATMaddress,
      city,
      ClientName,
      Region
    ])

    res.json(newAtmAtmValidation)
    console.log("insert", newAtmAtmValidation);

  } catch (error) {
    console.log("errorrr")
    console.error(error)
    res.sendStatus(500)
  }
})
app.get('/api/get-service-data/:atmId/:serviceType', (req, res) => {
  const { atmId, serviceType } = req.params
  pool.query(`SELECT day FROM ${serviceType} WHERE atm_id = ${atmId}`)
    .then(serviceInfo => res.json(serviceInfo.rows))
    .catch(error => console.error(error))
})

app.get('/api/get-service-data/:atmId/:date/:serviceType', async (req, res) => {
  const { atmId, date, serviceType } = req.params
  const imagesFiles = await readdir('./public/Images')
  const filteredFiles = imagesFiles.filter(file => file.includes(`${atmId}-${date}`))
  pool.query(`SELECT * FROM ${serviceType} WHERE atm_id = ${atmId} AND day = '${date}'`)
    .then(serviceInfo => res.json([serviceInfo.rows[0], filteredFiles]))
    .catch(error => console.error(error))
})

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`)
})

function formartNumber(number) {
  return `${number}`.padStart(2, '0')
}