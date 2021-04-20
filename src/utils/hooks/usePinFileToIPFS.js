//.post'(http://localhost:5001' + "/api/v0/add", files={})
//"https://ipfs.io/ipfs/{}?filename={}"
//imports needed for this function
const axios = require('axios');
const FormData = require('form-data');

export const pinFileToIPFS = (file, nftData) => {
    const pinata_api_key = 'bcf17fe37e04f7c83149';
    const pinata_secret_api_key = '215ecbf09900d4ebd31663c13307612fae5db8c3124db527270c505f7e548513';
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData()

    const metadata = JSON.stringify(nftData)
    data.append('pinataMetadata', metadata)
    data.append('file', file)

    console.log('SE EJECUTO IPFS PIN')

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key,
                pinata_secret_api_key
            }})
            .then(function (response) {
                console.log('se subio correctamente', response.data.IpfsHash)
                let image_uri = `https://ipfs.io/ipfs/${response.data.IpfsHash}?filename=${nftData.name}`
                return image_uri
                // SUBIR A BLOCKCHAIN
            })
            .catch(function (error) {
                //handle error here
                console.log('hubo un error', error)
            });
};