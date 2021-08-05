import {
    faRunning, faWind, faMap, faKhanda, faSearch, faBullseye,
    faCouch, faHotel, faPuzzlePiece, faGhost, faDragon, faCar, faHeadset, faFootballBall,
    faFighterJet, faUsers, faChess, faChalkboardTeacher, faHeart
} from "@fortawesome/free-solid-svg-icons";

export default function getIconGenre(genre) {
    if (genre) {
        let iconPlatform
        if (genre[0]?.id) {
            iconPlatform = genre.map(e => getIconGenreById(e.id))
        }
        else {
            iconPlatform = genre.map(e => getIconGenreById(e))
        }
        return iconPlatform
    } else {
        return []
    }
}

function getIconGenreById(id) {

    const platform = iconReference.filter(e => e.id == id)

    return platform[0]
}

const iconReference = [
    {
        id: 1,
        name: "Action",
        icon: faRunning
    },
    {
        id: 2,
        name: "Indie",
        icon: faWind
    },
    {
        id: 3,
        name: "Adventure",
        icon: faMap
    },
    {
        id: 4,
        name: "RPG",
        icon: faKhanda
    },
    {
        id: 5,
        name: "Strategy",
        icon: faSearch
    },
    {
        id: 6,
        name: "Shooter",
        icon: faBullseye
    },
    {
        id: 7,
        name: "Casual",
        icon: faCouch
    },
    {
        id: 8,
        name: "Simulation",
        icon: faHotel
    },
    {
        id: 9,
        name: "Puzzle",
        icon: faPuzzlePiece
    },
    {
        id: 10,
        name: "Arcade",
        icon: faGhost
    },
    {
        id: 11,
        name: "Platformer",
        icon: faDragon
    },
    {
        id: 12,
        name: "Racing",
        icon: faCar
    },
    {
        id: 13,
        name: "Massively Multiplayer",
        icon: faHeadset
    },
    {
        id: 14,
        name: "Sports",
        icon: faFootballBall
    },
    {
        id: 15,
        name: "Fighting",
        icon: faFighterJet
    },
    {
        id: 16,
        name: "Family",
        icon: faUsers
    },
    {
        id: 17,
        name: "Board Games",
        icon: faChess
    },
    {
        id: 18,
        name: "Educational",
        icon: faChalkboardTeacher
    },
    {
        id: 19,
        name: "Card",
        icon: faHeart
    }
]
