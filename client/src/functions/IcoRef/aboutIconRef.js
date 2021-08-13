import { faDatabase, faFileCode, faLaptopCode, faGlobe ,faUser, faAd } from "@fortawesome/free-solid-svg-icons";


export default function getIconAbout(id) {

    if (id) {
        let iconAbout
        if (id[0]?.id) {
            iconAbout = id.map(e => getIcon(e.id))
        }

        return iconAbout
    }
    else {
        return []
    }
}


function getIcon(id) {

    const platform = aboutIcon.filter(e => e.id === id)
    if (platform.length === 0) return iconNull
    return platform[0]
}

const iconNull = [
    {
        id: 0,
        name: "",
        icon: faAd
    },
]

const aboutIcon = [
    {
        id: 'Postgresql',
        name: 'Postgresql',
        icon: faDatabase
    },

    {
        id: 'PgAdmin',
        name: 'PgAdmin',
        icon: faDatabase
    },

    {
        id: 'Node',
        name: 'Node',
        icon: faFileCode
    },
    {
        id: 'Sequelize',
        name: 'Sequelize',
        icon: faFileCode
    },
    {
        id: 'Express',
        name: 'Express',
        icon: faFileCode
    },
    {
        id: 'Postman',
        name: 'Postman',
        icon: faFileCode
    },
    {
        id: 'Api',
        name: 'Api',
        icon: faFileCode
    },

    {
        id: 'React',
        name: 'React',
        icon: faLaptopCode
    },
    {
        id: 'ReactRouter',
        name: 'React Router',
        icon: faLaptopCode
    },
    {
        id: 'Redux',
        name: 'Redux',
        icon: faLaptopCode
    },
    {
        id: 'CSSModule',
        name: 'CSS Module',
        icon: faLaptopCode
    },
    {
        id: 'FontAwesome',
        name: 'Font Awesome',
        icon: faLaptopCode
    },

    {
        id: 'GitHub',
        name: 'GitHub',
        icon: faGlobe
    },
    {
        id: 'Heroku',
        name: 'Heroku',
        icon: faGlobe
    },

    {
        id: 'Profile',
        name: 'Profile',
        icon: faUser
    },
    {
        id: 'Proyect',
        name: 'Proyect',
        icon: faUser
    },
    {
        id: 'HenryAcademy',
        name: 'Henry Academy',
        icon: faUser
    }
]


