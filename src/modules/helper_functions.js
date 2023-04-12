const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getList(authToken, content) {
    const result = await fetch(backend_base+"/lists/" + content._id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function addList(authToken, content) {
    const result = await fetch(backend_base+"/lists/" + content._id,{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({listContent: content})
    })
    return await result.json();
}


export async function deleteList(authToken, content) {
    const result = await fetch(backend_base+"/lists/" + content._id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}

export async function updateList(authToken, content) {
    const result = await fetch(backend_base+"/lists/" + content._id, {
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(content)
    });
    return await result.json();
}

export async function searchMedia(authToken, media) {
    const result = await fetch(backend_base+"/media/" + media._id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getMediaInfo(authToken, media) {
    const result = await fetch(backend_base+"/media/" + media._id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getMediaStreamingService(authToken, service) {
    
    const result = await fetch(backend_base+"/media?" + new URLSearchParams({service}), {
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if (result.ok) {
        const services =  await result.json();
        if (services.length >0) {
            return services
        } else {
            return null
        }
    } else {
        return null;
    }
}

export async function getMediaRatings(authToken, media) {
    
    const result = await fetch(backend_base+"/media?" + new URLSearchParams({media}), {
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if (result.ok) {
        const ratings =  await result.json();
        if (ratings.length >0) {
            return ratings
        } else {
            return null
        }
    } else {
        return null;
    }
}
