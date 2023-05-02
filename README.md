# Module 2 Group Assignment

CSCI 5117, Spring 2022, [assignment description](https://canvas.umn.edu/courses/355584/pages/project-2)

## App Info:

* Team Name: Six Pack
* App Name: ScreenStash
* App Link: https://screenstash.netlify.app/

### Students

* Andrew Owens, owens518@umn.edu
* Levi Cavagnetto, cavag004@umn.edu
* Nathan Kohane, kohan032@umn.edu
* Andrew Amakye Ansah, amaky001@umn.edu
* Johnny Jiang, jian0684@umn.edu
* Ryan Hill, hill1886@umn.edu

## Key Features

**Describe the most challenging features you implemented
(one sentence per bullet, maximum 4 bullets):**

* The Google Maps API integrations were somewhat hard to implement, as there is not an incredible amount of documentation for the @react-google-maps/api package and React lifecycle hooks are hard to manage when the Google Maps map object is updating.

Which (if any) device integration(s) does your app support?

* Our Google Maps widget supports device location via the geolocation browser API. This location is then used to perform a nearby search for surrounding movie theaters.

Which (if any) progressive web app feature(s) does your app support?

* ...



## Mockup images

![](pics/movies.png?raw=true "Home")
* User can view list of movies they want to watch.
* User can click on movie to show more details about the movie
* User can add or remove movies from their list

![](pics/movie_search.png?raw=true "Search")
* User can search for movies from the home screen
* Results are listed without taking user to new page
* User can select movie to view more details

![](pics/movie_details.png?raw=true "Details")
* User can view the title, year, and description of movie.
* User can see where they can watch the movie.
* User can view tags associated with movie.
* User can add movie to their movie list.

![](pics/login.png?raw=true "Details")
* User can create an account and access settings.
* Will lead user to user account page that will allow them to access and change info.

## Testing Notes

**Is there anything special we need to know in order to effectively test your app? (optional):**

* ...



## Screenshots of Site (complete)

**[Add a screenshot of each key page](https://stackoverflow.com/questions/10189356/how-to-add-screenshot-to-readmes-in-github-repository)
along with a very brief caption:**

![](pics/homeScreen.png?raw=true "Details")
![](pics/dashboard.png?raw=true "Details")
![](pics/gmaps.png?raw=true "Details")



## External Dependencies

**Document integrations with 3rd Party code or services here.
Please do not document required libraries (e.g., Vue, Vuefire, Firebase).**

* Library or service name: description of use
* TMDb API: For each movie displayed or searched for on the home page, we query the TMDb API for its broad specifics. These include original release date, popularity, genre, original language, and a link to an image of the movie's release poster. This information is then processed and rendered on the dashboard and homescreen on the website.
* Movie of the Night Streaming Availability API: We use the MotN API to query streaming services for a given movie. This includes overview data, such as the platform the movie is being streamed on, and more specific content such as price, audio information, and available subtitles.
* Google Maps API: For the device integrations part of the project requirements, we decided to use a Google Maps widget to display available movie theaters surrounding the user. From a call to the browser's geolocation API, we use this location to center the screen and generate a marker. Then, a `nearbySearch()` call is made to the Google Maps API, and a unique marker is generated on the map for every object returned with information about the theater.

**If there's anything else you would like to disclose about how your project
relied on external code, expertise, or anything else, please disclose that
here:**
* Parts of the Google Maps widget (including its CSS, infoWindow, and MapControl interface) were sourced from and inspired by the official documentation. We did this to keep code and visual continuity with the Google Maps objects rendered by the npm package.

...
