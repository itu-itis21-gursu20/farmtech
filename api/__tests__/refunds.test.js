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
const refundSchema = new mongoose.Schema({
  land_id: mongoose.Schema.Types.ObjectId,
  approved: Boolean,
  description: String,
  refundItems: [
    {
      brand: String,
      quantity: Number,
      totalPrice: Number,
      unitPrice: Number,
    },
  ],
}, {
  timestamps: true
});
const RefundModel = mongoose.model('Refund', refundSchema);

let server, db, mongoServer, landId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server = new ExpressServer();

  db = mongoose.connection.db;
  server.app.use('/refunds', (req, res, next) => {
    req.db = db;
    next();
  }, require('../routes/refundRoutes'));

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

describe('Refund API', () => {
  it('should create a new refund', async () => {
    const response = await request(server.app)
      .post(`/refunds/${landId}`)
      .send({
        approved: false,
        description: 'Refund Description',
        refundItems: [
          {
            brand: 'Brand1',
            quantity: 1,
            totalPrice: 100,
            unitPrice: 100,
          },
        ],
      });

    expect(response.status).toBe(201);
    //expect(response.body.description).toBe('Refund Description');
  });

  it('should get all refunds', async () => {
    
    // Önce bir refund oluştur
    const createResponse = await request(server.app)
      .post(`/refunds/${landId}`)
      .send({
        approved: false,
        description: 'Refund Description',
        refundItems: [
          {
            brand: 'Brand1',
            quantity: 1,
            totalPrice: 100,
            unitPrice: 100,
          },
        ],
      });
  
  
    const new_land_id = createResponse.body.land_id;
    // Şimdi tüm refunds'ları al
    const response = await request(server.app).get(`/refunds/${new_land_id}`);
  
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].description).toBe('Refund Description');
  });


  it('should update a refund by ID', async () => {
    const newRefund = new RefundModel({
      approved: false,
      description: 'Refund Description',
      refundItems: [
        {
          brand: 'Brand1',
          quantity: 1,
          totalPrice: 100,
          unitPrice: 100,
        },
      ],
    });
    const savedRefund = await RefundModel.create(newRefund);

    const response = await request(server.app)
      .put(`/refunds/${savedRefund._id}`)
      .send({ description: 'Updated Description' });

    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Updated Description');
  });

  it('should delete a refund by ID', async () => {
    const newRefund = new RefundModel({
      land_id: landId,
      approved: false,
      description: 'Refund Description',
      refundItems: [
        {
          brand: 'Brand1',
          quantity: 1,
          totalPrice: 100,
          unitPrice: 100,
        },
      ],
    });
    const savedRefund = await RefundModel.create(newRefund);
    const response = await request(server.app).delete(`/refunds/${savedRefund._id}`);
    expect(response.status).toBe(200);
  });
});
