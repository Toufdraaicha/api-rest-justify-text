import { getToken } from '../src/controllers/authentification';
import { Request, Response } from 'express';

describe('getToken', () => {
  it('should return a token for valid email', () => {
    const mockRequest = {
      body: { email: 'test@example.com' },
    } as Request;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    getToken(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalled();
    // Add more expectations as necessary
  });

  // Add more test cases as necessary
});