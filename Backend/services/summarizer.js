import { pipeline } from '@xenova/transformers';

// Initialize the generator outside the function
const generator = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
export async function summarize(data) {
    
    let result=[];

    for (const textObj of data) {
        // Split the text into words
        const words = textObj.text.split(/\s+/);

        // Extract the top 1000 words
        const topWords = words.slice(100, 400).join(' ');
        console.log(topWords);
        let output = await generator(topWords, {
            min_length: 50, max_length: 200,
        });
        //console.log(output);
        result.push(output)
        
    }

    // console.log('------------------------------===========================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',result);
    // try {
        
    //     output = await generator(result, {
    //         min_length: 300, max_length: 700,
    //     });

    // } catch (error) {
    //     console.error('Error during summarization:', error);
    // }
    return result;
}