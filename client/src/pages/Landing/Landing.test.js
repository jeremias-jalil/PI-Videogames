import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import App from '../../App';


describe('<Landing/>', () => {
    test('Landing render whith start button, and Image', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        component.getByText('Start')
        component.container.querySelector('img')
        component.container.querySelector('button')
    })

    test('Landing redirect to /home', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        const button = component.container.querySelector('button')
        fireEvent.click(button)
        component.getByText('All your games')
    })
})