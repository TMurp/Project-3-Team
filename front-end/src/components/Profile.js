import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import spinner from '../images/spinner.gif'
import blankProfile from '../images/966-9665493_my-profile-icon-blank-profile-image-circle.png'
import { getPayload } from '../enviroment/auth'
import Button from 'react-bootstrap/esm/Button'
import { getLocalToken } from '../enviroment/auth'
import Rating from './utilities/Rating'

const Profile = () => {
  const { userId } = useParams()
  const [userData, setUserData] = useState(null)
  const [userAvgPinRating, setUserAvgPinRating] = useState(null)
  const [render, setRender] = useState(false)


  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${userId}`)
        setUserData(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [userId, render])

  const handDelete = async (e) => {
    console.log(e.target.value)
    try {
      await axios.delete(`/api/pins/${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${getLocalToken()}`
          }
        })
      setRender(true)
      setRender(false)
    } catch (error) {

    }
  }

  useEffect(() => {
    if (!userData) return
    if (userData.ownedPins.length === 0) return
    const userOwnedpins = userData.ownedPins
    console.log(userOwnedpins)
    let totalRatingArr = []
    userOwnedpins.forEach(pin => {
      const avgPinRating = pin.avgRating
      console.log(avgPinRating)
      if (pin.avgRating !== 'Not rated yet') totalRatingArr.push(pin.avgRating)
    })
    const total = totalRatingArr.reduce((acc, rating) => {
      return acc += parseFloat(rating)
    }, 0)
    setUserAvgPinRating(total / totalRatingArr.length)
  }, userData)

  const userIsOwner = () => {
    const payload = getPayload()
    if (!payload) return
    return userData.id === payload.sub
  }

  return (
    <>
      <Container id='profile-Container'>
        {userData ?
          <Col>
            <Row>
              <Col>
                <div className='user-pin-box'>
                  <h2>Name: <span>{userData.username}</span></h2>
                  {userData.profile.profilePicURL ? <img src={userData.profile.profilePicURL} alt='Profile' /> : <img src={blankProfile} alt='Blank Profile' />}
                </div>
              </Col>
              <Col md={5}>
                <h1>Profile Stats</h1>
                <h4>No. of pins added: <span>{userData.ownedPins.length ? userData.ownedPins.length : 0}</span></h4>
                <h4>Total Average Pin Rating: <span>{userAvgPinRating ? userAvgPinRating.toFixed(2) : 'No ratings'}</span></h4>
                <h4>Member Since: <span>{userData.createdAt.slice(0, 10)}</span></h4>

                {userIsOwner() && <Link className='btn-dark btn' to={`/profile/${userId}/edit`}>Edit Profile</Link>}

              </Col>
            </Row>
            <Row>
              <h1>Bio</h1>
              <div>{userData.profile.bio ? userData.profile.bio : <p>No bio added</p>}</div>
            </Row>
            <Row className='profile-cards-container'>
              <h1>Created Pins</h1>
              {userData.ownedPins.length > 0 ?
                userData.ownedPins?.map(pin => {
                  return (
                    <Card className='card-container h' key={pin.id} style={{ width: '18rem', height: '18rem' }}>
                      <Link className='pins-link' to={`/pins/${pin._id}`}>
                        <Card.Img className='card-img' variant="top" src={pin.imageUrl} />
                        <Card.Title>{pin.title}</Card.Title>
                        <div className='diamond-container'>
                          <Rating avgRating={pin.avgRating} id={pin._id} pin={pin} />
                        </div>
                      </Link>
                      <Card.Body>
                        
                        {userIsOwner() &&
                          <div className='d-flex justify-content-md-around card-buttons'>
                            <Link className='btn-dark btn' to={`/pins/${pin.id}/edit`}>Edit</Link>
                            <Button value={pin.id} onClick={handDelete} className='btn-dark btn'>Delete?</Button>
                          </div>}
                      </Card.Body>
                    </Card>
                  )
                })
                :
                <h2>Not made a pin... YET!</h2>
              }
            </Row>
          </Col>
          :
          <img src={spinner} alt='loading' />
        }
      </Container>
    </>
  )
}

export default Profile