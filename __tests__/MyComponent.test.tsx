import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { DATA } from '../data';
import MyComponent from '../src/components/MyComponent';

describe('MyComponent', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<MyComponent data={DATA} />);

    // Check if the search input, clear button and flatlist are rendered
    expect(getByTestId('SearchBar')).toBeTruthy();
    expect(getByTestId('ClearButton')).toBeTruthy();
    expect(getByTestId('DataList')).toBeTruthy();
  });

  it('filters items based on search input', () => {
    const { getByTestId, queryByText } = render(<MyComponent data={DATA} />);

    const searchInput = getByTestId('SearchBar');
    fireEvent.changeText(searchInput, 'fugiat commodo');

    expect(queryByText('Deserunt minim irure voluptate fugiat commodo.')).toBeTruthy();
    expect(queryByText('Random text 1')).toBeNull();
    expect(queryByText('Random text 2')).toBeNull();
  });

  it('clears the search input', () => {
    const { getByTestId, getByText } = render(<MyComponent data={DATA} />);

    const searchInput = getByTestId('SearchBar');
    const clearButton = getByTestId('ClearButton');

    // Perform search
    fireEvent.changeText(searchInput, 'Labore irure');

    // Clear search
    fireEvent.press(clearButton);

    // Check if all items are rendered again
    for (let index = 0; index < DATA.length; index++) {
      const element = DATA[index];
      expect(getByText(element.name)).toBeTruthy();
    }
  });

  it('toggles the selected state of an item', () => {
    const { getByTestId } = render(<MyComponent data={DATA} />);

    const touchableElement = getByTestId('Button-66502e060d00abead1f6e753');
    const stateElement = getByTestId('SelectedState-66502e060d00abead1f6e753');

    // Toggle selection
    fireEvent.press(touchableElement);

    expect(stateElement.props.children).toBe('Selected');

    // Toggle selection again
    fireEvent.press(stateElement);

    // Check if item is unselected
    expect(stateElement.props.children).toBe('Not selected');
  });
});
