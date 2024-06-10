const request = require('supertest');
const ExpressServer = require('../infrastructure/webserver/ExpressServer');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const sharedLandSchema = new mongoose.Schema({
  parcel: String,
  products: {
    type: Map,
    of: {
      name: { type: String, default: '' },
      quantity: { type: Number, default: 0 }
    }
  },
  title: String,
  mapUrl: String,
  numList: [String]
}, {
  timestamps: true
});
const SharedLandModel = mongoose.model('SharedLand', sharedLandSchema);

const endYearReportSchema = new mongoose.Schema({
  land_id: mongoose.Schema.Types.ObjectId,
  description: String,
  title: String,
  dateCreated: { type: Date, default: Date.now }
}, {
  timestamps: true
});
const EndYearReportModel = mongoose.model('EndYearReport', endYearReportSchema);

let server, db, mongoServer, landId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server = new ExpressServer();

  db = mongoose.connection.db;
  server.app.use('/endYearReports', (req, res, next) => {
    req.db = db;
    next();
  }, require('../routes/endYearReportRoutes'));

  const sharedLand = new SharedLandModel({
    parcel: 'Parcel 1',
    title: 'Land Title',
    numList: ['123456789']
  });
  const savedLand = await sharedLand.save();
  landId = savedLand._id.toString(); // landId'yi string olarak saklayalım
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('EndYearReport API', () => {
  it('should create a new end year report', async () => {
    const response = await request(server.app)
      .post(`/endYearReports/${landId}`)
      .send({
        description: 'End Year Report Description',
        title: 'End Year Report Title'
      });

    expect(response.status).toBe(201);
    expect(response.body.description).toBe('End Year Report Description');
  });

  it('should get all end year reports', async () => {
    const createResponse = await request(server.app)
      .post(`/endYearReports/${landId}`)
      .send({
        description: 'End Year Report Description',
        title: 'End Year Report Title'
      });

    const newLandId = createResponse.body.land_id;
    const response = await request(server.app).get(`/endYearReports/${newLandId}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].description).toBe('End Year Report Description');
  });

  it('should update an end year report by ID', async () => {
    const newEndYearReport = new EndYearReportModel({
      land_id: landId,
      description: 'End Year Report Description',
      title: 'End Year Report Title'
    });
    const savedEndYearReport = await EndYearReportModel.create(newEndYearReport);

    const response = await request(server.app)
      .put(`/endYearReports/${savedEndYearReport._id}`)
      .send({ description: 'Updated Description' });

    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Updated Description');
  });

  it('should delete an end year report by ID', async () => {
    const newEndYearReport = new EndYearReportModel({
      land_id: landId,
      description: 'End Year Report Description',
      title: 'End Year Report Title'
    });
    const savedEndYearReport = await EndYearReportModel.create(newEndYearReport);
    const response = await request(server.app).delete(`/endYearReports/${savedEndYearReport._id}`);
    expect(response.status).toBe(200);
  });
});
