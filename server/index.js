import cors from "cors";
import express from "express";
import path from "path";

import {
  addCity,
  getCitiesByCountryId,
  getCountries,
} from "./lib/countries.js";
import { addPerson, getPersons } from "./lib/persons.js";
import { swaggerInit } from "./swagger.js";

const app = express();
const port = 3000;
const jsonMiddleware = express.json();

app.use(cors());
swaggerInit(app);

path.join(path.resolve(), "../dist/sealights");

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res
    .status(200)
    .send(
      `<div style="text-align: center"><h1>SeaLights | Home Assignment</h1>\n<h3>Sever Side Work</h3>\n<p>by Jonathan Daniel</p></div>`
    );
});

app.get("/api/persons", (req, res) => {
  try {
    const data = getPersons();
    res.status(200).json(data);
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: `failed to get persons with error: ${error.message} ` });
  }
});

app.post("/api/person", jsonMiddleware, (req, res) => {
  try {
    addPerson(req.body);
    res.status(201).json({ message: "person was created successfuly " });
  } catch (error) {
    res.status(500).json({
      error: `failed to create a person with error: ${error.message}`,
    });
  }
});

app.get("/api/cities/:countryId", (req, res) => {
  try {
    const cities = getCitiesByCountryId(+req.params.countryId);
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/city", jsonMiddleware, (req, res) => {
  try {
    addCity(req.body);
    res.status(201).json({ message: "city was added successfuly " });
  } catch (error) {
    res
      .status(500)
      .json({ error: `failed to add a city with error: ${error.message}` });
  }
});

app.get("/api/countries", (req, res) => {
  try {
    const data = getCountries();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: `failed to get countries with error: ${error.message} ` });
  }
});

app.listen(port, () => {});
