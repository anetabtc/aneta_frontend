async function getReceiverAddress() {
    const responce = await fetch("http://localhost:5004/getErgVaultAddress");
    const result = await responce.json()
    const address = await result?.["address"]
    return address
}

export default getReceiverAddress




