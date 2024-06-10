const request = require('supertest');
const ExpressServer = require('../infrastructure/webserver/ExpressServer');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ObjectId } = require('mongodb');


// Mongoose modeli tanımlıyoruz (sadece test için)
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

// Mongoose modeli tanımlıyoruz (sadece test için)
const reportSchema = new mongoose.Schema({
  land_id: mongoose.Schema.Types.ObjectId,
  description: String,
  title: String,
  imageUrl: String, 
}, {
  timestamps: true
});
const ReportModel = mongoose.model('Report', reportSchema);

let server, db, mongoServer, landId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server = new ExpressServer();

  db = mongoose.connection.db;
  server.app.use('/reports', (req, res, next) => {
    req.db = db;
    next();
  }, require('../routes/reportRoutes'));

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

describe('Report API', () => {
  it('should create a new report', async () => {
    const response = await request(server.app)
      .post(`/reports/${landId}`)
      .send({
        description: 'Report Description',
        title: 'Report Title',
        imageUrl: 'http://example.com/image.jpg',
      });

    expect(response.status).toBe(201);
    expect(response.body.description).toBe('Report Description');
  });

  it('should get all reports', async () => {
    const createResponse = await request(server.app)
      .post(`/reports/${landId}`)
      .send({
        description: 'Report Description',
        title: 'Report Title',
        imageUrl: 'http://example.com/image.jpg',
      });

  
    const newLandId = createResponse.body.land_id;
    const response = await request(server.app).get(`/reports/${newLandId}`);
    

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].description).toBe('Report Description');
  });

  it('should update a report by ID', async () => {
    const newReport = new ReportModel({
      land_id: landId,
      description: 'Report Description',
      title: 'Report Title',
      imageUrl: 'http://example.com/image.jpg',
    });
    const savedReport = await ReportModel.create(newReport);

    const response = await request(server.app)
      .put(`/reports/${savedReport._id}`)
      .send({ description: 'Updated Description' });

    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Updated Description');
  });

  it('should delete a report by ID', async () => {
    const newReport = new ReportModel({
      land_id: landId,
      description: 'Report Description',
      title: 'Report Title',
      imageUrl: 'http://example.com/image.jpg',
    });
    const savedReport = await ReportModel.create(newReport);
    const response = await request(server.app).delete(`/reports/${savedReport._id}`);
    expect(response.status).toBe(200);
  });
});
