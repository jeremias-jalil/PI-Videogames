import { faDesktop, faGamepad, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox, faApple, faAndroid, faLinux } from "@fortawesome/free-brands-svg-icons";

export default function getIconPlataforms(platforms) {

    if (platforms) {
        let iconPlatform
        if (platforms[0]?.id) {
            iconPlatform = platforms.map(e => getIconPlatformById(e.id))
        } else {
            iconPlatform = platforms.map(e => getIconPlatformById(e))
        }
        return iconPlatform
    }
    else {
        return []
    }
}

function getIconPlatformById(id) {

    const platform = iconReference.filter(e => parseInt(e.id) === parseInt(id))

    return platform[0]
}

const iconReference = [
    {
        id: 1,
        name: "PC",
        icon: faDesktop
    },
    {
        id: 2,
        name: "PlayStation",
        icon: faPlaystation

    },
    {
        id: 3,
        name: "Xbox",
        icon: faXbox
    },
    {
        id: 4,
        name: "iOS",
        icon: faApple
    },
    {
        id: 5,
        name: "Android",
        icon: faAndroid
    },
    {
        id: 6,
        name: "Apple Macintosh",
        icon: faApple
    },
    {
        id: 7,
        name: "Linux",
        icon: faLinux
    },
    {
        id: 8,
        name: "Nintendo",
        icon: faGamepad
    },
    {
        id: 9,
        name: "Atari",
        icon: faGamepad
    },
    {
        id: 10,
        name: "Commodore / Amiga",
        icon: faDesktop
    },
    {
        id: 11,
        name: "SEGA",
        icon: faGamepad
    },
    {
        id: 12,
        name: "3DO",
        icon: faGamepad
    },
    {
        id: 13,
        name: "Neo Geo",
        icon: faGamepad
    },
    {
        id: 14,
        name: "Web",
        icon: faGlobe
    }
]