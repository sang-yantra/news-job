import winston from "winston";
import { USER } from "../constants/index.js";
const { combine, timestamp, cli, json, printf, colorize, align } =
  winston.format;
const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf(
      (info) => `[${info.timestamp}] ${USER} ${info.level}: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
