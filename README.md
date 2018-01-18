##  React Chat interface
This is just a interface for listing messages using react.
<p align='center'>
<img src='src/images/screen-shot.png'>
</p>


- You write text and click send button, then it shows up on the screen.
- If you check 'public' check box, it shows 'public' label, else it shows 'private'.
- For the initial data, basically, it calls a get request api, but if there's no server, it uses [static json data]('chat-test/src/data/MOCK_DATA.js') .
- Same for post message. It calls a post request api first, when no server, get data from static file.
- I use [json-server]('https://github.com/sunyrora/chat-test/src/data/MOCK_DATA.js') to see the request works fine.
- I use [jest]('https://facebook.github.io/jest/') and [enzyme]('http://airbnb.io/enzyme/') for testing.
