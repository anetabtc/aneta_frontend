const getAddress = async function get() {

    let result = false
    try {
        const address = await ergo.get_change_address();
        if (address){
            console.log(address)
            result = true

            // address.then((value) => {
            //     console.log ("value is:", value)
            //     result = value;
            //     console.log("Result", result)
            // }).catch((error) => {
            //     console.log("error", error)
            // })
        }

    } catch (error) {
        console.log("trycatch", error)
    }


    console.log("Result", result)
    return result
}

export default getAddress