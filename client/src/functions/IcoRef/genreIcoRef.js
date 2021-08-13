import {
    faRunning, faWind, faMap, faKhanda, faSearch, faBullseye,
    faCouch, faHotel, faPuzzlePiece, faGhost, faDragon, faCar, faHeadset, faFootballBall,
    faFighterJet, faUsers, faChess, faChalkboardTeacher, faHeart, faAd
} from "@fortawesome/free-solid-svg-icons";

export default function getIconGenre(genre) {

    if (genre instanceof Array) {
        let iconPlatform
        if (genre[0]?.id) {
            iconPlatform = genre.map(e => getIconGenreById(e.id,e.name))
        }
        else {
            iconPlatform = genre.map(e => getIconGenreById(e,e))
        }
        return iconPlatform
    } else {
        return []
    }
}

function getIconGenreById(id,name) {

    const platform = iconReference.filter(e => parseInt(e.id) === parseInt(id) || e.name === name)
    if (platform.length === 0) return iconNull
    return platform[0]
}
const iconNull = [
    {
        id: 0,
        name: "No icon",
        icon: faAd
    },
]


const iconReference = [
    {
        id: 4,
        name: "Action",
        icon: faRunning
    },
    {
        id: 51,
        name: "Indie",
        icon: faWind
    },
    {
        id: 3,
        name: "Adventure",
        icon: faMap
    },
    {
        id: 5,
        name: "RPG",
        icon: faKhanda
    },
    {
        id: 10,
        name: "Strategy",
        icon: faSearch
    },
    {
        id: 2,
        name: "Shooter",
        icon: faBullseye
    },
    {
        id: 40,
        name: "Casual",
        icon: faCouch
    },
    {
        id: 14,
        name: "Simulation",
        icon: faHotel
    },
    {
        id: 7,
        name: "Puzzle",
        icon: faPuzzlePiece
    },
    {
        id: 11,
        name: "Arcade",
        icon: faGhost
    },
    {
        id: 83,
        name: "Platformer",
        icon: faDragon
    },
    {
        id: 1,
        name: "Racing",
        icon: faCar
    },
    {
        id: 59,
        name: "Massively Multiplayer",
        icon: faHeadset
    },
    {
        id: 15,
        name: "Sports",
        icon: faFootballBall
    },
    {
        id: 6,
        name: "Fighting",
        icon: faFighterJet
    },
    {
        id: 19,
        name: "Family",
        icon: faUsers
    },
    {
        id: 28,
        name: "Board Games",
        icon: faChess
    },
    {
        id: 34,
        name: "Educational",
        icon: faChalkboardTeacher
    },
    {
        id: 17,
        name: "Card",
        icon: faHeart
    }
]
