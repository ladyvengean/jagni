import app from './app.js';
import { env, isMailConfigured, missingMailVars } from './config/env.js';

app.listen(env.port, () => {
  console.log(`[server] Jagni Homes API running on http://localhost:${env.port}`);

  if (!isMailConfigured) {
    console.warn(
      `[server] SMTP not configured (missing: ${missingMailVars.join(', ')}). ` +
        'The site will run, but enquiries will return an error until these are set.',
    );
  }
});