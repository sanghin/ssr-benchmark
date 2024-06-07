import { Bench } from "tinybench";
import { IncomingMessage, ServerResponse } from "./http.js";
import { buildNextPagesHandler, buildNextPagesStyledHandler } from "./next.js";
import http from "node:http";
import { getDuplicationFactor, logResultsTable } from "./result-format.js";

async function run(handler, collect = false) {
  const request = new IncomingMessage();
  const response = new ServerResponse(request, collect);

  handler(request, response);

  await response.await;
  return response;
}

async function runHandlers(handlers) {
  const bench = new Bench({
    time: 10_000,
    setup: async (task, mode) => {
      if (mode == "run") console.log(`Running ${task.name} benchmark...`);
    },
  });

  for (let handler of handlers) {
    bench.add(handler.name, async () => {
      await run(handler.handler);
    });
  }

  await bench.warmup();
  await bench.run();

  for (let handler of handlers) {
    let response = await run(handler.handler, true);

    bench.getTask(handler.name).setResult({
      bodyLength: response.length,
      duplicationFactor: getDuplicationFactor(response.body),
    });
  }

  logResultsTable(bench);
}

const handlers = [
  // { name: "next", group: "frameworks", handler: await buildNextHandler() },
  {
    name: "next-pages",
    group: "frameworks",
    handler: await buildNextPagesHandler(),
  },
  {
    name: "next-pages-styled",
    group: "frameworks",
    handler: await buildNextPagesStyledHandler(),
  },
];

console.log("Benchmarking frameworks");
await runHandlers(handlers.filter((x) => !x.group || x.group == "frameworks"));

console.log();
console.log("Check out the actual render results:");

for (let handler of handlers) {
  console.log(handler.name, `http://localhost:8080/${handler.name}`);
}

http
  .createServer(async function (req, res) {
    const handler = handlers.find((x) => "/" + x.name == req.url);

    if (handler) {
      req.url = "/";
      handler.handler(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(8080);
