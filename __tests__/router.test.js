import { test, expect } from '@jest/globals';
import makeRouter from '..';

const routes = [
  {
    path: '/courses',
    handler: () => 'courses!',
  },
  {
    path: '/courses/basics',
    handler: () => 'basics',
  },
];

test('static paths', () => {
  const router = makeRouter(routes);

  const path = '/courses';
  const handler = router.serve(path);
  expect(handler()).toEqual('courses!');

  const path2 = '/courses/basics';
  const handler2 = router.serve(path2);
  expect(handler2()).toEqual('basics');

  expect(() => router.serve('/no_such_way')).toThrow();
});
