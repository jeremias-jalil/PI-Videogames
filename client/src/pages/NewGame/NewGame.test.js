import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import App from '../../App';


describe('<NewGame/>', () => {
    test('NewGame render', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/newgame']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        component.getByText('Add your game')
    })

    test('NewGame redirect to /home', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/newgame']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        const button = component.getByText('Home')
        fireEvent.click(button)
        component.getByText('All your games')
    })

    test('NewGame have a propertis', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/newgame']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        component.getByText('Name*')
        component.getByText('Release*')
        component.getByText('Description*')
        component.getByText('Image*')
        component.getByText('Rating*')
        component.getByText('Platforms*')
        component.getByText('Genres*')
        component.getByText('Save new game')
    })
})