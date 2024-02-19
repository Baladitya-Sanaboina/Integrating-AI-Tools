let gridButtonEl = document.getElementById("gridButton");
let downloadButtonEl = document.getElementById("downloadButton")
let firstCardEl = document.getElementById("firstCard");
let secondCardEl = document.getElementById("secondCard")
let thirdCardEl = document.getElementById("thirdCard")
let fourthCardEl = document.getElementById("fourthCard")
let fivthCardEl = document.getElementById("fivthCard")
let sixthCardEl = document.getElementById("sixthCard")
let cards_array = [firstCardEl, secondCardEl, thirdCardEl, fourthCardEl, fivthCardEl, sixthCardEl]
let buttonClicked = false;
gridButtonEl.addEventListener('click', function(){
    if (buttonClicked === true){
        buttonClicked = false;
        for(let i of cards_array){
            i.classList.remove("col-md-4", "shadow")
            i.classList.add("col-md-12", "card-container-2")
        }
    } else{
        for(let i of cards_array){
            buttonClicked = true;
            i.classList.remove("col-md-12", "card-container-2")
            i.classList.add("col-md-4", "w-100")
        }
    }
})

function showSidebar(){
    const sidebar=document.querySelector('.sidebar');
    sidebar.style.display="flex"
  }

  function hideSidebar(){
    const siderbar=document.querySelector('.sidebar')
    siderbar.style.display='none'
   }


document.getElementById('generateImgBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    let spinnerEl = document.getElementById("spinner");
    spinnerEl.classList.remove("d-none")
    try {
        const response = await fetch('/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        if (data.success) {
            const imageUrl = data.imageUrl;
            // Display the generated image
            let imageContainerEl = document.getElementById("imageContainer")
            imageContainerEl.classList.add("image-container")
            spinnerEl.classList.add("d-none")
            let imageEl = document.getElementById("imageEl");
            imageEl.src = imageUrl;
            downloadButtonEl.classList.remove("d-none")
        } else {
            alert('Failed to generate image. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }

});
document.getElementById('generateVideoBtn').addEventListener('click', async () => {
    const promptText = document.getElementById('promptVideo').value;
    let spinnerEl = document.getElementById("spinnerVideo");
    let videoPlayEl = document.getElementById("videoEl");
    spinnerEl.classList.remove("d-none")
    try {
        const response = await fetch('/generate-video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: promptText })
        });
        const data = await response.json();
        if (data.success) {
                const videoUrl = data.videoUrl;
                spinnerEl.classList.add("d-none")
                videoPlayEl.classList.remove("d-none")
                videoPlayEl.src = videoUrl;

            } else {
                alert('Failed to generate video. Please try again.');
            }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });


document.getElementById('generateAudioBtn').addEventListener('click', async () => {
    const audioPrompt = document.getElementById('audioPrompt').value;
    try {
        const response = await fetch('/generate-audio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: audioPrompt})
        });
        const data = await response.json();
        if (data.success) {
            const audioUrl = data.audioUrl;
            let audioEl = document.getElementById("audioEl");
            // Set the source of the audio element
            audioEl.src = audioUrl;
            let audioTestEl = document.getElementById("audioTest");
            audioTestEl.textContent = audioUrl;
            // Load the audio
            audioEl.load();
        } else {
            alert('Failed to generate audio. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});