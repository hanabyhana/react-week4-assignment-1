import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    tasks: [
      { id: 1, title: '아무것도 하지 않기 #1' },
      { id: 2, title: '아무것도 하지 않기 #2' },
    ],
  }));

  it('renders tasks', () => {
    const { getByText } = render((
      <ListContainer />
    ));

    expect(getByText(/아무것도 하지 않기 #1/)).not.toBeNull();
    expect(getByText(/아무것도 하지 않기 #2/)).not.toBeNull();
  });

  it('deletes a task', () => {
    const { getAllByText } = render((
      <ListContainer />
    ));

    fireEvent.click(getAllByText(/완료/)[0]);

    expect(dispatch).toBeCalledWith({
      type: 'deleteTask',
      payload: {
        id: 1,
      },
    });
  });
});
