const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Nuevo mensaje de contacto',
      text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.send('Correo enviado exitosamente.');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
