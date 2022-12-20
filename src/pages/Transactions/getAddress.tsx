const getAddress = async function () {
    
    let res = ''
    try{
        const address = ergo.get_change_address();
        address.then((value) => {
            res = value
        });
    }catch (e){
    }
    
    return res
}