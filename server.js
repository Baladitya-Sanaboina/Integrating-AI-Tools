const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Replicate = require('replicate');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.REPLICATE_API_KEY;

if (!apiKey) {
    console.error("Please provide a valid REPLICATE_API_KEY in your environment variables.");
    process.exit(1);
}

const replicate = new Replicate({ auth: apiKey });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;
    try {
        const output = await replicate.run(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            {
                input: {
                    width: 768,
                    height: 768,
                    prompt: prompt,
                    scheduler: "K_EULER",
                    num_outputs: 1,
                    guidance_scale: 7.5,
                    num_inference_steps: 50
                }
            }
        );

        // Log the entire output object for debugging
        console.log('Output object:', output);

        // Check if the output contains a valid URL
        if (output && output.url) {
            // Send the URL in the response
            res.json({ success: true, imageUrl: output.url });
        } else {
            // Log an error if the URL is not found
            console.error('Image URL not found in the response:', output);
            res.status(500).json({ success: false, error: 'Failed to generate image' });
        }
    } catch (error) {
        // Log and handle any errors that occur during image generation
        console.error('Error generating image:', error);
        res.status(500).json({ success: false, error: 'Failed to generate image' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
