import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import Home from '../../pages/Home';

const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
    }),
  };
});

describe('Home page', () => {
  beforeEach(() => {
    mockedNavigation.mockClear();
  });

  it('should be able to open QRcode scanner page', async () => {
    const { getByTestId } = render(<Home />);

    fireEvent.press(getByTestId('open-qrcode-test'));

    expect(mockedNavigation).toHaveBeenCalledWith('QRcodeScanner');
  });
});
