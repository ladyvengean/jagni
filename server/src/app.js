import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import contactRoutes from './routes/contact.routes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.disable('x-powered-by');

// Render and Vercel put a proxy in front of the server, so trust one hop.
app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: env.clientOrigin,
    methods: ['GET', 'POST'],
  }),
);
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;