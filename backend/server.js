const Joi = require("joi");
const express = require("express");
const { sequelize, Appointment } = require("./models");

const app = express();
const port = 3000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/appointment", async (req, res) => {
  // request validation
  const schema = Joi.object({
    datetime: Joi.date()
        .timestamp()
        .greater("now")
        .required(),
    name: Joi.string()
        .min(1)
        .max(50)
        .alphanum()
        .required(),
    phone: Joi.string()
        .min(6)
        .required()
  });

  try {
    await schema.validateAsync(req.body);
  }
  catch (err) { 
    return res.status(400).send({
      status: "error",
      details: err.details
    });
  }

  const {datetime, name, phone} = req.body;

  const appointment = await Appointment.create({ datetime, name, phone });

  res.send({
    status: "success",
    appointmentId: appointment.id,
  });
});

// test the connection to the database

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

process.on('SIGTERM', async () => {
  debug('SIGTERM signal received: closing HTTP server');

  try {
    await sequelize.close();
  } catch {}

  server.close(() => {
    debug('HTTP server closed')
  })
})