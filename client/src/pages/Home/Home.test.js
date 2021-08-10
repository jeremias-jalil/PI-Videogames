import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import App from '../../App';


describe('<Home/>', () => {
    test('Home render whith SearchBar, NavBar and Cards', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/home']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        component.getByText('All your games')
        component.container.querySelector('SearchBar')
        component.container.querySelector('NavBar')
        component.container.querySelector('Cards')
        component.container.querySelector('Pagination')
        component.container.querySelector('Order')
    })

    test('Home redirect to /newgame', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/home']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        const button = component.getByText('Add Game')
        fireEvent.click(button)
        component.getByText('Add your game')
    })

    test('Home have filters Owner, Platforms, Genres', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/home']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        component.getByText('Owner')
        component.getByText('Platforms')
        component.getByText('Genres')
    })
})