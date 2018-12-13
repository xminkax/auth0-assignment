import React from 'react';
import { shallow } from 'enzyme';
import Platforms from './Platforms';
import PlatformsList from './PlatformsList';

describe('on create', () => {
  it('renders loading', async () => {
    const renderedComponent = await shallow(
      <Platforms login={jest.fn} isAuth={false} getProfile={jest.fn} />,
    );
    expect(renderedComponent.text()).toEqual('<Search /><Links /><Loading />');
  });
});

describe('componentDidMount set platforms', () => {
  let renderedComponent;
  const data = [{ title: 'Android', imageName: 'android', id: '6ymHMrgkH6q6WGggqQ2aMs' }, {
    title: 'Angular 2+',
    imageName: 'angular',
    id: '5ZDQx5dW6cqweY26GqK8s6',
  }, { title: 'AngularJs', imageName: 'angular', id: '662lRdvU6AKOG6AkQKY2eU' }, {
    title: 'Django',
    imageName: 'python',
    id: '5cAqCgRaukEIIo2g4Cs6Oi',
  }];
  fetch.mockResponse(JSON.stringify(data));

  beforeEach(async () => {
    renderedComponent = await shallow(
      <Platforms login={jest.fn} isAuth={false} getProfile={jest.fn} />,
    );
  });

  it('sets the correct state', () => {
    expect(JSON.stringify(renderedComponent.state('platforms'))).toEqual(JSON.stringify(data));
  });

  it('renders data when they are available', () => {
    expect(
      renderedComponent.containsMatchingElement(
        <PlatformsList platforms={data} />,
      ),
    ).toBeTruthy();
  });
});

describe('login happened set favourite platforms', () => {
  let renderedComponent;
  let data;
  const promise = Promise.resolve();

  beforeEach(async () => {
    data = [{ title: 'Android', imageName: 'android', id: '6ymHMrgkH6q6WGggqQ2aMs' }, {
      title: 'Angular 2+',
      imageName: 'angular',
      id: '5ZDQx5dW6cqweY26GqK8s6',
    }];
    fetch.mockResponse(JSON.stringify(data));
    renderedComponent = await shallow(<Platforms
      login={jest.fn}
      isAuth
      getProfile={callback => callback(1)}
    />);
  });

  it('sets the correct state', () => {
    promise.then(async () => {
      await renderedComponent.update();
      expect(JSON.stringify(renderedComponent.state('favouritePlatforms'))).toEqual(JSON.stringify(data));
    });
  });

  it('renders data when they are available', () => {
    promise.then(async () => {
      await renderedComponent.update();
      expect(
        renderedComponent.containsMatchingElement(
          <PlatformsList platforms={data} />,
        ),
      ).toBeTruthy();
    });
  });
});
