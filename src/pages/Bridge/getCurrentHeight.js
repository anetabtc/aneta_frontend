const DEFAULT_EXPLORER_URL = "https://api-testnet.ergoplatform.com";

const getCurrentHeight = async function (explorerUrl = DEFAULT_EXPLORER_URL){
    console.log("currentheight")
    let url = `${explorerUrl}/api/v1/blocks?limit=1`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json.total;
}

export default getCurrentHeight