
import { NextRequest, NextResponse } from 'next/server';
import { createMocks } from 'node-mocks-http';
// import { GET, POST } from '../src/app/api/ingredients/route.js';
import { GET, POST } from '../app/api/ingredients/route.js';

describe('/api/ingredients', () => {
  it('creates a new ingredient', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Test Ingredient',
        unit: 'kg',
        price: 2,
        quantity: 50
      },
    });

    await POST(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        name: 'Test Ingredient',
        unit: 'kg',
        price: 2,
        quantity: 50
      })
    );
  });

  it('gets all ingredients', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await GET(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Test Ingredient',
          unit: 'kg',
          price: 2,
          quantity: 50
        })
      ])
    );
  });
});