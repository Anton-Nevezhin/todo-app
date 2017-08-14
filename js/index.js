import Model from './model';
import Controller from './controller';
import View from './view';


const model = new Model();
const view = new View();
const controller = new Controller(model, view);