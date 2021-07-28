import {join} from 'path';
import '@feathersjs/transport-commons';
import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import {Storage} from './database/Storage';
import {PlaceRestController} from './place/controller/PlaceRestController';
import {PlaceRepository} from './place/repository/PlaceRepository';
import {Place} from './place/Place';

async function runApp() {
  const appPort = 3030;
  const dbPath = join(__dirname, '../data/db.json');

  const placeStorage = new Storage<Place>(dbPath, 'places');
  await placeStorage.read();

  const app = express(feathers());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.configure(express.rest());
  app.use('/places', new PlaceRestController(new PlaceRepository(placeStorage)));
  app.use(express.errorHandler());

  app.listen(appPort).on('listening', () => {
    console.log(`Server started ${appPort}`);
  });

  app.on('error', () => {
    console.log('Failed to start server.')
  })
}

runApp();
