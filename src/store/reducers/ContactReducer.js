
const initState = {
    // contacts:[
    //     {id: 1 , name: 'Hohn Adey', phone: '+4852215525'},
    //     {id: 2 , name: 'Edoy Ply', phone: '+00124514521'},
    //     {id: 3 , name: 'Annoy Plex', phone: '+5521515555'}
    // ]
}

const ContactReducer = (state = initState , action ) => {
    switch (action.type) {
        case 'CREATE_CONTACT':
            console.log('Created Project', action.contact)
            return state
        case 'CREATE_CONTACT_ERROR':
            console.log('Create Project Error', action.error.message);
            return state
        default:
            return state
    }
}


export default ContactReducer