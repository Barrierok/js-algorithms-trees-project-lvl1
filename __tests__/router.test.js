import { test, expect } from '@jest/globals';
import makeRouter from '..';

test('static routes', () => {
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

  const router = makeRouter(routes);

  const path = '/courses';
  const { handler } = router.serve(path);
  expect(handler()).toEqual('courses!');

  const path2 = '/courses/basics';
  const { handler: handler2 } = router.serve(path2);
  expect(handler2()).toEqual('basics');

  expect(() => router.serve('/no_such_way')).toThrow();
});

test('dynamic routes', () => {
  const routes = [
    {
      path: '/courses/:id',
      handler: () => 'course!',
    },
    {
      path: '/courses/:course_id/exercises/:id',
      handler: () => 'exercise!',
    },
  ];

  const router = makeRouter(routes);

  const path = '/courses/php_trees';
  const result = router.serve(path);
  expect(result.handler(result.params)).toEqual('course!');
  expect(result.params).toEqual({ id: 'php_trees' });
});
