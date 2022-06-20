const serve = (routes) => (path) => {
  const route = routes.find((r) => path.match(r.regexpPath));

  if (!route) {
    throw new Error(`this path is not maintained: ${path}`);
  }

  const originalPats = path.split('/');

  return {
    handler: route.handler,
    path: route.path,
    params: route.path
      .split('/')
      .reduce((acc, part, index) => {
        if (!part.startsWith(':')) return acc;

        return { ...acc, [part.slice(1)]: originalPats[index] };
      }, {}),
  };
};

const parseRoutes = (routes) => routes.map((route) => ({
  ...route,
  regexpPath: new RegExp(`^${route.path.replace(/:\w+/gi, '\\w+')}$`),
}));

const router = (routes) => {
  const parsedRoutes = parseRoutes(routes);

  return ({
    serve: serve(parsedRoutes),
  });
};

export default router;
