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

//const authRoutes = require('./routes/authRoutes'); // Kimlik doğrulama rotasını ekleyin


dotenv.config();

const startServer = async () => {
  await connectToDatabase();

  const server = new ExpressServer();

  //server.app.use('/auth', authRoutes); // Kimlik doğrulama rotası
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



