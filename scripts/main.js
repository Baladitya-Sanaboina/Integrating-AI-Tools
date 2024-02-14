document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    try {
        const response = await fetch('/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        if (data.success) {
            const imageUrl = data.imageUrl;
            // Display the generated image
            let headingEl = document.getElementById("imageLink");
            headingEl.textContent = "Image URL: " + imageUrl;
            
            let imageEl = document.getElementById("imageEl");
            imageEl.src = imageUrl;
        } else {
            throw new Error('Failed to generate image');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
