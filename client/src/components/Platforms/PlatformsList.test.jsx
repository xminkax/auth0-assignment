import React from 'react';
import renderer from 'react-test-renderer';
import PlatformsList from './PlatformsList';

it('renders platforms list', () => {
  const data = [{ title: 'Android', imageName: 'android', id: '6ymHMrgkH6q6WGggqQ2aMs' }, {
    title: 'Angular 2+',
    imageName: 'angular',
    id: '5ZDQx5dW6cqweY26GqK8s6',
  }, { title: 'AngularJs', imageName: 'angular', id: '662lRdvU6AKOG6AkQKY2eU' }, {
    title: 'Django',
    imageName: 'python',
    id: '5cAqCgRaukEIIo2g4Cs6Oi',
  }];
  const component = renderer.create(
    <PlatformsList platforms={data} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
