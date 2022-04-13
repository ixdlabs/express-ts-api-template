// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const createHelloWorld = (name: string): string => {
  const message = `Hello World ${name}`;
  return message;
};

export default { createHelloWorld };
