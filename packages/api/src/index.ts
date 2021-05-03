import "reflect-metadata";
import { config } from "dotenv";
import { join } from "path";
import { rootPath } from "./utils/rootPath";

config({ path: join(rootPath, ".env") });

import { createConnection } from "typeorm";
import { ormconfig } from "./ormconfig";
import { ApolloServer } from "apollo-server-micro";
import { Request } from "express";
import { getSchema } from "./utils/getSchema";
import { contextFromToken } from "./utils/contextFromToken";
export { getSchema };

export const createAPIHandler = async () => {
  await createConnection(ormconfig);

  const apolloServer = new ApolloServer({
    schema: await getSchema(),
    context: async ({ req }: { req: Request }) => {
      const cookies = req.headers.cookie ?? "";
      const cookiesArr = cookies.split("; ");
      const cookieData = cookiesArr.find((row) => row.startsWith("token="));
      const token = cookieData?.split("=")[1];

      const socketInfo = req.socket.address();

      if (!token || token === "") return { hasAuth: false, socketInfo };

      return contextFromToken(token, socketInfo);
    },
    playground: true,
    introspection: true,
  });

  const apolloHandler = apolloServer.createHandler({ path: "/api/graphql" });

  return apolloHandler;
};
