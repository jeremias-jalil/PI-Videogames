import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import App from '../../App';


describe('<GameDetail/>', () => {
    test('GameDetail render', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/game/3498']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        component.getByText('Game detail')
    })

    test('GameDetail redirect to /home', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/game/3498']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        const button = component.getByText('Home')
        fireEvent.click(button)
        component.getByText('All your games')
    })

    test('GameDetail have a propertis', () => {
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/game/3498']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        setTimeout(() => {
            component.getByText('Grand Theft Auto V')
            component.getByText('Release')
            component.getByText('Description')
            component.getByText('https://media.rawg.io/media/games/84d/84da2ac3fdfc6507807a1808595afb12.jpg')
            component.getByText('Rating')
            component.getByText('Platforms')
            component.getByText('Genres')
        }
            , 500)

    })
})