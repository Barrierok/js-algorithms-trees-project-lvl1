const serve = (routes) => (path) => {
  const route = routes.find((r) => r.path === path);

  if (!route) {
    throw new Error(`this path is not maintained: ${path}`);
  }

  return route.handler;
};

const router = (routes) => ({
  serve: serve(routes),
});

export default router;
