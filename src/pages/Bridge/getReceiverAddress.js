function getReceiverAddress() {
    let address

    fetch("http://localhost:5004/getErgVaultAddress")
        .then(res1 => res1.json())
        .then((result) => {
            console.log("Vault BTC amount: " + JSON.stringify(result.address))
            address = JSON.stringify(result.address)
        })

    console.log("re", address)
    return address
}

export default getReceiverAddress




