import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "autosatsecret",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:Ohavizz11_@localhost:5432/AutoSatDev",
};
