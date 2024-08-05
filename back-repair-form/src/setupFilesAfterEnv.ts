import { client } from "./db";
import { Users } from "./api/users/users.model";
import { Repairs } from './api/repairs/repairs.model';

global.afterAll(async () => {
  await Users.drop();
  await Repairs.drop();
  await client.close();
});