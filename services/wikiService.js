import axios from '../axios';

const getPageID = (name, year) => axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&redirects=1&converttitles=1&srsearch=${name}%20${year}%20film&srnamespace=6&srlimit=10&srwhat=nearmatch&srsort=just_match`);
const getFileName = (pageid) => axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=images&pageids=${pageid}&redirects=1&converttitles=1&imlimit=10`);
const getimageurl = (name) => axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&titles=${name}&iiprop=timestamp%7Cuser%7Curl`);
const getImage = (url) => axios.get(url)

const WikiService = {
    getPageID,
    getFileName,
    getimageurl,
    getImage
}
export default WikiService