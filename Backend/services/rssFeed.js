// import Parser from 'rss-parser';

// const titles = ['travel-advisory', 'weather-news'];
// const prefixUrl = 'https://news.google.com/rss/search?q='
// const suffixUrl = '%20when%3A1d&hl=en-IN&gl=IN&ceid=IN%3Aen'

// const parser = new Parser();
// export async function collectRssFeeds(destination = 'delhi') {
//     const customWord_1 = titles[0] + '-' + destination;
//     let finalUrl = `${prefixUrl}${customWord_1}${suffixUrl}`;
//     const travelAdvisory = await parser.parseURL(finalUrl).then((data) => {
//         const links = data.items.map((item) => {
//             const linkObj = {
//                 title: item.title,
//                 link: item.link,
//             };
//             return linkObj;
//         });
//         return links.slice(0, 2);
//     });

//     const customWord_2 = titles[1] + '-' + destination;
//     finalUrl = `${prefixUrl}${customWord_2}${suffixUrl}`;
//     const weather = await parser.parseURL(finalUrl).then((data) => {
//         const links = data.items.map((item) => {
//             const linkObj = {
//                 title: item.title,
//                 link: item.link,
//             };
//             return linkObj;
//         });
//         return links.slice(0, 2);
//     });

//     const cleanTravelLinks = cleanLinks(travelAdvisory);
//     const cleanWeatherLinks = this.cleanLinks(weather);

//     return cleanTravelLinks;
//     // const travelScrap = await scrape(cleanTravelLinks);
//     // //const weatherScrap = await scrape(cleanWeatherLinks);
//     // //console.log('Travel Scrap:', travelScrap);
//     // //console.log('Weather Scrap:', weatherScrap);
//     // const summarizedTravelAdv = await summarize(travelScrap);
//     // console.log(summarizedTravelAdv);
//     //nst suumarizedWeather = await summarize(weatherScrap);
// }

// function cleanLinks(links) {
//     links.forEach(link => {
//         link.link = link.link.replace('/rss', '');
//     });
//     return links;
// }

import Parser from 'rss-parser';

const titles = ['travel-advisory', 'weather-news'];
const prefixUrl = 'https://news.google.com/rss/search?q=';
const suffixUrl = '%20when%3A1d&hl=en-IN&gl=IN&ceid=IN%3Aen';

const parser = new Parser();

export async function collectTravelAdvisory(destination = 'delhi') {
    const customWord = titles[0] + '-' + destination;
    const finalUrl = `${prefixUrl}${customWord}${suffixUrl}`;
    const travelAdvisory = await parser.parseURL(finalUrl).then((data) => {
        const links = data.items.map((item) => {
            const linkObj = {
                title: item.title,
                link: item.link,
            };
            return linkObj;
        });
        return links.slice(0, 2);
    });

    return cleanLinks(travelAdvisory);
}

export async function collectWeatherNews(destination = 'delhi') {
    const customWord = titles[1] + '-' + destination;
    const finalUrl = `${prefixUrl}${customWord}${suffixUrl}`;
    const weather = await parser.parseURL(finalUrl).then((data) => {
        const links = data.items.map((item) => {
            const linkObj = {
                title: item.title,
                link: item.link,
            };
            return linkObj;
        });
        return links.slice(0, 1);
    });

    return cleanLinks(weather);
}

function cleanLinks(links) {
    links.forEach(link => {
        link.link = link.link.replace('/rss', '');
    });
    return links;
}
