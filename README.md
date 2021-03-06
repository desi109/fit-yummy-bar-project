<!--
*** Using markdown "reference style" links for readability.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/desi109/fit-yummy-bar-project/">
    <img style="" src="logo.png" alt="Logo" width="40%" height="100%">
  </a>


  <h3 align="center">Fit Yummy BAR</h3>

  <p align="center">
    Fit Yummy BAR is a web application that allows you to order healthy, delicious, yummy food. <br>You can easily and quickly make a new order. Admins will review the order and send the food to your shipping address.
    <br />
    <a href="https://github.com/desi109/fit-yummy-bar"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/desi109/fit-yummy-bar">View Demo</a>
    ·
    <a href="https://github.com/desi109/fit-yummy-bar/issues">Report Bug</a>
    .
    <a href="https://github.com/desi109/fit-yummy-bar/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The app has a yellow minimalistic design and it is easy to be used by everyone.

User App: https://desi109.github.io/fit-yummy-bar/

Admin Panel: https://desi109.github.io/admin/

Credentials for login as administrator are:
```
Email: ivan.ivanov@gmail.com
Password: 123456
```


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
To run this project you first need to install and set up:
* MongoDB
* Angular
* Express.js 
* [Node.js](https://nodejs.org/en/download/)
* [Nx](https://nx.dev/) ( monorepo - one repository, multiple projects, shared libraries)

And of course, every application has its own components or own modules.)


### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/desi109/fit-yummy-bar.git
   ```

2. Set up the database for the project. Import files to MongoDB from database folder.
  
3. Start the back-end of the project:
   ```sh
   cd ~/fit-yummy-bar/backend/app-backend
   npm install
   killall -9 node
   npm start
   ```
   It is running on ```localhost:3000```.

   To restart, first kill the process:
   ```sh
   kill -9 $(lsof -t -i:3000)   
   ```
   And run the previous command to start it again.

4. Start the front-end of the project:
   ```sh
   cd ~/fit-yummy-bar/frontend
   npm install
   ```

<br>

---
  ***Fit Yummy BAR***

  ```sh
   nx serve fit-yummy-bar
   ```
   It is running on ```localhost:4200```.

   To restart, first kill the process:
   ```sh
   sudo kill -9 $(lsof -t -i:4200)
   ```
   And run the previous command to start it again.

<br>

---
   ***Admin Panel***
   ```sh
   nx serve admin --port 4100
   ```
   It is running on ```localhost:4100```.

   To restart, first kill the process:
   ```sh
   sudo kill -9 $(lsof -t -i:4100)
   ```
   And run the previous command to start it again.



5. Everything is ready. Enjoy!  😉
 


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/desi109/fit-yummy-bar/issues) for a list of proposed features (and known issues).



<!-- CONTACT -->
## Contact
[![LinkedIn][linkedin-shield]][linkedin-url] 

Project Link: [https://github.com/desi109/fit-yummy-bar](https://github.com/desi109/fit-yummy-bar)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/desi109/fit-yummy-bar.svg?style=for-the-badge
[contributors-url]: https://github.com/desi109/fit-yummy-bar/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/desi109/fit-yummy-bar.svg?style=for-the-badge
[forks-url]: https://github.com/desi109/fit-yummy-bar/network/members
[stars-shield]: https://img.shields.io/github/stars/desi109/fit-yummy-bar.svg?style=for-the-badge
[stars-url]: https://github.com/desi109/fit-yummy-bar/stargazers
[issues-shield]: https://img.shields.io/github/issues/desi109/fit-yummy-bar.svg?style=for-the-badge
[issues-url]: https://github.com/desi109/fit-yummy-bar/issues
[license-shield]: https://img.shields.io/github/license/desi109/fit-yummy-bar.svg?style=for-the-badge
[license-url]: https://github.com/desi109/fit-yummy-bar/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/desislava-milusheva-200574151

