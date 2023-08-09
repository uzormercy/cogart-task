
import { Sequelize } from "sequelize-typescript";
import {Media} from "@app/models/media";

const sequelize = new Sequelize( 'cogart_studio', 'root', 'password', {
  dialect: 'postgres',
  models: [Media] // where model files are
});
console.log("sdsd",__dirname + '/models');
export default  sequelize;