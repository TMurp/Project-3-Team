## Deployed Project Link

https://bit.ly/3u33Qh8

## Overview & Concept

### Contributors

Contributors: [Tom Murphy](https://github.com/TMurp), [Marilyn Poku](https://github.com/marilynpoku) & [Mayur Kumar](https://github.com/Kumasta)

### Brief

A group project completed within a timeframe of 8 days. A MERN stack web app created as my 3rd project during my Software Engineering Immersive bootcamp at General Assembly and 8 weeks into the course and my coding journey.

The project task was to create a MERN stack app that allows users to register/login, create and edit entries. The project also needed to have responsive design (mobile friendly).

### Concept

The website we created is called Hidden Gems, it is a website for finding, posting, rating and discussing interesting places that might be unknown or niche in the UK.
The home page uses a React-Bootstrap carousel to display a randomised selection of the site's locations / ‘hidden gems’. Users can also search if they are looking for something specific.
Using our map page users can easily create a new ‘Hidden Gem’ by simply clicking where on the desired location, then the user will be prompted to enter the details of the Hidden Gem.
On a Hidden Gem’s page users can rate and comment, users can also like comments. Clicking on any poster/ commenters username will take you to their profile page.
The profile page gives users the ability to tell others about themselves. It also shows the users posted gems, their rating and the average rating of all their posts.

### Technologies Used

- JavaScript
- SASS
- JSX

### Back-end

- Mongoose
- Mongoose-unique-validator
- Jsonwebtoken
- Express

### Front-end

- Axios
- Buffer
- Eslint-plugin-react
- Mapbox-gl,
- React
- React-bootstrap
- React-dom
- React-map-gl
- React-router-dom
- React-router-hash-link
- React-scripts
- React-select

## Approach Taken 

### Wireframing

We used excalidraw.com to create our wireframes for each page. We used these to visualise the front-end and the styling needed. We colour coded certain components to visualise their importance and priority (Minimal viable product or stretch goal).

![image9](https://user-images.githubusercontent.com/94997077/163826334-1457bcb3-cfed-4828-a100-61d0c8c627eb.png)

We created a Trello board to organise our project. First is a design section that includes all of our theme ideas, colour palettes, animation and symbol ideas. The packages section helped plan what back and front ended packages we would need for the project. The user stories section helped us visualise using the site and what we would need to fulfil that vision.
In the To Do section we added every component needed to complete our vision. From there we could choose which of us would work on a certain component, once a component was completed it would be moved to the Code Review section where we would test and tweak.

![image10](https://user-images.githubusercontent.com/94997077/163826393-646955ec-5c4e-45c5-89d0-da9692c25087.png)

We used Zoom throughout the project to communicate. When building the back-end together or when needing a second opinion for the components we worked on alone, Zoom’s screen sharing function was used.
Once we built the back-end together we split the front-end components among us to work on alone. However we would often screen share and discuss the code for help or second opinions.
I worked on the show page, about page, rating component and comment likes component.

## Back-end

### Models

### User Model
The user model has the required username, email and password. The superUser field can be used to give a user admin privileges.
The embedded schema userSchema is seen on the profile page to display the user's name, bio and profile picture.
The virtual field ownedPins is used to check permission when the user wants to edit or delete a pin.

![image25](https://user-images.githubusercontent.com/94997077/163826799-8c03cd74-6aca-4d48-9542-61e6abdee62f.png)

### Pin Model
The pin schema is more complex. We have all the required fields such as title, type, longitude and latitude as well as optional fields like tags and status.
The embedded schema reviewSchema is used to add comments to a pin. This has an embedded schema within it, the likeSchema. This schema tracks the likes of a comment, the owner field is used to make sure that a user cannot give multiple likes to one comment.
The reviewSchema also has a virtual field sumOfLikes, which is used to calculate the amount of likes a comment has. If a comment has no likes it will return a string ‘Not rated yet’.
The embedded schema pinRatingSchema is used to give the pin a rating from 1 to 5, the owner field is used to make sure that a user cannot give multiple ratings to one pin.
The virtual field avgRating is used to calculate the average of all the ratings a pin receives, if there are no ratings it will instead return a string ‘Not rated yet’.

![image22](https://user-images.githubusercontent.com/94997077/163826854-4bc94b02-7a0e-4c63-892f-561ec5960737.png)

## API-End-Points

The API-end-points are what url we target with Axios requests. For example below shows a PUT request.

<img width="821" alt="image17" src="https://user-images.githubusercontent.com/94997077/163826988-e1f8f5c0-e7d3-40eb-85e1-eb21a6a86ae5.png">

### Register / Login
To login or register is a simple POST request containing the user data.

**Register User** - POST /api/register/

<img width="270" alt="image26" src="https://user-images.githubusercontent.com/94997077/163827424-0e9b5d34-d3af-4501-88e7-5af1420dcf82.png">

**Login User** - POST /api/login/

<img width="188" alt="image16" src="https://user-images.githubusercontent.com/94997077/163827432-4d2f85e0-fd5d-4a19-8ca8-9fb24a49b84d.png">

### User Profile
The user profile needs to be retrieved with a GET request or edited with a PUT request.

**Get a Profile** - GET /api/profile/[userID]

No body required

**Edit a profile (secure route)** - PUT /api/profile/[userID]

Body must be an existing field and different from the current value.

### Pins
Here things get more complex, not only can we use GET, POST, PUT and DELETE requests on the pin but also the pin’s ratings, comments and comment likes.

**Get all pins** - GET /api/pins

No body required

**Get one pin** - GET /api/pins/[pinID]

No body required

**Post a pin (secure route)** - POST /api/pins

![image11](https://user-images.githubusercontent.com/94997077/163827475-0b7d675a-dbbe-4de2-9e3a-2f970fc87758.png)

**Update a pin (secure route)** - PUT /api/pins/[pinID]

Body must be an existing field and different from the current value.

**Delete a pin (secure route)** - DELETE /api/pins/[pinID]

No body required

**Add a rating (secure route)** - POST /api/pins/[pinID]/rating

Rating between 1 - 5.

**Edit a rating (secure route)** - PUT /api/pins/[pinID]/rating

Rating between 1 - 5.

**Add a comment (secure route)** - POST /api/pins/[pinID}/reviews

![image13](https://user-images.githubusercontent.com/94997077/163827558-14e20e74-0ded-46f9-b0f2-3533400a6c8b.png)

**Edit a comment (secure route)** - PUT /api/pins/[pinID}/reviews/[reviewID]

![image19](https://user-images.githubusercontent.com/94997077/163827605-6550646a-9a6a-4a1f-aa9f-a47a9b352b1c.png)

**Delete a comment (secure route)** -  DELETE /api/pins/[pinID}/reviews/[reviewID]

No body required.

**Like a comment (secure route)** - POST /api/pins/[pinID]/review/[reviewID]/like

![image2](https://user-images.githubusercontent.com/94997077/163827663-564fd429-bba0-47fe-8aac-afa48cdc0ef0.png)

**Unlike a comment (secure route)** - DELETE /api/pins/[pinID]/review/[reviewID]/like/[likeID]
No body required.

## Front-end
### Navbar
The navbar has two states depending on if a user is logged in or not. In either state the nav bar can take us to the Map and About pages as well as the Search bar. The site symbol also serves as a home button.
If a user is not logged in the navbar shows buttons to either login or register. If a user is logged in the navbar shows buttons to go to the user’s profile page or to logout.

![image4](https://user-images.githubusercontent.com/94997077/163827808-86cd34c4-4f9e-4bdc-9fd4-9a6317fcab13.png)

![image7](https://user-images.githubusercontent.com/94997077/163827821-43a48427-6f8d-4294-bf91-f2e86c902ed3.png)

We used React Bootstrap for this component, mostly because of the great media query scaling it has. Here we see the mobile view of the navbar and the options dropdown.

![image6](https://user-images.githubusercontent.com/94997077/163827908-4bb522fb-a440-49d1-bc4c-51c9ef7c3008.png)

![image1](https://user-images.githubusercontent.com/94997077/163827919-a21ed5ee-e029-4d6f-a80c-c75eb969c04f.png)

### Home page
At the top of the home page is a carousel (created with React-bootstrap) that randomly selects some of the pins already in the database.
Below the carousel is the Most Rated section, here the top three pins with the highest average rating will be shown.
Below Most Rated is the search function, the user can select a tag from the dropdown list or search manually. The pin gallery below will update as the user types in the search bar to filter for what has been entered.

### Rating Utility
This is one of the utilities I created for this project. The purpose of this utility is to take a pin’s average rating and display it using the gem logos I created in Photoshop. I created three logos, a hollow gem, half-hollow gem and a normal gem.
Using these three I could display an average rating. The example below shows an average rating of 2.5.

![gem](https://user-images.githubusercontent.com/94997077/163828224-7e649160-3a92-4f18-b9a8-58df9efa03bc.png)

But what if the rating was 2.8? I decided that instead of creating an image of a partially filled gem for each decimal point I would write code to round the average rating to the nearest integer or .5 decimal.

<img width="459" alt="image21" src="https://user-images.githubusercontent.com/94997077/163828340-78baeb4b-f3db-4a1f-a687-d4fa928341a8.png">

I import the pin’s average rating from our homepage component (where the pin GET request is) and set it as the hasRating state.

Within the useEffect I set the rating variable to my hasRating value.

The ratingRemainder variable is used to calculate any decimal places in the rating.

The rating and ratingRemainder variables are now used in the diamonds array.

The first for loop pushes one gem image into the diamonds array. It does this until it has met the rating value (rounded down to the closest integer).

Next if the ratingRemainder is between 0.25 and 0.75 it pushes a half gem image into the diamonds array (representing rounding to .5 decimal).

The second for loop takes the diamonds array length, if it is less than 5 it pushes a hollow gem image into the diamonds array. It does this until the diamond's array length is 5.

I set the averageRating state as my diamonds array so it can be used in JSX. 

Next to display this on the page I wrote the following JSX. Using a map on the averageRating state it prints out the array, giving each diamond its value as a class (needed for the click function I will show later). If there is no current rating instead a string ‘Not Rated’ will show.

<img width="795" alt="image23" src="https://user-images.githubusercontent.com/94997077/163828562-172c6b92-d048-4156-8938-ccd491e529f4.png">

So far the average rating will be displayed on page load. But I wanted the rating to be interactive, if a user has not already posted a rating for the current pin they can click on a gem and give it the targeted value (clicking the 4th gem will give a rating of 4).

The following code sets the selectRating state as the value of the clicked target’s name (which is established in the map above).
Then it checks if the current user has already rated the pin by checking the pinRating array for a rating that matches the current user's payload.sub.

<img width="555" alt="image24" src="https://user-images.githubusercontent.com/94997077/163828644-08e25f00-a50c-4c65-b1d3-890b94fde9b9.png">

If the current user has not rated the current pin then on click a post request is sent with the selected rating value. It does this by checking if the ownedRating value (it will be -1 if the current user has no ratings for the current pin).

<img width="548" alt="image8" src="https://user-images.githubusercontent.com/94997077/163828696-927ee533-9a6f-44b7-867b-e44f5e789113.png">

If the current user has already posted a rating a PUT request will be sent instead, changing the rating instead of adding another.

<img width="821" alt="image17" src="https://user-images.githubusercontent.com/94997077/163828748-27b33af4-9bd2-4127-8fba-dd415c21b1ea.png">

Using React and state means that anytime the user clicks to set or update the rating it will update in realtime.

### Show page
The show page shows all the information about the selected Hidden Gem. If the current user owns the gem it will show an Edit Gem button that links to a form page.
Below the information is the comment section and a minimap showing the current Hidden Gems location. 

### Map page
This page shows all current Hidden Gems. Users can click on them to display a card with simple info, if the card is clicked it will take the user to the gem’s show page.

Alternatively the user can use the search bar to filter the Hidden Gems or find a specific one, gems can be filtered by type, tags and address.

Clicking anywhere else on the map will either prompt you to create a new Gem at that location or if you are not logged in, to register or log into your account. This will take you to the Gem form to create a new Gem record.

![image20](https://user-images.githubusercontent.com/94997077/163828853-2499187f-2993-468d-b4cf-1d6def1a2751.png)

### Profile page
A user's profile page can be found by clicking on their name (found on a comment or as the owner of a Hidden Gem) or if logged in a profile button in the navbar will lead to the user's own profile page.

This page is a great way to edit or delete any of your posted Hidden Gems.

![image18](https://user-images.githubusercontent.com/94997077/163828901-9fb8648f-4a6d-4472-89a5-98867f8b8578.png)

### Styling
We decided on a minimalist style with a black and white theme. This allows the Hidden Gem images to shine. However on the map page we went with a dark map theme and bright blue gems to make them a focus.

### Rating Utility Animations
For the rating utility I designed I used animations to emphasise its interacability. Two animations were used.

The pulse animation triggered on mouse hover, this helps signal to the user that it can be interacted with.

<img width="230" alt="image12" src="https://user-images.githubusercontent.com/94997077/163828999-75d7c74d-cbfa-444a-80fc-e4ef9ebc24e2.png">

The shake animation triggers on mouse click, this lets the user know the click did something and makes it satisfying.  

<img width="435" alt="image15" src="https://user-images.githubusercontent.com/94997077/163829019-09afb90b-ac12-452e-8874-8f37262e2aa0.png">

## Challenges, Bugs & Wins
### Challenges
The rating utility was the biggest challenge for me during this project, but also the most rewarding. First I had to figure out the best way to display the rating. I created the function to take the average rating and turn it into an array of diamond images that represented the average rating to the nearest .5 decimal place.

Then using JSX I mapped the array onto the page and created a function that upon clicking a diamond, set the rating.

But to avoid a user making multiple ratings I created a function to check if the user had already made a rating, if they had the post request would instead be a put request, this changes the current rating instead of adding another. I used a similar method for the comment likes.

### Bugs
I encountered a few bugs in this project. The biggest being post and put requests triggering multiple times, this was due to useEffects triggering every time the state they depended on being updated.

### Wins
I really enjoyed making an interactive rating utility, I am proud of its functionality and intractability.
Using GitHub to work efficiently as a group. We would regularly merge branches and resolve conflicts.

## Future Features + Key Learnings
### Future Changes / Improvements
We achieved most of our stretch goals for the project. My main improvement would be refactoring and reorganising the code.

### Key Learnings
Using GitHub to work collaboratively.

Building a back-end, I gained a lot of confidence using Express, Mongoose and Node.js.

React competency and knowledge, especially using state and useEffects.

Creating functions that change depending on the user status.

Using mapbox-gl.

### Contact

Email - tommurphyse@gmail.com

Social - [linkedin.com/in/tom-j-murphy/](https://www.linkedin.com/in/tom-j-murphy/)

Project Link - [bit.ly/3u33Qh8](https://bit.ly/3u33Qh8)

GitHub - [github.com/TMurp](github.com/TMurp)
