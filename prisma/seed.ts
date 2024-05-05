const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const { randomUUID } = require("crypto");

const ADMIN_EMAIL = "admin@example.com";
const USER_EMAIL = "user@example.com";
async function seedUsers() {
  const newUsers: any[] = [];
  await createRandomUser(ADMIN_EMAIL);
  await createRandomUser(USER_EMAIL);

  console.log("Seeded users", newUsers.length, newUsers);

  return newUsers;

  async function createRandomUser(email: string | undefined = undefined) {
    try {
      email = email || faker.internet.email();
      const user = await client.user.create({
        data: {
          email,
          name: faker.person.firstName(),
        },
      });
      newUsers.push(user);
    } catch (ex: any) {
      if (ex.message.indexOf("Unique constraint failed") > -1) {
        console.error("Duplicate email", email);
      } else {
        console.log(ex);
      }
    }
  }
}

async function seedTasks(users: any[]) {
  const newtasks: any[] = [];
  for (const user of users) {
    for (let j = 0; j < 3; j++) {
      try {
        newtasks.push({
          title: faker.lorem.sentence(),
          userId: user.id,
        });
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  await client.task.createMany({
    data: newtasks,
  });
  console.log("Seeded tasks members", newtasks.length, newtasks);
}

async function init() {
  const users = await seedUsers();
  await seedTasks(users);
}

init();
