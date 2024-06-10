const ExpressServer = require('./infrastructure/webserver/ExpressServer');
const farmerRoutes = require('./routes/farmerRoutes');
const engineerRoutes = require('./routes/engineerRoutes');
const sharedLandRoutes = require('./routes/sharedLandRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const endYearReportRoutes = require('./routes/endYearReportRoutes');
const leafAnalysisRoutes = require('./routes/leafAnalysisRoutes');
const soilAnalysisRoutes = require('./routes/soilAnalysisRoutes');
const refundRoutes = require('./routes/refundRoutes');
const reportRoutes = require('./routes/reportRoutes');
const gptRoutes = require('./routes/gptRoutes');
const dotenv = require("dotenv");
const connectToDatabase = require('./infrastructure/index');
const mongoose = require('mongoose');
// const {OpenAI} = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// console.log(process.env.OPENAI_API_KEY);

// const getChatResponse = async () => {
//   const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//       {
//           "role": "system",
//           "content": "You are a helpful assistant."
//       },
//       {
//         role: "user",
//         content: JSON.stringify([
//           { "type": "text", "text": "What is this?" },
//           { "type": "image_url", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/3-4-5_triangle.svg/1596px-3-4-5_triangle.svg.png" }
//         ])
//       }
//       ],
//       //messages: messages,
//       max_tokens: 300,
// });

// console.log(response.choices[0].message.content)

// //console.log(JSON.stringify(result, null, 2));
// }

// getChatResponse();

// const axios = require('axios');
// const fs = require('fs');

// const imageUrl = 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg';

// const getBase64Image = async (url) => {
//   const response = await axios.get(url, { responseType: 'arraybuffer' });
//   return Buffer.from(response.data, 'binary').toString('base64');
// };

// const main = async () => {
//   try {
//     const base64 = await getBase64Image(imageUrl);
//     console.log('Base64 Image:', base64);

//     // Write the base64 string to a file
//     const filePath = 'base64image.txt';
//     fs.writeFileSync(filePath, base64);
//     console.log(`Base64 image saved to ${filePath}`);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// main();

dotenv.config();

const startServer = async () => {
  await connectToDatabase();

  const server = new ExpressServer();

  server.app.use('/gpt-response', gptRoutes);
  
  server.app.use('/farmers', (req, res, next) => {
    req.db = mongoose.connection.db;
    next();
  }, farmerRoutes);

  server.app.use('/engineers', (req, res, next) => {
    req.db = mongoose.connection.db;
    next();
  }, engineerRoutes);

  server.app.use('/sharedLands', (req, res, next) => {
    req.db = mongoose.connection.db;
    next();
  }, sharedLandRoutes);

  server.app.use('/purchases', (req, res, next) => {
    req.db = mongoose.connection.db;
    next();
  }, purchaseRoutes);

  server.app.use('/endYearReports', (req, res, next) => {
    req.db = mongoose.connection.db;
    next();
  }, endYearReportRoutes);

  server.app.use('/leafAnalyses', (req, res, next) => {
    req.db = mongoose.connection.db;
    next();
  }, leafAnalysisRoutes);

  server.app.use('/soilAnalyses', (req, res, next) => {
    req.db = mongoose.connection.db;
    next();
  }, soilAnalysisRoutes);

  server.app.use('/refunds', (req, res, next) => {
    req.db = mongoose.connection.db;
    next();
  }, refundRoutes);

  server.app.use('/reports', (req, res, next) => {
    req.db = mongoose.connection.db;
    next();
  }, reportRoutes);

  const PORT = process.env.PORT || 3000;
  server.start(PORT);
};

startServer();



