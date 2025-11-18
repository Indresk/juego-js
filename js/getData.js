const getData = async (url)=>{
    try{
        const r = await fetch(url)
        if (!r.ok) {
            throw new Error(`HTTP ${r.status} - ${r.statusText}`);
        }
        return await r.json();
    }
    catch(error){
        throw error;
    }
}

export default getData