const partialUrl = 'localhost';

const addTenant = async (tenant) => {
    const resp = await fetch(`http://${partialUrl}:3001/tenants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenant)
    });

    const data = await resp.json();

    if (!resp.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }

    return data;
}

const updateTenant = async (tenant) => {
    const resp = await fetch(`http://${partialUrl}:3001/tenants`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenant),
    });

    const data = await resp.json();

    if (!resp.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }

    return data;
}

const deleteTenant = async (id) => {
    console.log("delete id type is " + typeof id);
    console.log("delete id is: " + id);
    const resp = await fetch(`http://${partialUrl}:3001/tenants/${id}`, {
        method: 'DELETE',
    });
    const data = await resp.json();
    if (!resp.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
}

const getTenants = async () => {
    const resp = await fetch(`http://${partialUrl}:3001/tenants`, {
        method: 'GET'
    });
    
    return resp.json();
};


// need to check
const getSingleTenant = async (id) => {
    console.log("id type is " + typeof id);
    console.log("id is: " + id);
    const resp = await fetch(`http://${partialUrl}:3001/tenants/${id}`, {
        method: 'GET'
    });

    return resp.json();
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    addTenant,
    updateTenant,
    deleteTenant,
    getTenants,
    getSingleTenant
};