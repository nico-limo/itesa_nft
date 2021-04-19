//.post'(http://localhost:5001' + "/api/v0/add", files={})
//"https://ipfs.io/ipfs/{}?filename={}"
//imports needed for this function
//import baby from '../testimg/nft.jpg';
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const pinataApiKey = '1af95f6569aeec024ce2';
const pinataSecretApiKey = 'b1fc4addede17ce1c5f6e58a27f8acea7f8ab03662c57765e0d3f34e1bf3411e';

export const pinFileToIPFS = (artWork, pinataApiKey = '1af95f6569aeec024ce2', pinataSecretApiKey = 'b1fc4addede17ce1c5f6e58a27f8acea7f8ab03662c57765e0d3f34e1bf3411e') => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append('file', fs.createReadStream('../testimg/nft.jpg'));

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
        name: `${artWork.title}`,
        keyvalues: {
            descrption: `${artWork.descrption}`,
            author: `${artWork.authorId}`,
        }
    });
    console.log('SE EJECUTO IPFS PIN')
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    /*     const pinataOptions = JSON.stringify({
            cidVersion: 0,
            customPinPolicy: {
                regions: [
                    {
                        id: 'FRA1',
                        desiredReplicationCount: 1
                    },
                    {
                        id: 'NYC1',
                        desiredReplicationCount: 2
                    }
                ]
            }
        }); */
    //data.append('pinataOptions', pinataOptions);

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            console.log('se subio correctamente', response)
        })
        .catch(function (error) {
            //handle error here
            console.log('hubo un error', error)
        });
};