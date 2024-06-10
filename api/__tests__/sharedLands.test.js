const request = require('supertest');
const ExpressServer = require('../infrastructure/webserver/ExpressServer');
const connectToDatabase = require('../infrastructure/index');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

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

let server, db, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server = new ExpressServer();

  db = mongoose.connection.db;
  server.app.use('/sharedLands', (req, res, next) => {
    req.db = db;
    next();
  }, require('../routes/sharedLandRoutes'));
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

  describe('SharedLand API', () => {

    it('should create a new shared land', async () => {
      const response = await request(server.app)
        .post('/sharedLands')
        .send(
          {
          parcel: 'Parcel 1',
          title: 'Land Title',
          numList: ['123456789']
        });

      expect(response.status).toBe(201);
      expect(response.body.parcel).toBe('Parcel 1');
    });

  it('should get all shared lands', async () => {
    const response = await request(server.app).get('/sharedLands');
    expect(response.status).toBe(200);
  });

  it('should update a shared land by ID', async () => {
    const newLand = new SharedLandModel({
      parcel: 'Parcel 1',
      title: 'Land Title',
      numList: ['123456789']
    });
    const savedLand = await SharedLandModel.create(newLand);

    const response = await request(server.app)
      .put(`/sharedLands/${savedLand._id}`)
      .send({ title: 'Updated Title' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  });

  it('should delete a shared land by ID', async () => {
    const newLand = new SharedLandModel({
      parcel: 'Parcel 1',
      title: 'Land Title',
      numList: ['123456789']
    });
    const savedLand = await SharedLandModel.create(newLand);
    const response = await request(server.app).delete(`/sharedLands/${savedLand._id}`);
    expect(response.status).toBe(200);
  });
});
