import { faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";

export default function getIconSource(id) {
    
    if (id) {
        let iconPlatform
        if (id[0]?.id) {
            iconPlatform = id.map(e => getIcon(e.id))
        }
        
        return iconPlatform
    }
    else {
        return []
    }
}

function getIcon(id){
    
    
    if (id && typeof id === 'number') {
        return apiIcon
    }
    else if (id === 'api') return apiIcon
    else if(id) return db
    else return []
}
    

const apiIcon = {
        id: 1,
        name: "Friends",
        icon: faUserFriends
    }


const db =  {
        id: 2,
        name: "Own",
        icon: faUser
    }
