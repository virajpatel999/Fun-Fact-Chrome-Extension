## Random Facts for Google Chrome

[Random Facts for Google Chrome](https://goo.gl/hBkcKR) is the extension which shows a new random fact about numbers on every new tab with a new high quality picture on the background.

[Install it to Google Chrome from Chrome Store.](https://goo.gl/hBkcKR)

The extension uses the Numbers API from the RapidAPI for the facts and the Unsplash API for the beautiful high quality background images.

In order to use it locally, just clone the repository and open the index.html file in Google Chrome. 

In order to test it as an extension and improve it: 

- Get your API key from RapidAPI.<sup>[1][1]</sup>
- Insert the key you obtained to the `GetFact.js` file, instead of the placeholder `<YOUR_RAPIDAPI_KEY_HERE>`.
- Navigate to `chrome://extensions`.   
- Expand the developer dropdown menu and click "Load Unpacked Extension".    
- Navigate to local folder and select the folder as the source.    
- Assuming there are no errors, the extension should load into your browser.    

[1]: https://docs.rapidapi.com/docs/keys
   