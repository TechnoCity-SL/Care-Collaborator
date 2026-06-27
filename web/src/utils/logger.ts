type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function log(level: LogLevel, message: string, context?: unknown): void {
  if (process.env.NODE_ENV === 'test') return;

  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(context !== undefined && { context }),
  };

  if (level === 'error') {
    process.stderr.write(JSON.stringify(entry) + '\n');
  } else {
    process.stdout.write(JSON.stringify(entry) + '\n');
  }
}

export const logger = {
  info: (message: string, context?: unknown) => log('info', message, context),
  warn: (message: string, context?: unknown) => log('warn', message, context),
  error: (message: string, context?: unknown) => log('error', message, context),
  debug: (message: string, context?: unknown) => log('debug', message, context),
};
