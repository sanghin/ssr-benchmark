import next from "next";

// export async function buildNextHandler() {
//   const app = next({
//     dev: false,
//     hostname: "localhost",
//     port: 3000,
//     dir: "./modules/next",
//   });
//   await app.prepare();
//   return app.getRequestHandler();
// }

export async function buildNextPagesHandler() {
  const app = next({
    dev: false,
    hostname: "localhost",
    port: 3000,
    dir: "./modules/next-pages",
  });
  await app.prepare();
  return app.getRequestHandler();
}

export async function buildNextPagesStyledHandler() {
  const app = next({
    dev: false,
    hostname: "localhost",
    port: 3000,
    dir: "./modules/next-pages-styled",
  });
  await app.prepare();
  return app.getRequestHandler();
}
