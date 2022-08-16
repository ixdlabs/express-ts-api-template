// import prisma from "../utils/dbClient";

const createHelloWorld = (name: string): string => {
  const message = `Hello World ${name}`;
  return message;
};

export default { createHelloWorld };
