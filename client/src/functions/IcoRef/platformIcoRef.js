import { faDesktop, faGamepad, faGlobe, faAd } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox, faApple, faAndroid, faLinux } from "@fortawesome/free-brands-svg-icons";

export default function getIconPlataforms(platforms) {

    if (platforms instanceof Array) {
        let iconPlatform
        if (platforms[0]?.id) {
            iconPlatform = platforms.map(e => getIconPlatformById(e.id, e.name))

        } else {
            iconPlatform = platforms.map(e => getIconPlatformById(e, e))
        }

        return iconPlatform
    }
    else {
        return []
    }
}

function getIconPlatformById(id, name) {

    const platform = iconReference.filter(e => parseInt(e.id) === parseInt(id) || e.name === name)
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
        id: 8,
        name: "Android",
        icon: faAndroid
    },
    {
        id: 5,
        name: "Apple Macintosh",
        icon: faApple
    },
    {
        id: 6,
        name: "Linux",
        icon: faLinux
    },
    {
        id: 7,
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
    },
    {
        id: "PC (Windows)",
        name: "PC (Windows)",
        icon: faDesktop
    },
    {
        id: "PC (Windows), Web Browser",
        name: "PC (Windows), Web Browser",
        icon: faDesktop
    },
    {
        id: "Web Browser",
        name: "Web Browser",
        icon: faGlobe
    },
    
]