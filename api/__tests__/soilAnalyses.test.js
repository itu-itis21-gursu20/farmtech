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

const analysisItemSchema = new mongoose.Schema({
  maxValue: { type: Number, required: true },
  minValue: { type: Number, required: true },
  mineral: { type: String, required: true },
  value: { type: Number, required: true }
});

const soilAnalysisSchema = new mongoose.Schema({
  land_id: mongoose.Schema.Types.ObjectId,
  analysisItems: [analysisItemSchema],
  dateCreated: { type: Date, default: Date.now },
  successRate: { type: Number, required: true }
});
const SoilAnalysisModel = mongoose.model('SoilAnalysis', soilAnalysisSchema);

let server, db, mongoServer, landId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server = new ExpressServer();

  db = mongoose.connection.db;
  server.app.use('/soilAnalyses', (req, res, next) => {
    req.db = db;
    next();
  }, require('../routes/soilAnalysisRoutes'));

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

describe('SoilAnalysis API', () => {
  it('should create a new soil analysis', async () => {
    const response = await request(server.app)
      .post(`/soilAnalyses/${landId}`)
      .send({
        analysisItems: [
          {
            maxValue: 10,
            minValue: 5,
            mineral: 'Nitrogen',
            value: 7
          }
        ],
        successRate: 95
      });

    expect(response.status).toBe(201);
    expect(response.body.successRate).toBe(95);
  });

  // it('should get all soil analyses', async () => {
  //   console.log("E", landId);
  //   const createResponse = await request(server.app)
  //     .post(`/soilAnalyses/${landId}`)
  //     .send({
  //       analysisItems: [
  //         {
  //           maxValue: 10,
  //           minValue: 5,
  //           mineral: 'Nitrogen',
  //           value: 7
  //         }
  //       ],
  //       successRate: 95
  //     });

      
  //   const newLandId = createResponse.body.land_id;
  //   console.log("N",newLandId);
  //   const response = await request(server.app).get(`/soilAnalyses/${newLandId}`);
  //   console.log("response", response.body);

  //   expect(response.status).toBe(200);
  //   expect(response.body.length).toBeGreaterThan(0);
  //   expect(response.body[0].successRate).toBe(95);
  // });

  it('should update a soil analysis by ID', async () => {
    const newSoilAnalysis = new SoilAnalysisModel({
      land_id: landId,
      analysisItems: [
        {
          maxValue: 10,
          minValue: 5,
          mineral: 'Nitrogen',
          value: 7
        }
      ],
      successRate: 95
    });
    const savedSoilAnalysis = await SoilAnalysisModel.create(newSoilAnalysis);

    const response = await request(server.app)
      .put(`/soilAnalyses/${savedSoilAnalysis._id}`)
      .send({ successRate: 90 });

    expect(response.status).toBe(200);
    expect(response.body.successRate).toBe(90);
  });

  it('should delete a soil analysis by ID', async () => {
    const newSoilAnalysis = new SoilAnalysisModel({
      land_id: landId,
      analysisItems: [
        {
          maxValue: 10,
          minValue: 5,
          mineral: 'Nitrogen',
          value: 7
        }
      ],
      successRate: 95
    });
    const savedSoilAnalysis = await SoilAnalysisModel.create(newSoilAnalysis);
    const response = await request(server.app).delete(`/soilAnalyses/${savedSoilAnalysis._id}`);
    expect(response.status).toBe(200);
  });
});
