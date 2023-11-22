import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';

@Injectable()
export class LoggingService {
  async logError(error: any, request: Request) {
    const logEntry = {
      Messaggio: error.response?.data?.message || error.message,
      Timestamp: new Date().toISOString(),
      EndpointUrl: request
        ? `${request.protocol}://${request.get('host')}${request.originalUrl}`
        : undefined,
    };

    try {
      await axios.post('http://localhost:5000/logs', logEntry);
    } catch (err) {
      console.error("Errore durante l'invio del log", err);
    }
  }
}
