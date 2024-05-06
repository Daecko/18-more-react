import * as React from 'react'
import './App.css'

import darkIcon from './assets/icon-moon.svg'
import lightIcon from './assets/icon-sun.svg'
import searchIcon from './assets/icon-search.svg'

import locationIcon from './assets/icon-location.svg'
import twitterIcon from './assets/icon-twitter.svg'
import websiteIcon from './assets/icon-website.svg'
import companyIcon from './assets/icon-company.svg'

function App() {
  const [darkmode,setDarkMode] = React.useState(false);
  const [userData,setUserData] = React.useState({name:null, info:null})
  const [error, setError] = React.useState('')
  const inputRef = React.useRef()
  const {
    avatar_url,
    login,
    bio,
    public_repos,
    company,
    location,
    twitter_username,
    blog,
    following,
    followers,
    created_at,
    name,
  } = userData.info || {};

  React.useEffect(() => {
    async function getUser() {
      const response = await fetch(
        `https://api.github.com/users/${userData.name ? userData.name : "cedako"}`
      );
      const data = await response.json();
      if (data.message) {
        setError("No results");
        return;
      }

      setError(null);
      setUserData((prev) => ({ ...prev, info: data }));
    }

    getUser();
  }, [userData.name]);
  function searchDev() {
    setUserData((prev) => ({ ...prev, name: inputRef.current.value }));
  }
  /* I've helped myself by looking at my classmates repositories as i am unable to 
  sometimes just sit and watch the entire class to learn something, you'll notice that
  due not only to the pieces of code that look similar, but also the way i coded other
  things that would be 'easier' to do by just following React tutorials (darkmode for example). */
  return (
    <div className={darkmode ? 'root dark':'root'}>
      <div className={darkmode ? 'mainCont dark':'mainCont'}>
        <div className='centralCont'>
          <div className='themeToggle'>
            <p className={darkmode ? 'devfinderLogo dark':'devfinderLogo'}>devfinder</p>
            <div className={darkmode ? 'themeButton dark':'themeButton'} onClick={()=>setDarkMode(!darkmode)}>
              <p className={darkmode ? 'themeIconTxt dark':'themeIconTxt'} id='themeIconTxt' >{darkmode ? 'LIGHT' : 'DARK'}</p>
              <img id='themeIcon' src={darkmode ? lightIcon : darkIcon} />
            </div>
          </div>
          <div className={darkmode ? 'searchBar dark':'searchBar'}>
            <img src={searchIcon} />
            <input id='userInput' placeholder='Search GitHub username...' ref={inputRef} />
            <p id='errorMsg'>{error}</p>
            <button id='userInputButton' onClick={searchDev}>Search</button>
          </div>
          <div className={darkmode ? 'maisy dark':'maisy'}>
            <img className='pfp' src={avatar_url} />
            <div className='profileInfo'>
              <div className='profileInfoTablet'>
                <img className='pfp' id='pfp-tablet' src={avatar_url} />
                <div className='basicInfo'>
                  <div className='namedate'>
                    <p className={darkmode ? 'name dark':'name'} id='user-name'>{name ? name : login}</p>
                    <p className={darkmode ? 'date dark':'date'} id='creation-date'>Joined{' '}{new Date(created_at).toLocaleDateString('en-us', {
                      
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}</p>
                  </div>
                  <p className='tag' id='user-tag'>@{login ? login : 'Not Available'}</p>
                  <p className={darkmode ? 'dateTablet dark':'dateTablet'} id='creation-date-tablet'>Joined{' '}{new Date(created_at).toLocaleDateString('en-us', {
                      
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}</p>
                  <p className='description' id='description'>{bio ? bio : 'This profile has no bio.'}</p>
                </div>
              </div>
              <p className='description' id='description-tablet'>{bio ? bio : 'This profile has no bio.'}</p>
              <div className={darkmode ? 'repoInfo dark':'repoInfo'}>
                <div className='profileData'>
                  <p className={darkmode ? 'dataCaption dark':'dataCaption'}>Repos</p>
                  <p className={darkmode ? 'num dark':'num'} id='repo-num'>{public_repos}</p>
                </div>
                <div className='profileData'>
                  <p className={darkmode ? 'dataCaption dark':'dataCaption'}>Followers</p>
                  <p className={darkmode ? 'num dark':'num'} id='followers-num'>{followers}</p>
                </div>
                <div className='profileData'>
                  <p className={darkmode ? 'dataCaption dark':'dataCaption'}>Following</p>
                  <p className={darkmode ? 'num dark':'num'} id='following-num'>{following}</p>
                </div>
              </div>
              <div className='mediaInfo'>
                <div className='media'>
                  <img className={darkmode ? 'icon dark':'icon'} id='location-icon' src={locationIcon} style={{opacity:location ? 1 : .5}} />
                  <p className={darkmode ? 'mediaText dark':'mediaText'} id='user-location' style={{opacity:location ? 1 : .5}}>{location ? location : "Not Available"}</p>
                </div>
                <div className='media'>
                  <img className={darkmode ? 'icon dark':'icon'} id='twitter-icon' src={twitterIcon} style={{opacity:twitter_username ? 1 : .5}} />
                  <p className={darkmode ? 'mediaText dark':'mediaText'} id='user-twitter' style={{opacity:twitter_username ? 1 : .5}} >{twitter_username ? twitter_username : "Not Available"}</p>
                </div>
                <div className='media'>
                  <img className={darkmode ? 'icon dark':'icon'} id='website-icon' src={websiteIcon} style={{opacity:blog ? 1 : .5}} />
                  <a target='_blank' href={blog} className={darkmode ? 'mediaText dark':'mediaText'} id='user-website' style={{opacity:blog ? 1 : .5}}>{blog ? blog : "Not Available"}</a>
                </div>
                <div className='media'>
                  <img className={darkmode ? 'icon dark':'icon'} id='company-icon' src={companyIcon} style={{opacity:company ? 1 : .5}} />
                  <p className={darkmode ? 'mediaText dark':'mediaText'} id='user-company' style={{opacity:company ? 1 : .5}}>{company ? company : "Not Available"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
