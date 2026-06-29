import pino from 'pino'

// Structured logger
const pinoLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  ...(process.env.NODE_ENV !== 'production' && {
    transport: {
      target: 'pino-pretty',
    },
  }),
})

export const logger = {
  debug: (msg: string, data?: Record<string, unknown>) =>
    data ? pinoLogger.debug(data, msg) : pinoLogger.debug(msg),
  info: (msg: string, data?: Record<string, unknown>) =>
    data ? pinoLogger.info(data, msg) : pinoLogger.info(msg),
  warn: (msg: string, data?: Record<string, unknown>) =>
    data ? pinoLogger.warn(data, msg) : pinoLogger.warn(msg),
  error: (msg: string, data?: Record<string, unknown>) =>
    data ? pinoLogger.error(data, msg) : pinoLogger.error(msg),
}
