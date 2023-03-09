import axios from "axios";
import FormData from 'form-data';

export const getImages = (image) => {
    let API_USER = '849946062';
    let API_SECRET = 'T8ivwJyEnthUrDNShnQo';
    let uriParts = image.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('media', {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });
    formData.append('models', 'properties,text-content,nudity-2.0');
    formData.append('api_user', API_USER);
    formData.append('api_secret', API_SECRET);
    try {
        return axios(
            {
                method: 'post',
                url:'https://api.sightengine.com/1.0/check.json',
                data: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            }
        )

    } catch (error) {
        console.error(error);
    }
}

export const getColorName = async (color) => {
    try {
        const response = await fetch(`https://www.thecolorapi.com/id?hex=${color}`);
        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

